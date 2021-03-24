<template>
  <layout-default>
    <div class="mx-6 mt-8 space-y-6 font-sans">
      <div
        v-if="tournament === null"
        class="flex flex-grow justify-center pt-12"
      >
        <p>This is not the tournament you're looking for.</p>
      </div>
      <div
        v-if="tournament !== null"
        class="flex flex-col flex-grow mx-auto max-w-4xl"
      >
        <div class="flex flex-grow flex-row w-full text-left space-x-4">
          <p class="flex-grow text-xl font-semibold">{{ tournament.name }}</p>
          <button
            class="flex flex-row items-center space-x-2 border border-gray-400 rounded-md p-2 focus:outline-none"
            @click="showTeamCreationModal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p>Create a team</p>
          </button>
        </div>
        <div
          v-if="!tournament.teams.length"
          class="flex flex-col w-full mt-4 max-h-full"
        >
          <p class="mt-16 flex-grow text-md">No team in this tournament</p>
        </div>
        <div
          v-if="tournament.teams.length"
          class="flex flex-col w-full mt-6 max-h-full"
        >
          <p class="text-left text-md mb-4">Teams</p>
          <div class="border rounded border-gray-200 bg-white">
            <ul class="rounded divide-y divide-gray-200">
              <li
                v-for="team in tournament.teams"
                v-bind:key="team.id"
                class="flex flex-row items-center h-24 p-6 py-8"
              >
                <div class="flex-grow flex-col mr-4">
                  <div class="flex items-center mb-2">
                    <p v-if="team.placement" class="text-md font-semibold">
                      {{ team.placement }}.
                    </p>
                    <p
                      @click="$router.push('/admin/teams/' + team.id)"
                      class="max-w-max text-left text-md font-semibold cursor-pointer"
                    >
                      {{ team.name }}
                    </p>
                  </div>
                  <p class="text-left text-sm">
                    Points: {{ team.points || "N/A" }}
                  </p>
                  <p class="text-left text-sm">
                    Players:
                    {{ team.players.map(({ name }) => name).join(", ") }}
                  </p>
                </div>
                <div class="flex items-center space-x-4">
                  <button
                    @click="deleteTeam(team.id)"
                    class="focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      class="w-8 h-8"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <TournamentTeamCreationModal
        v-if="isTeamCreationModalVisible"
        v-show="isTeamCreationModalVisible"
        @close="closeTeamCreationModal"
        @save="createTeam"
        ref="teamCreationModal"
        :tournamentId="tournament.id"
      />
    </div>
  </layout-default>
</template>

<script>
import { mapActions } from "vuex";
import LayoutDefault from "../../layouts/LayoutDefault";
import TournamentTeamCreationModal from "./modal/TournamentTeamCreationModal";

export default {
  name: "AdminTournament",
  components: {
    LayoutDefault,
    TournamentTeamCreationModal,
  },
  data() {
    return {
      tournament: null,
      newTeam: {},
      isTeamCreationModalVisible: false,
    };
  },
  beforeMount() {
    this.apiFindTournaments({
      filter: { id: this.$route.params.id },
      teamOrder: "PLACEMENT_ASC",
    }).then((data) => {
      this.tournament = data.findTournaments[0];
    });
  },
  methods: {
    ...mapActions([
      "apiFindTournaments",
      "apiUpdateTournament",
      "apiCreateTeam",
      "apiDeleteTeam",
    ]),
    expandGame: function (gameId) {
      this.expandedGameId = this.expandedGameId === gameId ? null : gameId;
    },
    createTeam: function (team) {
      if (team.name === null || !team.players.length) return;

      let players = team.players.map(({ id }) => id);
      this.apiCreateTeam({
        name: team.name,
        teamLeader: players[0],
        players,
        tournament: this.tournament.id,
      }).then(() => {
        this.apiFindTournaments({
          filter: { id: this.$route.params.id },
          teamOrder: "PLACEMENT_ASC",
        }).then((data) => {
          this.tournament = data.findTournaments[0];
        });
      });

      this.isTeamCreationModalVisible = false;
    },
    deleteTeam: function (teamId) {
      this.apiDeleteTeam(teamId).then(() => {
        this.apiFindTournaments({
          filter: { id: this.$route.params.id },
          teamOrder: "PLACEMENT_ASC",
        }).then((data) => {
          this.tournament = data.findTournaments[0];
        });
      });
    },
    showTeamCreationModal: function () {
      this.isTeamCreationModalVisible = true;
    },
    closeTeamCreationModal: function () {
      this.isTeamCreationModalVisible = false;
    },
  },
};
</script>
