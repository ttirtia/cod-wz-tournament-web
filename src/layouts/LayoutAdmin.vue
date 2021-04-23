<template>
  <layout-default>
    <div
      v-if="isAuthenticated && user.isAdmin"
      class="flex flex-col sm:flex-row h-full"
    >
      <!-- Sidebar - wide -->
      <div
        class="w-0 h-0 invisible sm:visible sm:w-56 sm:h-auto border-r-2 border-gray-200 border-opacity-50 bg-white"
      >
        <p
          class="text-lg font-semibold px-6 py-4 rounded-sm border-b-2 border-blue-400 border-opacity-50"
        >
          Administration
        </p>
        <div class="flex flex-col pt-2 px-2">
          <router-link
            to="/admin/players"
            class="hover:bg-gray-200 p-4 rounded-md text-left focus:outline-none"
          >
            Players
          </router-link>
          <router-link
            to="/admin/tournaments"
            class="hover:bg-gray-200 p-4 rounded-md text-left focus:outline-none"
          >
            Tournaments
          </router-link>
          <router-link
            to="/admin/users"
            class="hover:bg-gray-200 p-4 rounded-md text-left focus:outline-none"
          >
            Users
          </router-link>
          <router-link
            to="/admin/invitations"
            class="hover:bg-gray-200 p-4 rounded-md text-left focus:outline-none"
          >
            Invitations
          </router-link>
        </div>
      </div>

      <!-- Sidebar - small -->
      <div class="sm:hidden">
        <div
          @click="showAdminMenu"
          class="flex flex-row bg-white items-center justify-center space-x-2 px-6 py-4 rounded-sm border-blue-400 border-opacity-50 cursor-pointer"
          :class="smAdminMenu ? '' : 'border-b-2'"
        >
          <p class="text-lg font-semibold">Administration</p>
          <i v-if="smAdminMenu" class="ri-arrow-up-s-line"></i>
          <i v-else class="ri-arrow-down-s-line"></i>
        </div>
        <div
          v-if="smAdminMenu"
          class="flex flex-col py-2 px-2 bg-white border-2 border-blue-400 border-opacity-50"
        >
          <router-link
            to="/admin/players"
            class="hover:bg-gray-200 p-4 rounded-md text-left focus:outline-none"
          >
            Players
          </router-link>
          <router-link
            to="/admin/tournaments"
            class="hover:bg-gray-200 p-4 rounded-md text-left focus:outline-none"
          >
            Tournaments
          </router-link>
          <router-link
            to="/admin/users"
            class="hover:bg-gray-200 p-4 rounded-md text-left focus:outline-none"
          >
            Users
          </router-link>
          <router-link
            to="/admin/invitations"
            class="hover:bg-gray-200 p-4 rounded-md text-left focus:outline-none"
          >
            Invitations
          </router-link>
        </div>
      </div>

      <!-- Content -->
      <main class="p-8 flex-grow">
        <slot />
      </main>
    </div>

    <div v-else class="mt-8 space-y-6">
      <p>YOU. SHALL. NOT. PASS.</p>
    </div>
  </layout-default>
</template>

<script>
import LayoutDefault from "./LayoutDefault";
import { mapGetters } from "vuex";

export default {
  components: {
    LayoutDefault,
  },
  data() {
    return {
      smAdminMenu: false,
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated", "user"]),
  },
  methods: {
    showAdminMenu: function () {
      this.smAdminMenu = !this.smAdminMenu;
    },
  },
};
</script>
