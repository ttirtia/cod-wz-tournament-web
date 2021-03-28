<template>
  <layout-default>
    <div class="mx-6 mt-8 space-y-6 font-sans">
      <div v-if="team === null" class="flex flex-grow justify-center pt-12">
        <p>This is not the team you're looking for.</p>
      </div>
      <div
        v-if="team !== null"
        class="flex flex-col flex-grow mx-auto max-w-4xl"
      >
        <div class="flex flex-grow flex-row w-full text-left space-x-4">
          <p class="flex-grow text-xl font-semibold">{{ team.name }}</p>
          <button
            class="flex flex-row items-center space-x-2 border border-gray-400 rounded-md p-2 focus:outline-none"
            @click="showAddPlayerModal"
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
            <p>Add a player</p>
          </button>
          <button
            class="flex flex-row items-center space-x-2 border border-gray-400 rounded-md p-2 focus:outline-none"
            @click="showAddGameModal"
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
            <p>Add results</p>
          </button>
        </div>
        <div
          v-if="!team.players.length"
          class="flex flex-col w-full mt-4 max-h-full"
        >
          <p class="mt-16 flex-grow text-md">No player in this team</p>
        </div>
        <div
          v-if="team.players.length"
          class="flex flex-col w-full mt-6 max-h-full"
        >
          <p class="text-left text-md mb-4">Players</p>
          <div class="border rounded border-gray-200 bg-white">
            <ul class="rounded divide-y divide-gray-200">
              <li
                v-for="player in team.players"
                v-bind:key="player.id"
                class="flex flex-row items-center h-12 p-6 py-8"
              >
                <div class="flex-grow flex-col mr-4">
                  <div class="flex items-center">
                    <p class="text-left text-md font-semibold">
                      {{ player.name }}
                    </p>
                    <svg
                      v-if="team.teamLeader.id === player.id"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      class="ml-1 mt-1 w-4 h-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      />
                    </svg>
                  </div>
                </div>
                <div class="flex items-center space-x-4">
                  <button
                    v-if="team.teamLeader.id !== player.id"
                    @click="promoteLeader(player.id)"
                    class="focus:outline-none"
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
                        d="M5 10l7-7m0 0l7 7m-7-7v18"
                      />
                    </svg>
                  </button>
                  <button
                    @click="removePlayer(player.id)"
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

        <div
          v-if="!team.games.length"
          class="flex flex-col w-full mt-4 max-h-full"
        >
          <p class="text-left text-md mt-2 mb-4">Games</p>
          <p class="mt-10 flex-grow text-md">No game played by this team</p>
        </div>
        <div
          v-if="team.games.length"
          class="flex flex-col w-full mt-6 max-h-full"
        >
          <p class="text-left text-md mb-4">Games</p>
          <div class="border rounded border-gray-200 bg-white">
            <ul class="rounded divide-y divide-gray-200">
              <li
                v-for="game in team.games"
                v-bind:key="game.id"
                class="flex flex-col p-6 py-4"
                :redraw="redrawSwitch"
              >
                <div class="flex flex-row flex-grow">
                  <div class="flex-grow flex-col mr-4">
                    <div
                      v-if="editedGame.id !== game.id"
                      class="flex flex-col items-start"
                    >
                      <p class="text-left text-md font-semibold">
                        Top {{ game.placement }}
                      </p>
                      <p class="text-left text-sm">Points: {{ game.points }}</p>
                    </div>
                    <div v-else class="flex flex-row items-start space-x-4">
                      <p class="text-left text-md font-semibold">Top</p>
                      <input
                        v-model="editedGame.placement"
                        type="number"
                        class="px-1 rounded border border-gray-300 w-16 text-right focus:outline-none"
                      />
                    </div>
                  </div>
                  <div class="flex items-center space-x-4">
                    <button
                      @click="expandGame(game.id)"
                      class="focus:outline-none"
                      v-if="
                        expandedGameId !== game.id &&
                        typeof editedGame.id === 'undefined'
                      "
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
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    <button
                      @click="expandGame(game.id)"
                      class="focus:outline-none"
                      v-if="
                        expandedGameId === game.id &&
                        typeof editedGame.id === 'undefined'
                      "
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
                          d="M5 15l7-7 7 7"
                        />
                      </svg>
                    </button>
                    <button
                      @click="editGame(game)"
                      class="focus:outline-none"
                      v-if="typeof editedGame.id === 'undefined'"
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
                      @click="saveGame"
                      class="focus:outline-none"
                      v-if="editedGame.id === game.id"
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
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </button>
                    <button
                      @click="closeGameEdit"
                      class="focus:outline-none"
                      v-if="editedGame.id === game.id"
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
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                    <button
                      @click="deleteGame(game.id)"
                      class="focus:outline-none"
                      v-if="typeof editedGame.id === 'undefined'"
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
                </div>
                <div class="mt-4" v-if="expandedGameId === game.id">
                  <div class="border rounded border-gray-200 bg-white">
                    <ul class="rounded divide-y divide-gray-200">
                      <li
                        v-for="result in game.results"
                        v-bind:key="result.id"
                        class="flex flex-col p-6 py-4"
                      >
                        <div class="flex flex-row flex-grow">
                          <div class="flex-grow flex-col mr-4">
                            <div class="flex flex-row items-start space-x-4">
                              <p class="text-left text-md font-semibold">
                                {{ result.player.name }}:
                              </p>
                              <p v-if="editedGame.id !== game.id">
                                {{ result.kills }} kills
                              </p>
                              <input
                                v-else
                                v-model="editedGame.results[result.player.id]"
                                type="number"
                                class="px-1 rounded border border-gray-300 w-16 text-right focus:outline-none"
                              />
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <TeamUserAddModal
        v-if="isAddPlayerModalVisible"
        v-show="isAddPlayerModalVisible"
        @close="closeAddPlayerModal"
        @save="addPlayer"
        ref="teamUserAddModal"
        v-bind:teamName="team.name"
      />

      <GameCreationModal
        v-if="isAddGameModalVisible"
        v-show="isAddGameModalVisible"
        @close="closeAddGameModal"
        @save="saveGame"
        ref="gameCreationModal"
        :players="team.players"
        v-bind:game.sync="editedGame"
      />
    </div>
  </layout-default>
