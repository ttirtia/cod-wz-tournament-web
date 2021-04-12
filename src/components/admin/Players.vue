<template>
  <layout-admin>
    <div class="flex flex-col flex-grow mx-auto max-w-6xl">
      <div class="flex flex-grow flex-row w-full text-left space-x-4">
        <p class="flex-grow text-xl font-semibold">Players</p>
        <button
          class="flex flex-row items-center space-x-2 border border-gray-400 rounded-md p-2 focus:outline-none"
          @click="showCreatePlayerModal"
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
          <p class="invisible w-0 h-0 sm:visible sm:w-full sm:h-full">
            Create a player
          </p>
          <p class="sm:hidden">Create</p>
        </button>
      </div>
      <div v-if="notFound" class="flex flex-col w-full mt-4 max-h-full">
        <p class="mt-16 flex-grow text-md">No player found</p>
      </div>
      <div v-if="players.length" class="flex flex-col w-full mt-6 max-h-full">
        <div class="border rounded border-gray-200 bg-white">
          <ul class="rounded divide-y divide-gray-200">
            <li
              v-for="player in players"
              v-bind:key="player.id"
              class="flex flex-row items-center justify-start h-12 p-6 py-8"
            >
              <div class="flex-grow flex-col">
                <p class="text-left text-md font-semibold">
                  {{ player.name }}
                </p>
                <p v-if="player.user !== null" class="text-left text-sm">
                  Linked user: {{ player.user.username }}
                </p>
              </div>
              <button
                @click="deletePlayer(player.id)"
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
            </li>
          </ul>
        </div>
      </div>
    </div>

    <PlayerCreationModal
      v-if="isCreatePlayerModalVisible"
      v-show="isCreatePlayerModalVisible"
      @close="closeCreatePlayerModal"
      @save="createPlayer"
      ref="playerCreationModal"
    />
  </layout-admin>
</template>

<script>
import { mapActions } from "vuex";
import PlayerCreationModal from "./modal/PlayerCreationModal";
import LayoutAdmin from "../../layouts/LayoutAdmin.vue";

export default {
  name: "Players",
  components: {
    PlayerCreationModal,
    LayoutAdmin,
  },
  data() {
    return {
      notFound: false,
      players: [],
      isCreatePlayerModalVisible: false,
    };
  },
  beforeMount() {
    this.apiFindPlayers().then((data) => {
      this.players = data.findPlayers;
      this.notFound = this.players.length === 0;
    });
  },
  methods: {
    ...mapActions(["apiFindPlayers", "apiCreatePlayer", "apiDeletePlayer"]),
    createPlayer: function () {
      this.apiCreatePlayer(
        this.$refs.playerCreationModal.newPlayerInfo.name
      ).then((data) => {
        if (data.createPlayer.id) {
          this.$notify({
            group: "success",
            type: "success",
            title: this.$t("playerCreated"),
            text: this.$t("msgPlayerCreated", {
              player: this.$refs.playerCreationModal.newPlayerInfo.name,
            }),
          });
        }

        this.$refs.playerCreationModal.newPlayerInfo = {};
        this.isCreatePlayerModalVisible = false;
        this.apiFindPlayers().then((data) => {
          this.players = data.findPlayers;
          this.notFound = this.players.length === 0;
        });
      });
    },
    deletePlayer: function (playerId) {
      this.apiDeletePlayer(playerId).then((data) => {
        if (data.deletePlayer) {
          this.$notify({
            group: "success",
            type: "success",
            title: this.$t("playerDeleted"),
            text: this.$t("msgPlayerDeleted", {
              player: this.players.filter(function (player) {
                return player.id === playerId;
              })[0].name,
            }),
          });
        }
        this.apiFindPlayers().then((data) => {
          this.players = data.findPlayers;
          this.notFound = this.players.length === 0;
        });
      });
    },
    showCreatePlayerModal: function () {
      this.isCreatePlayerModalVisible = true;
    },
    closeCreatePlayerModal: function () {
      this.isCreatePlayerModalVisible = false;
    },
  },
};
</script>
