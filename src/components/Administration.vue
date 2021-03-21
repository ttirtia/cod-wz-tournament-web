<template>
  <layout-default>
    <div v-if="isAuthenticated && user.isAdmin" class="flex flex-col font-sans">
      <!-- Sidebar -->
      <div
        class="fixed flex-col h-full border-r-2 border-gray-200 border-opacity-50 bg-white text-left w-56"
      >
        <p
          class="text-lg font-semibold font-sans px-6 py-4 rounded-sm border-b-2 border-blue-400 border-opacity-50"
        >
          Administration
        </p>
        <div class="flex flex-col pt-2 px-2">
          <button
            @click="view = 'players'"
            class="hover:bg-gray-200 p-4 rounded-md text-left focus:outline-none"
          >
            Players
          </button>
          <button
            @click="view = 'teams'"
            class="hover:bg-gray-200 p-4 rounded-md text-left focus:outline-none"
          >
            Teams
          </button>
          <button
            @click="view = 'tournaments'"
            class="hover:bg-gray-200 p-4 rounded-md text-left focus:outline-none"
          >
            Tournaments
          </button>
          <button
            @click="view = 'users'"
            class="hover:bg-gray-200 p-4 rounded-md text-left focus:outline-none"
          >
            Users
          </button>
          <button
            @click="view = 'invitations'"
            class="hover:bg-gray-200 p-4 rounded-md text-left focus:outline-none"
          >
            Invitations
          </button>
        </div>
      </div>

      <!-- Content -->
      <div class="p-8 pl-64">
        <Players v-if="view === 'players'" />
        <Users v-if="view === 'users'" />
        <Invitations v-if="view === 'invitations'" />

        <!-- Teams content -->
        <div v-if="view === 'teams'">
          <p class="text-xl font-semibold">Teams</p>
        </div>

        <!-- Tournaments content -->
        <div v-if="view === 'tournaments'">
          <p class="text-xl font-semibold">Tournaments</p>
        </div>
      </div>
    </div>

    <div v-else class="mt-8 space-y-6">
      <p>YOU. SHALL. NOT. PASS.</p>
    </div>
  </layout-default>
</template>

<script>
import LayoutDefault from "../layouts/LayoutDefault.vue";
import Players from "./admin/Players";
import Users from "./admin/Users";
import Invitations from "./admin/Invitations";
import { mapGetters } from "vuex";

export default {
  name: "Login",
  components: {
    LayoutDefault,
    Players,
    Users,
    Invitations,
  },
  data() {
    return {
      authInfo: {
        username: "",
        password: "",
      },
      view: "players",
      invitations: [],
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated", "user"]),
  },
};
</script>
