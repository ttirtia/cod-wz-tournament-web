<template>
  <div>
    <div class="flex flex-col flex-grow mx-auto max-w-6xl">
      <div class="flex flex-grow flex-row w-full text-left space-x-4">
        <p class="flex-grow text-xl font-semibold">Tournaments</p>
        <button
          class="flex flex-row items-center space-x-2 border border-gray-400 rounded-md p-2 focus:outline-none"
          @click="showCreateTournamentModal"
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
          <p>Create a tournament</p>
        </button>
      </div>
      <div
        v-if="!tournaments.length"
        class="flex flex-col w-full mt-4 max-h-full"
      >
        <p class="mt-16 flex-grow text-md">No tournament found</p>
      </div>
      <div
        v-if="tournaments.length"
        class="flex flex-col w-full mt-6 max-h-full"
      >
        <div class="border rounded border-gray-200 bg-white">
          <ul class="rounded divide-y divide-gray-200">
            <li
              v-for="tournament in tournaments"
              v-bind:key="tournament.id"
              class="flex flex-row items-center justify-start h-20 p-6 py-8"
            >
              <div class="flex-grow flex-col">
                <p
                  @click="$router.push('/admin/tournaments/' + tournament.id)"
                  class="max-w-max text-left text-md font-semibold cursor-pointer"
                >
                  {{ tournament.name }}
                </p>
                <p class="text-left text-sm">
                  {{ new Date(tournament.startDate).toLocaleString() }} -
                  {{ new Date(tournament.endDate).toLocaleString() }}
                </p>
                <p class="text-left text-sm">
                  Teams: {{ tournament.teams.length }}
                </p>
              </div>
              <div class="flex items-center space-x-4">
                <button
                  @click="showCreateTournamentModal(tournament)"
                  class="focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    class="w-7 h-7"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </button>
                <button
                  @click="deleteTournament(tournament.id)"
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

    <TournamentEditionModal
      v-if="isCreateTournamentModalVisible"
      v-show="isCreateTournamentModalVisible"
      @close="closeCreateTournamentModal"
      @save="saveTournament"
      :tournament="editedTournament"
      ref="tournamentEditionModal"
    />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import TournamentEditionModal from "./modal/TournamentEditionModal";

export default {
  name: "Tournaments",
  components: {
    TournamentEditionModal,
  },
  data() {
    return {
      tournaments: [],
      isCreateTournamentModalVisible: false,
      editedTournament: null,
    };
  },
  beforeMount() {
    this.apiFindTournaments({}).then((data) => {
      this.tournaments = data.findTournaments;
    });
  },
  methods: {
    ...mapActions([
      "apiFindTournaments",
      "apiCreateTournament",
      "apiUpdateTournament",
      "apiDeleteTournament",
    ]),
    saveTournament: function () {
      if (this.$refs.tournamentEditionModal.editedTournamentId === null) {
        this.apiCreateTournament(
          this.$refs.tournamentEditionModal.newTournamentInfo
        ).then(() => {
          this.$refs.tournamentEditionModal.newTournamentInfo = {};
          this.isCreateTournamentModalVisible = false;
          this.apiFindTournaments({}).then((data) => {
            this.tournaments = data.findTournaments;
          });
        });
      } else {
        this.apiUpdateTournament({
          id: this.$refs.tournamentEditionModal.editedTournamentId,
          tournament: this.$refs.tournamentEditionModal.newTournamentInfo,
        }).then(() => {
          this.$refs.tournamentEditionModal.newTournamentInfo = {};
          this.isCreateTournamentModalVisible = false;
          this.apiFindTournaments({}).then((data) => {
            this.tournaments = data.findTournaments;
          });
        });
      }
    },
    deleteTournament: function (tournamentId) {
      this.apiDeleteTournament(tournamentId).then(() => {
        this.apiFindTournaments({}).then((data) => {
          this.tournaments = data.findTournaments;
        });
      });
    },
    showCreateTournamentModal: function (tournament) {
      this.editedTournament = tournament;
      this.isCreateTournamentModalVisible = true;
    },
    closeCreateTournamentModal: function () {
      this.editedTournament = null;
      this.isCreateTournamentModalVisible = false;
    },
  },
};
</script>
