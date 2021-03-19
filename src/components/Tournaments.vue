<template>
<layout-default>
    <header class="bg-white shadow">
        <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold text-gray-900">Tournaments</h1>
        </div>
      </header>
<div class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
    
    <div v-for="tournament in tournaments" v-bind:key="tournament" class="rounded overflow-hidden shadow-lg">
      <!-- <img class="w-min" src="https://via.placeholder.com/150" alt="Mountain"> -->
      <a :href="'/table/' + tournament.id" >
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">{{tournament.name}}</div>
        <p class="text-gray-700 text-base mt-8">
          {{tournament.description}}
        </p>
        <p class="text-gray-700 text-base font-bold mt-8">
          Nombre d'Équipes: {{tournament.teams.length}}
        </p>
      </div>
      </a>
      <!-- <div class="px-6 pt-4 pb-2">
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
      </div> -->
    </div>

  </div>
</layout-default>
</template>

<script>
import LayoutDefault from "../layouts/LayoutDefault.vue";

export default {
  name: "Tournaments",
  components: {
    LayoutDefault,
  },
  data() {
    return {
      tournaments: [
        {
          id: 1,
          name: "Tournoi des Lopez",
          description: "Tournoi organisé par la famille Lopez dans le but de régler les problèmes.",
          teams: [
            { name: "Les genies" },
            { name: "T-Cube" },
            { name: "Test" },
            { name: "Super équipe" },
          ],
        }
      ],
    };
  }
};
</script>