<template v-if="tournaments">
  <layout-default>
    <div class="grid grid-cols-12 gap-4">
      <div class="border-b-2 md:col-start-5 lg:col-start-5 xl:col-start-5 md:col-span-4 lg:col-span-4 xl:col-span-4 col-span-10 col-start-2">
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
      class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:mx-24 lg:mx-40"
    >
      <div
        v-for="(tournament, index) in tournaments"
        v-bind:key="tournament.id"
        :class="tournament.isOpen ? '' : 'bg-gray-200'"
        class="mx-auto w-full bg-white rounded-xl shadow-md overflow-hidden"
      >
        <router-link :to="'/table/' + tournament.id" class="">
          <div class="md:flex sm:flex">
            <div class="md:flex-shrink-0">
              <img
                class="h-48 w-full object-cover md:w-48 sm:w-48 opacity-80"
                v-bind:src="require(`../assets/war${index + 1}.jpg`)"
                alt="war image"
              />
            </div>
            <div class="p-5 w-full">
              <p
                class="uppercase tracking-wide text-md text-indigo-500 font-semibold tracking-widest overflow-ellipsis"
              >
                {{ tournament.name }}
                <i
                  v-if="!tournament.isOpen"
                  class="ri-lock-2-line align-middle"
                  style="vertical-align: center"
                />
              </p>
              <div class="mt-8 sm:mt-5">
                {{ tournament.startDate | moment("DD/M/yyyy") }}
              </div>
              <p class="text-gray-500 mt-12 sm:mt-5">
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
      tournaments: null,
    };
  },
};
</script>
