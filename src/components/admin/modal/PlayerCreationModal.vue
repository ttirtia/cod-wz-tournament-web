<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div
        class="p-4 bg-white rounded-md border border-gray-200"
      >
        <div
          class="flex flex-grow flex-row items-center mx-2 pb-2 mb-4 border-b border-gray-300"
        >
          <p class="text-lg font-semibold flex-grow text-left">New player</p>
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
          <div class="flex flex-col mb-8">
            <label for="playerName" class="text-sm text-left mb-2">Name</label>
            <input
              v-model="newPlayerInfo.name"
              id="playerName"
              name="playerName"
              required
              class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              placeholder="Thierry"
            />
          </div>
          <div class="flex flex-row justify-center space-x-4">
            <button @click="save" class="bg-green-400 text-white rounded-md p-1.5 w-36 focus:outline-none">Save</button>
            <button @click="close" class="border-2 border-gray-300 rounded-md p-1.5 w-36 focus:outline-none">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "PlayerCreationModal",
  data() {
    return {
      newPlayerInfo: {},
    };
  },
  methods: {
    close() {
      this.newPlayerInfo = {};
      this.$emit("close");
    },
    save() {
      this.$emit("save");
    },
  },
};
</script>

<style>
.modal-backdrop {
  z-index: 10;
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
