<template>
  <layout-default>
    <div
      v-if="isAuthenticated && user.isAdmin"
      class="font-sans"
    >
      <!-- Sidebar - wide -->
      <div
        class="w-0 h-0 invisible sm:visible sm:w-56 sm:h-auto sm:min-h-full absolute border-r-2 border-gray-200 border-opacity-50 bg-white"
      >
        <p
          class="text-lg font-semibold px-6 py-4 rounded-sm border-b-2 border-blue-400 border-opacity-50"
        >
          Administration
        </p>
        <div class="flex flex-col pt-2 px-2">
          <button
            @click="goTo('players')"
            class="hover:bg-gray-200 p-4 rounded-md text-left focus:outline-none"
          >
            Players
          </button>
          <button
            @click="goTo('tournaments')"
            class="hover:bg-gray-200 p-4 rounded-md text-left focus:outline-none"
          >
            Tournaments
          </button>
          <button
            @click="goTo('users')"
            class="hover:bg-gray-200 p-4 rounded-md text-left focus:outline-none"
          >
            Users
          </button>
          <button
            @click="goTo('invitations')"
            class="hover:bg-gray-200 p-4 rounded-md text-left focus:outline-none"
          >
            Invitations
          </button>
        </div>
      </div>

      <!-- Sidebar - small -->
      <div class="sm:hidden">
        <div
          @click="showAdminMenu"
          class="flex flex-row bg-white items-center justify-center space-x-2 px-6 py-4 rounded-sm border-blue-400 border-opacity-50 cursor-pointer"
          :class="smAdminMenu ? '' : 'border-b-2'"
        >
          <p class="text-lg font-semibold font-sans">Administration</p>
          <i v-if="smAdminMenu" class="ri-arrow-up-s-line"></i>
          <i v-else class="ri-arrow-down-s-line"></i>
        </div>
        <div
          v-if="smAdminMenu"
          class="flex flex-col py-2 px-2 border-2 border-blue-400 border-opacity-50"
        >
          <button
            @click="goTo('players')"
            class="hover:bg-gray-200 p-4 rounded-md text-left focus:outline-none"
          >
            Players
          </button>
          <button
            @click="goTo('tournaments')"
            class="hover:bg-gray-200 p-4 rounded-md text-left focus:outline-none"
          >
            Tournaments
          </button>
          <button
            @click="goTo('users')"
            class="hover:bg-gray-200 p-4 rounded-md text-left focus:outline-none"
          >
            Users
          </button>
          <button
            @click="goTo('invitations')"
            class="hover:bg-gray-200 p-4 rounded-md text-left focus:outline-none"
          >
            Invitations
          </button>
        </div>
      </div>

      <!-- Content -->
      <div class="p-8 sm:pl-64">
        <Players v-if="view === 'players'" />
        <Users v-if="view === 'users'" />
        <Invitations v-if="view === 'invitations'" />
        <Tournaments v-if="view === 'tournaments'" />
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
import Tournaments from "./admin/Tournaments";
import { mapGetters } from "vuex";

export default {
  name: "Login",
  components: {
    LayoutDefault,
    Players,
    Users,
    Invitations,
    Tournaments,
  },
  data() {
    return {
      authInfo: {
        username: "",
        password: "",
      },
      view: this.$route.params.view,
      invitations: [],
      smAdminMenu: false,
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated", "user"]),
  },
  methods: {
    goTo: function (section) {
      if (this.view === section) return;
      this.$router.push("/admin/" + section);
      this.view = section;
      this.smAdminMenu = false;
    },
    showAdminMenu: function () {
      this.smAdminMenu = !this.smAdminMenu;
    },
  },
};
</script>
