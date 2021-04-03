<template>
  <div class="inline-block relative">
    <input
      type="text"
      @input="onChange"
      v-model="search"
      placeholder="Search for a player..."
      class="w-full border border-gray-300 placeholder-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-md pl-2 py-1 truncate"
    />
    <ul
      v-show="isOpen"
      class="w-full border border-t-0 border-gray-300 rounded-md bg-white overflow-auto h-28 mt-1 z-10 absolute"
    >
      <li class="loading" v-if="isLoading">Loading results...</li>
      <li
        v-else
        v-for="player in players"
        :key="player.id"
        @click="setPlayer(player)"
        class="text-left px-2 py-1.5 hover:bg-gray-200 text-md cursor-pointer z-auto"
      >
        {{ player.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "PlayerSearchAutocomplete",
  props: ["player"],
  data() {
    return {
      players: [],
      search: this.player ? this.player.name : null,
      isOpen: false,
      isLoading: false,
    };
  },
  watch: {
    players: function (value, oldValue) {
      if (value.length !== oldValue.length) {
        this.players = value;
        this.isLoading = false;
      }
    },
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  destroyed() {
    document.removeEventListener("click", this.handleClickOutside);
  },
  methods: {
    ...mapActions(["apiFindPlayers"]),
    setPlayer(player) {
      this.$emit("setPlayer", player);
      this.search = player.name;
      this.isOpen = false;
    },
    onChange() {
      if (this.search === "") this.$emit("setPlayer", null);
      this.apiFindPlayers({ name: this.search }).then((data) => {
        this.players = data.findPlayers;
      });

      this.isOpen = true;
    },
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.isOpen = false;
      }
    },
  },
};
</script>
