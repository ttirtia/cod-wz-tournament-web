<template v-if="tournaments">
  <layout-default>
    <div class="grid grid-cols-12 gap-4">
      <div
        class="border-b-2 col-start-2 md:col-start-5 col-span-10 md:col-span-4"
      >
        <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold text-gray-900 capitalize-first">
            {{ $tc("tournament", 2) }}
          </h1>
        </div>
      </div>
    </div>
    <div v-if="tournaments && !tournaments.length" class="mx-auto mt-10">
      {{ $tc("msgNoTournament") }}
    </div>
    <div
      v-else-if="tournaments"
      class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mx-auto"
    >
      <div
        v-for="(tournament, index) in tournaments"
        v-bind:key="tournament.id"
        :class="tournament.isOpen ? '' : 'bg-gray-200'"
        class="mx-auto w-full max-w-sm sm:max-w-md bg-white rounded-xl shadow-md overflow-hidden sm:min-w-max"
      >
        <router-link :to="'/table/' + tournament.id" class="">
          <div class="sm:flex">
            <img
              class="h-20 sm:h-48 sm:w-44 md:w-36 w-full object-cover opacity-80 sm:flex-shrink-0"
              v-bind:src="require(`../assets/war${((index + 5) % 5) + 1}.jpg`)"
              alt="war image"
            />
            <div
              class="flex flex-col flex-grow items-center justify-center space-y-2 py-4"
            >
              <p
                class="uppercase text-md text-indigo-500 font-semibold tracking-widest overflow-ellipsis"
              >
                {{ tournament.name }}
                <i
                  v-if="!tournament.isOpen"
                  class="ri-lock-2-line align-middle"
                  style="vertical-align: center"
                />
              </p>
              <div>
                {{ DateTime.fromMillis(tournament.startDate).toFormat('dd/MM/yyyy') }}
              </div>
              <p class="text-gray-500">
                {{ $tc("participatingTeam", tournament.teams.length) }}
              </p>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </layout-default>
</template>

<script>
import LayoutDefault from "../layouts/LayoutDefault.vue";
import { mapActions } from "vuex";
import { DateTime } from "luxon";

export default {
  name: "Tournaments",
  components: {
    LayoutDefault,
  },
  beforeMount() {
    this.apiFindTournaments({}).then((data) => {
      this.tournaments = data.findTournaments;
    });
  },
  methods: {
    ...mapActions(["apiFindTournaments"]),
  },
  data() {
    return {
      DateTime,
      tournaments: null,
    };
  },
};
</script>
