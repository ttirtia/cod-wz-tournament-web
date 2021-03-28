<template>
  <layout-default>
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900 capitalize">
          {{ $t("resultsinput") }}
        </h1>
      </div>
    </header>
    <div class="grid place-items-center mt-10">
      <div class="mt-10 sm:mt-0">
        <div class="md:grid md:grid-cols-3 md:gap-6">
          <div class="md:col-span-1">
            <div class="px-4 sm:px-0">
              <h3 class="text-lg font-medium leading-6 text-gray-900 text-left">
                {{ this.teamName }}
              </h3>
              <p class="mt-1 text-sm text-gray-600 text-left capitalize-first">
                {{ $t("msgResultsInput") }}
              </p>
            </div>
          </div>
          <div class="mt-5 md:mt-0 md:col-span-2">
            <form
              action="#"
              method="POST"
              @submit.prevent="checkForm"
            >
              <!-- <p class="capitalize-first" v-if="errors.length">
                <b>{{ $tc("msgCorrectTheFollowingError", errors.length) }}:</b>
                <ul>
                  <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
                </ul>
              </p> -->
              <div
                v-if="errors.length"
                class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 text-left"
                role="alert"
              >
                <p class="font-bold capitalize-first">
                  {{ $tc("msgCorrectTheFollowingError", errors.length) }}
                </p>
                <ul>
                  <li v-for="error in errors" v-bind:key="error">
                    {{ error }}
                  </li>
                </ul>
              </div>
              <div class="shadow overflow-hidden sm:rounded-md text-left">
                <div class="px-4 py-5 bg-white sm:p-6">
                  <div class="grid grid-cols-6 gap-6">
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="position"
                        class="block text-sm font-medium text-gray-700 capitalize"
                        >{{ $tc("position", 1) }}</label
                      >
                      <input
                        type="number"
                        v-model.number="game.placement"
                        min="1"
                        autocomplete="position"
                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div class="col-span-0 sm:col-span-3 invisible"></div>

                    <div
                      class="col-span-6 sm:col-span-6 lg:col-span-2"
                      v-for="result in game.results"
                      v-bind:key="result.player"
                    >
                      <label
                        for="kills"
                        class="block text-sm font-medium text-gray-700"
                        >{{ result.playerName }}</label
                      >
                      <input
                        type="number"
                        v-model.number="result.kills"
                        min="0"
                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
                <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 capitalize"
                  >
                    {{ $t("send") }}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </layout-default>
</template>

<script>
import LayoutDefault from "../layouts/LayoutDefault.vue";
import { mapActions } from "vuex";

export default {
  name: "Results",
  components: {
    LayoutDefault,
  },
  beforeMount() {
    this.apiFindTeams({ id: "a60dcce2-b958-491a-8843-9c86972421b4" }).then(
      (data) => {
        this.teamName = data.findTeams[0].name;
        this.game.team = data.findTeams[0].id;
        data.findTeams[0].players.forEach((player) => {
          this.game.results.push({
            kills: 0,
            player: player.id,
            playerName: player.name,
          });
        });
      }
    );
  },
  methods: {
    ...mapActions(["apiFindTeams", "apiCreateGame"]),
    checkForm: function (e) {

      this.errors = [];

      if (!this.game.placement) {
        this.errors.push(this.$t("placementRequired"));
      }

      if (this.errors.length === 0) {
        this.createGame();
      } else {
        e.preventDefault();
      }
    },
    createGame: function () {
      this.game.results.forEach(function(result){ delete result.playerName });
      this.apiCreateGame(this.game).then(() => {
        this.$router.push('/');
      });
    },
  },
  data() {
    return {
      errors: [],
      teamName: "",
      game: {
        placement: null,
        team: "",
        results: [],
      },
    };
  },
};
</script>
