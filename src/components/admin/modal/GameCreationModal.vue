<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="p-4 bg-white rounded-md border border-gray-200">
        <div
          class="flex flex-grow flex-row items-center mx-2 pb-2 mb-4 border-b border-gray-300"
        >
          <p class="text-lg font-semibold flex-grow text-left">New results</p>
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
          <div class="flex flex-row mb-4 space-x-4 items-center">
            <label for="playerName" class="text-sm text-left mb-2"
              >Placement</label
            >
            <input
              v-model="newGameInfo.placement"
              type="number"
              class="flex pl-2 pr-1 rounded border border-gray-300 w-20 focus:outline-none"
            />
          </div>

          <div v-if="players.length" class="flex flex-col mb-8">
            <p class="text-left text-sm mb-4">Results</p>
            <div class="border rounded border-gray-200 bg-white">
              <ul class="rounded divide-y divide-gray-200">
                <li
                  v-for="player in players"
                  v-bind:key="player.id"
                  class="flex flex-row items-center h-12 p-6 py-8"
                >
                  <div class="flex-grow flex-col">
                    <div class="flex items-center">
                      <p class="text-left text-md font-semibold flex-grow">
                        {{ player.name }}
                      </p>
                      <input
                        v-model="newGameInfo.results[player.id]"
                        type="number"
                        class="flex pl-2 pr-1 mr-2 rounded border border-gray-300 w-20 focus:outline-none"
                      />
                      <p>kills</p>
                    </div>
                  </div>
                </li>
              </ul>
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
export default {
  name: "GameCreationModal",
  data() {
    return {
      newGameInfo: {
        placement: 150,
        results: [],
      },
    };
  },
  props: ["game", "players"],
  beforeMount() {
    for (const player of this.players) {
      this.newGameInfo.results[player.id] = 0;
    }
  },
  methods: {
    close() {
      this.newGameInfo = {};
      this.$emit("close");
    },
    save() {
      this.$emit("update:game", this.newGameInfo);
      this.$emit("save");
      this.newGameInfo = {
        results: [],
      };
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
