
<template>
  <layout-default>
    <div>
      <header class="bg-white shadow">
        <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold text-gray-900">
            {{ tournament.name }}
          </h1>
        </div>
      </header>
      <main>
        <div
          class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8"
        >
          <div class="sm:px-0">
            <div class="h-96">
              <div class="max-w-7xl mx-auto sm:px-6 lg:px-8" v-if="tournament.teams.length > 0">
                <h2 class="text-xl font-bold text-gray-900 text-left mb-4">
                  Classement général
                </h2>
                <table class="border-collapse w-full">
                  <thead>
                    <tr>
                      <th
                        class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell"
                      >
                        {{ $tc("position", 1) }}
                      </th>
                      <th
                        class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell"
                      >
                        {{ $tc("team", 1) }}
                      </th>
                      <th
                        class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell"
                      >
                        {{ $tc("player", 2) }}
                      </th>
                      <th
                        class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell"
                      >
                        {{ $tc("point", 2) }}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="team in sortedTeams"
                      v-bind:key="team.id"
                      class="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0"
                    >
                      <td
                        class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static"
                      >
                        <span
                          class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase font-bold"
                          >{{ $tc("position", 1) }}</span
                        >
                        <span
                          v-bind:class="[
                            team.position == 1
                              ? 'rounded bg-gold py-1 px-3 text-md font-bold'
                              : team.position == 2
                              ? 'rounded bg-silver py-1 px-3 text-md font-bold'
                              : team.position == 3
                              ? 'rounded bg-bronze py-1 px-3 text-md font-bold'
                              : 'rounded py-1 px-3 text-md font-bold',
                          ]"
                          >{{ team.placement ? team.placement : "N/A" }}</span
                        >
                      </td>
                      <td
                        class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static"
                      >
                        <span
                          class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase"
                          >{{ $tc("team", 1) }}</span
                        >
                        {{ team.name }}
                      </td>
                      <td
                        class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static"
                        style="vertical-align: middle"
                      >
                        <span
                          class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase"
                          >{{ $tc("player", 1) }}</span
                        >
                        <span v-for="player in team.players" :key="player.id">
                          <!-- {{ player.name
                          }}<span v-if="index != team.players.length - 1"
                            >,</span
                          > -->
                          <span
                            class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                            >{{ player.name }}
                            <i
                              v-if="player.id === team.teamLeader.id"
                              class="ri-copyright-line"
                              style="color: #e74c3c; vertical-align: middle"
                            ></i>
                          </span>
                        </span>
                      </td>
                      <td
                        class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static"
                      >
                        <span
                          class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase"
                          >{{ $tc("point", 1) }}</span
                        >
                        {{ team.points ? team.points : "N/A" }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- <div
                class="max-w-7xl mx-auto sm:px-6 lg:px-8"
                v-if="tournament.teams.length > 0"
              >
                <h2 class="text-xl font-bold text-gray-900 text-left my-4">
                  Classement des joueurs
                </h2>
                <table
                  class="border-collapse w-full mb-4"
                >
                  <thead>
                    <tr>
                      <th
                        class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell"
                      >
                        {{ $tc("position", 1) }}
                      </th>
                      <th
                        class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell"
                      >
                        {{ $tc("player", 1) }}
                      </th>
                      <th
                        class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell"
                      >
                        {{ $tc("team", 1) }}
                      </th>
                      <th
                        class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell"
                      >
                        {{ $tc("kill", 2) }}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="player in allPlayers"
                      v-bind:key="player.id"
                      class="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0"
                    >
                      <td
                        class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static"
                      >
                        <span
                          class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase font-bold"
                          >{{ $tc("position", 1) }}</span
                        >
                        <span
                          v-bind:class="[
                            player.position == 1
                              ? 'rounded bg-gold py-1 px-3 text-md font-bold'
                              : player.position == 2
                              ? 'rounded bg-silver py-1 px-3 text-md font-bold'
                              : player.position == 3
                              ? 'rounded bg-bronze py-1 px-3 text-md font-bold'
                              : 'rounded py-1 px-3 text-md font-bold',
                          ]"
                          >{{
                            player.placement ? player.placement : "N/A"
                          }}</span
                        >
                      </td>
                      <td
                        class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static"
                      >
                        <span
                          class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase"
                          >{{ $tc("team", 1) }}</span
                        >
                        {{ player.name }}
                      </td>
                      <td
                        class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static"
                        style="vertical-align: middle"
                      >
                        <span
                          class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase"
                          >{{ $tc("player", 1) }}</span
                        >
                        {{ player.team }}
                      </td>
                      <td
                        class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static"
                      >
                        <span
                          class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase"
                          >{{ $tc("point", 1) }}</span
                        >
                        {{ player.points ? player.points : "N/A" }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div> -->
              <div class="max-w-7xl mx-auto sm:px-6 lg:px-8" v-if="tournament.teams.length === 0">
                <div >
                  <p>{{ $t("msgNoTeamInTournament") }}</p>
                  <router-link
                    to="/"
                    class="underline"
                    style="margin-top: 30px"
                    >{{ $t("msgBackToTournamentsList") }}</router-link
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </layout-default>
</template>

<script>
import { mapActions } from "vuex";
import LayoutDefault from "../layouts/LayoutDefault.vue";

export default {
  name: "Table",
  components: {
    LayoutDefault,
  },
  beforeMount() {
    this.apiFindTournaments({
      filter: { id: this.$route.params.id },
    }).then((data) => {
      this.tournament = data.findTournaments[0];
      data.findTournaments[0].teams.flat().forEach((team) => {
        team.players.flat().forEach((player) => {
          var playerToPush = { name: player.name, team: team.name }
          this.allPlayers.push(playerToPush);
        });
      });
    });
  },
  methods: {
    ...mapActions(["apiFindTournaments"]),
  },
  data() {
    return {
      allPlayers: [],
      tournament: {},
    };
  },
  computed: {
    sortedTeams: function(){
      function compare(a, b) {
        if ((a.placement ? a.placement : 1000) < (b.placement ? b.placement : 1000))
          return -1;
        if ((a.placement ? a.placement : 1000) > (b.placement ? b.placement : 1000))
          return 1;

        return 0;
      }

      var teamsCopy = this.tournament.teams.slice();

      //1. sort teams members to place team leader first. Then alphabetically
      teamsCopy.forEach(function(team){
        team.players.sort(function(a){
           return team.teamLeader.id === a.id ? -1 : 1;
        })
      });

      return teamsCopy.sort(compare);
    }
  },
};
</script>
