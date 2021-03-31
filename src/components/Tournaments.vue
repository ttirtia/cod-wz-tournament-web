<template v-if="tournaments">
  <layout-default>
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900 capitalize">
          {{ $tc("tournament", 2) }}
        </h1>
      </div>
    </header>
    <div v-if="tournaments && !tournaments.length" class="mx-auto mt-10">
      {{ $tc("msgNoTournament") }}
    </div>
    <div
      v-else-if="tournaments"
      class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5"
    >
      <div
        v-for="tournament in tournaments"
        v-bind:key="tournament.id"
        class="rounded overflow-hidden shadow-lg"
        :class="tournament.isOpen ? '' : 'bg-gray-200'"
      >
        <router-link :to="'/table/' + tournament.id">
          <div class="px-6 py-4">
            <div class="flex flex-row justify-center font-bold text-xl mb-2 space-x-2">
              <p>{{ tournament.name }}</p>
              <i v-if="!tournament.isOpen" class="ri-lock-2-line" />
            </div>
            <p class="text-gray-700 text-base mt-8">
              <!-- keep this space to put tournament description or other information -->
            </p>
            <p class="text-gray-700 text-base font-bold mt-8">
              {{ $tc("participatingTeam", tournament.teams.length) }}
            </p>
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
