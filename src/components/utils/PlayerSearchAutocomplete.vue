<template>
  <div class="flex flex-col">
    <input
      type="text"
      @input="onChange"
      v-model="search"
      placeholder="Search for a player..."
      class="rounded-md border-gray-400 border focus:outline-none pl-2 py-1"
    />
    <ul
      v-show="isOpen"
      class="border border-t-0 border-gray-400 rounded-md bg-white overflow-auto h-28"
    >
      <li class="loading" v-if="isLoading">Loading results...</li>
      <li
        v-else
        v-for="player in players"
        :key="player.id"
        @click="setPlayer(player)"
        class="text-left px-2 py-1.5 hover:bg-gray-200 text-md cursor-pointer"
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