</template>

<script>
import { mapActions } from "vuex";
import LayoutDefault from "../../layouts/LayoutDefault";
import TeamUserAddModal from "./modal/TeamUserAddModal";
import GameCreationModal from "./modal/GameCreationModal";

export default {
  name: "AdminTeam",
  components: {
    LayoutDefault,
    TeamUserAddModal,
    GameCreationModal,
  },
  data() {
    return {
      team: null,
      expandedGameId: null,
      editedGame: {},
      isAddPlayerModalVisible: false,
      isAddGameModalVisible: false,
      redrawSwitch: false,
    };
  },
  beforeMount() {
    this.apiFindTeams({ id: this.$route.params.id }).then((data) => {
      this.team = data.findTeams[0];
    });
  },
  methods: {
    ...mapActions([
      "apiFindTeams",
      "apiUpdateTeam",
      "apiCreateGame",
      "apiUpdateGame",
      "apiDeleteGame",
    ]),
    expandGame: function (gameId) {
      this.expandedGameId = this.expandedGameId === gameId ? null : gameId;
    },
    addPlayer: function (playerId) {
      if (
        typeof this.team.players.find(({ id }) => id === playerId) ===
        "undefined"
      ) {
        let players = this.team.players.map(({ id }) => id);
        players.push(playerId);
        this.apiUpdateTeam({
          id: this.team.id,
          team: { players },
        }).then(() => {
          this.apiFindTeams({ id: this.team.id }).then((data) => {
            this.team = data.findTeams[0];
          });
        });
      }

      this.isAddPlayerModalVisible = false;
    },
    removePlayer: function (playerId) {
      let players = this.team.players.map(({ id }) => id);
      players = players.filter((id) => {
        return id !== playerId;
      });
      this.apiUpdateTeam({
        id: this.team.id,
        team: { players },
      }).then(() => {
        this.apiFindTeams({ id: this.team.id }).then((data) => {
          this.team = data.findTeams[0];
        });
      });
    },
    promoteLeader: function (playerId) {
      this.apiUpdateTeam({
        id: this.team.id,
        team: { teamLeader: playerId },
      }).then(() => {
        this.apiFindTeams({ id: this.team.id }).then((data) => {
          this.team = data.findTeams[0];
        });
      });
    },
    editGame: function (game) {
      this.expandedGameId = game.id;
      this.editedGame.id = game.id;
      this.editedGame.placement = game.placement;
      this.editedGame.results = [];
      for (let result of game.results) {
        this.editedGame.results[result.player.id] = result.kills;
      }

      // This is really bad but I need the component to re-render
      this.redrawSwitch = !this.redrawSwitch;
    },
    saveGame: function () {
      let results = [];
      for (let index in this.editedGame.results) {
        results.push({
          player: index,
          kills: this.editedGame.results[index] * 1,
        });
      }

      if (typeof this.editedGame.id !== "undefined") {
        this.apiUpdateGame({
          id: this.editedGame.id,
          game: { placement: this.editedGame.placement * 1, results },
        }).then(() => {
          this.apiFindTeams({ id: this.team.id }).then((data) => {
            this.team = data.findTeams[0];
          });
        });
      } else {
        this.apiCreateGame({
          team: this.team.id,
          placement: this.editedGame.placement * 1,
          results,
        }).then(() => {
          this.apiFindTeams({ id: this.team.id }).then((data) => {
            this.team = data.findTeams[0];
          });
        });
      }

      this.editedGame.id = null;
      this.editedGame = {};
      this.isAddGameModalVisible = false;
    },
    deleteGame: function (gameId) {
      this.apiDeleteGame(gameId).then(() => {
        this.apiFindTeams({ id: this.team.id }).then((data) => {
          this.team = data.findTeams[0];
        });
      });
    },
    closeGameEdit: function () {
      this.editedGame.id = null;
      this.editedGame = {};
    },
    showAddPlayerModal: function () {
      this.isAddPlayerModalVisible = true;
    },
    closeAddPlayerModal: function () {
      this.isAddPlayerModalVisible = false;
    },
    showAddGameModal: function () {
      this.isAddGameModalVisible = true;
    },
    closeAddGameModal: function () {
      this.isAddGameModalVisible = false;
    },
  },
};
</script>
