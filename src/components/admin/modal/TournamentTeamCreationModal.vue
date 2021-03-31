<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div
        class="p-4 bg-white rounded-md border border-gray-200"
        style="width: 32rem; max-height: 56rem"
      >
        <div
          class="flex flex-grow flex-row items-center mx-2 pb-2 mb-4 border-b border-gray-300"
        >
          <p class="text-lg font-semibold flex-grow text-left truncate">
            Create a new team
          </p>
          <button @click="close" class="focus:outline-none">
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div class="flex flex-col h-full mx-2">
          <div class="space-y-4 mb-10">
            <div class="flex flex-col mb-6">
              <label for="teamName" class="text-sm text-left mb-2">Name</label>
              <input
                v-model="teamToAdd.name"
                id="teamName"
                name="teamName"
                required
                class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                placeholder="Les try-harders"
              />
            </div>
            <div class="flex flex-row items-center">
              <label class="text-mdtext-left">Add a player</label>
              <PlayerSearchAutocomplete
                ref="playerSearchAutocomplete"
                @setPlayer="setPlayer"
                class="ml-28 absolute"
              />
              <div class="flex flex-row items-center ml-64 mr-4">
                <input
                  class="mx-1"
                  type="checkbox"
                  v-model="playerToAddIsLeader"
                />
                <label for="tournamentEndDate" class="text-sm text-left"
                  >Leader</label
                >
              </div>
              <button @click="addPlayer" class="focus:outline-none">
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
                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            </div>

            <div>
              <p class="text-left text-md mt-6 mb-4">Players</p>
              <div v-if="!teamToAdd.players.length" class="flex flex-col">
                <p class="text-sm">No player in this team</p>
              </div>
              <div
                v-if="teamToAdd.players.length"
                class="flex flex-col w-full mt-6 max-h-full"
              >
                <div class="border rounded border-gray-200 bg-white">
                  <ul class="rounded divide-y divide-gray-200">
                    <li
                      v-for="player in teamToAdd.players"
                      v-bind:key="player.id"
                      class="flex flex-row items-center h-12 p-6"
                    >
                      <div class="flex-grow flex-col mr-4">
                        <div class="flex items-center">
                          <p class="text-left text-md">
                            {{ player.name }}
                          </p>
                          <svg
                            v-if="teamToAdd.teamLeader.id === player.id"
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
            </div>
          </div>
          <div class="flex flex-row justify-center space-x-4">
            <button
              @click="save"
              class="bg-green-400 text-white rounded-md p-1.5 w-36 focus:outline-none"
            >
              Save
            </button>
            <button
              @click="close"
              class="border-2 border-gray-300 rounded-md p-1.5 w-36 focus:outline-none"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import PlayerSearchAutocomplete from "../../utils/PlayerSearchAutocomplete";

export default {
  name: "TournamentTeamCreationModal",
  components: {
    PlayerSearchAutocomplete,
  },
  props: ["tournamentId"],
  data() {
    return {
      teamToAdd: {
        players: [],
      },
      playerToAdd: null,
      playerToAddIsLeader: false,
    };
  },
  methods: {
    close() {
      this.teamToAdd = {};
      this.playerToAdd = null;
      this.$refs.playerSearchAutocomplete.search = null;
      this.$emit("close");
    },
    save() {
      this.$emit("save", this.teamToAdd);
    },
    setPlayer(player) {
      this.playerToAdd = player;
    },
    addPlayer() {
      if (this.teamToAdd.players.indexOf(this.playerToAdd) === -1)
        this.teamToAdd.players.push(this.playerToAdd);

      if (this.playerToAddIsLeader)
        this.teamToAdd.teamLeader = this.playerToAdd;

      this.$refs.playerSearchAutocomplete.search = null;
      this.playerToAddIsLeader = false;
    },
    removePlayer(playerId) {
      this.teamToAdd.players = this.teamToAdd.players.filter(({ id }) => {
        return id !== playerId;
      });
    },
  },
};
</script>

<style>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>
