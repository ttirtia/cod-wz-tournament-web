<template v-if="tournaments">
  <layout-default>
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900 capitalize">
          {{ $tc("tournament", 2) }}
        </h1>
      </div>
    </header>
    <div
      class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5"
    >
      <div
        v-for="tournament in tournaments"
        v-bind:key="tournament.id"
        class="rounded overflow-hidden shadow-lg"
      >
        <a :href="'/table/' + tournament.id">
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2">{{ tournament.name }}</div>
            <p class="text-gray-700 text-base mt-8">
              <!-- keep this space to put tournament description or other information -->
            </p>
            <p class="text-gray-700 text-base font-bold mt-8">
              {{ $tc("participatingTeam", tournament.teams.length) }}
            </p>
          </div>
        </a>
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
      tournaments: [],
    };
  },
};
</script>
