<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div
        class="p-4 bg-white rounded-md border border-gray-200"
      >
        <div
          class="flex flex-grow flex-row items-center mx-2 pb-2 mb-4 border-b border-gray-300"
        >
          <p class="text-lg font-semibold flex-grow text-left">
            New tournament
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
          <div class="flex flex-col mb-4">
            <label for="tournamentName" class="text-sm text-left mb-2"
              >Name</label
            >
            <input
              v-model="newTournamentInfo.name"
              id="tournamentName"
              name="tournamentName"
              required
              class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              placeholder="The last one"
            />
          </div>
          <div class="flex flex-col mb-4">
            <label for="tournamentStartDate" class="text-sm text-left mb-2"
              >Start date</label
            >
            <date-picker
              id="tournamentStartDate"
              name="tournamentStartDate"
              v-model="newTournamentInfo.startDate"
              type="datetime"
              :lang="lang"
              style="width: 100%;"
            />
          </div>
          <div class="flex flex-col mb-4">
            <label for="tournamentEndDate" class="text-sm text-left mb-2"
              >End date</label
            >
            <date-picker
              id="tournamentEndDate"
              name="tournamentEndDate"
              v-model="newTournamentInfo.endDate"
              type="datetime"
              :lang="lang"
              style="width: 100%;"
            />
          </div>
          <div class="flex flex-col mb-4">
            <label for="tournamentEndDate" class="text-sm text-left mb-2"
              >Game limit (-1 is infinite)</label
            >
            <input
              v-model="newTournamentInfo.gameLimit"
              type="number"
              class="pl-2 pr-1 rounded border border-gray-300 w-16 text-left focus:outline-none"
            />
          </div>
          <div class="flex flex-row items-center mb-8">
            <label for="tournamentEndDate" class="text-sm text-left mr-4"
              >Open</label
            >
            <input
              class="ml-1"
              type="checkbox"
              v-model="newTournamentInfo.isOpen"
            />
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
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

export default {
  name: "TournamentCreationModal",
  components: {
    DatePicker,
  },
  props: ["tournament"],
  data() {
    return {
      lang: {
        formatLocale: {
          firstDayOfWeek: 1,
        },
        monthBeforeYear: false,
      },
      editedTournamentId: null,
      newTournamentInfo: {
        startDate: new Date(),
        endDate: new Date(),
        gameLimit: -1,
        isOpen: true,
      },
    };
  },
  beforeMount() {
    if(typeof this.tournament.id !== "undefined") {
      this.editedTournamentId = this.tournament.id;
      this.newTournamentInfo = {
        name: this.tournament.name,
        startDate: new Date(this.tournament.startDate),
        endDate: new Date(this.tournament.endDate),
        gameLimit: this.tournament.gameLimit,
        isOpen: this.tournament.isOpen,
      };
    }
  },
  methods: {
    close() {
      this.$emit("close");
    },
    save() {
      this.newTournamentInfo.gameLimit = this.newTournamentInfo.gameLimit*1;
      this.$emit("save");
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
