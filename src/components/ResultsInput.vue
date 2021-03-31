<template v-if="tournament && team && team.games">
  <layout-default>
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900 capitalize-first">
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
                {{ team.name }}
              </h3>
              <p class="mt-1 text-sm text-gray-600 text-left capitalize-first">
                {{ $t("msgResultsInput") }}
              </p>
            </div>
          </div>
          <div
            class="mt-5 md:mt-0 md:col-span-2"
            v-if="
              tournament.gameLimit === -1 ||
              (tournament.gameLimit !== -1 &&
                team.games.length < tournament.gameLimit)
            "
          >
            <form action="#" method="POST" @submit.prevent="checkForm">
              <div
                v-if="errors.length"
                class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 text-left"
                role="alert"
              >
                <p class="font-bold capitalize-first">
                  {{ $tc("msgCorrectTheFollowingError", errors.length) }}
                </p>
                <ul>
                  <li
                    v-for="error in errors"
                    v-bind:key="error"
                    class="capitalize-first"
                  >
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
                        class="block text-sm font-medium text-gray-700 capitalize-first"
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
                        :placeholder="[[translations.kills]]"
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
                    {{ $t("submit") }}
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div class="mt-5 md:mt-0 md:col-span-2" v-else>
            <div
              class="bg-gray-100 border-l-4 border-gray-500 text-gray-700 p-4 mb-4 text-left"
              role="alert"
            >
              <p class="font-bold capitalize-first">
                {{ $t("msgGameLimitReached") }}
              </p>
            </div>
          </div>
        </div>

        <div class="hidden sm:block" aria-hidden="true">
          <div class="py-5">
            <div class="border-t border-gray-200"></div>
          </div>
        </div>

        <div class="md:grid md:grid-cols-3 md:gap-6">
          <div class="md:col-span-1">
            <div class="px-4 sm:px-0">
              <h3
                class="text-lg font-medium leading-6 text-gray-900 text-left capitalize-first"
              >
                {{ $tc("previousGames", team.games.length) }}
              </h3>
            </div>
          </div>

          <div class="mt-5 md:mt-0 md:col-span-2 mb-5">
            <div
              v-if="team.games.length > 0"
              class="shadow overflow-hidden sm:rounded-md text-left"
            >
              <div class="border rounded border-gray-200 bg-white">
                <ul class="rounded divide-y divide-gray-200">
                  <li
                    v-for="game in team.games"
                    v-bind:key="game.id"
                    class="flex flex-col p-6 py-4"
                  >
                    <div
                      class="flex items-start flex-col md:flex-row md:space-x-4 grid-rows-1 md:grid-rows-3"
                    >
                      <div>
                        <span
                          class="text-left text-md font-semibold capitalize-first px-3 py-1"
                        >
                          {{ $tc("position", 1) }}:
                          <span class="font-normal">{{ game.placement }}</span>
                        </span>
                      </div>
                      <div>
                        <span
                          class="text-left text-md font-semibold capitalize-first px-3 py-1"
                        >
                          {{ $tc("point", 2) }}:
                          <span class="font-normal">{{ game.points }}</span>
                        </span>
                      </div>
                      <div>
                        <span
                          v-for="result in game.results"
                          v-bind:key="result.id"
                          class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
                        >
                          {{ result.player.name }}:
                          <span class="font-normal"
                            >{{ result.kills }}
                            {{ $tc("kill", result.kills) }}</span
                          >
                        </span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="mt-5 md:mt-0 md:col-span-2" v-else>
              <div
                class="bg-gray-100 border-l-4 border-gray-500 text-gray-700 p-4 mb-4 text-left"
                role="alert"
              >
                <p class="font-bold capitalize-first">
                  {{ $t("msgNoPreviousGames") }}
                </p>
              </div>
            </div>
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
    this.apiFindUsers({ id: this.$store.getters.user.id }).then((data) => {
      this.team = data.findUsers[0].player.teams[0];
      this.game.team = data.findUsers[0].player.teams[0].id;
      this.tournament = data.findUsers[0].player.teams[0].tournament;
      this.team.players.forEach((player) => {
        this.game.results.push({
          kills: null,
          player: player.id,
          playerName: player.name,
        });
      });
    });
  },
  methods: {
    ...mapActions(["apiFindUsers", "apiCreateGame"]),
    checkForm: function (e) {
      this.errors = [];

      if (!this.game.placement) {
        this.errors.push(this.$t("placementRequired"));
      }

      for (let result of this.game.results) {
        if (!result.kills) {
          this.errors.push(
            this.$t("killsRequired", { player: result.playerName })
          );
        }
      }

      if (this.errors.length === 0) {
        this.createGame();
      } else {
        e.preventDefault();
      }
    },
    createGame: function () {
      this.game.results.forEach(function (result) {
        delete result.playerName;
      });
      this.apiCreateGame(this.game).then(() => {
        this.$router.push("/table/" + this.tournament.id);
      });
    },
  },
  data() {
    return {
      errors: [],
      translations: {
        kills: this.$tc("kill", 2),
      },
      team: {
        games: [],
      },
      tournament: {},
      game: {
        placement: null,
        team: "",
        results: [],
      },
    };
  },
};
</script>
