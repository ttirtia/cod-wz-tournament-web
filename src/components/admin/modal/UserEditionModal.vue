<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div
        class="p-4 h-60 bg-white rounded-md border border-gray-200"
      >
        <div
          class="flex flex-grow flex-row items-center mx-2 pb-2 mb-4 border-b border-gray-300"
        >
          <p class="text-lg font-semibold flex-grow text-left">
            {{ username }}
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
          <div class="flex flex-col space-y-4 mb-10">
            <div class="flex flex-row items-center">
              <label for="playerName" class="text-sm text-left mr-14"
                >Admin</label
              >
              <input type="checkbox" v-model="editIsAdmin" />
            </div>
            <div class="flex flex-row mb-12 items-center">
              <label for="playerName" class="flex flex-shrink-0 text-sm text-left mr-3"
                >Linked player</label
              >
              <PlayerSearchAutocomplete ref="playerSearchAutocomplete" :player=player @setPlayer="setPlayer" />
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
  name: "PlayerCreationModal",
  components: {
    PlayerSearchAutocomplete,
  },
  props: ["username", "isAdmin", "player"],
  data() {
    return {
      editIsAdmin: null,
      editPlayer: null,
    };
  },
  methods: {
    close() {
      this.$emit('close');
    },
    save() {
      this.$emit('update:player', this.editPlayer);
      this.$emit('update:isAdmin', this.editIsAdmin);
      this.$emit("save", this.editPlayer);
    },
    setPlayer(player) {
      this.editPlayer = player;
    }
  },
  beforeMount() {
    this.editIsAdmin = this.isAdmin;
    this.editPlayer = this.player;
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
