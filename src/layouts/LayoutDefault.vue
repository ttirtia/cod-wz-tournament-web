<template>
  <div class="LayoutDefault flex flex-col h-full font-sans">
    <nav class="bg-gray-800 fixed w-full z-10">
      <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div class="relative flex items-center justify-between h-16">
          <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <!-- Mobile menu button-->
            <button
              type="button"
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
              @click="mobileMenuOpen = !mobileMenuOpen"
            >
              <span class="sr-only capitalize-first">{{
                $t("openMainMenu")
              }}</span>
              <!--
            Icon when menu is closed.

            Heroicon name: outline/menu

            Menu open: "hidden", Menu closed: "block"
          -->
              <svg
                :class="(!mobileMenuOpen ? '' : 'hidden') + ' h-6 w-6'"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <!--
            Icon when menu is open.

            Heroicon name: outline/x

            Menu open: "block", Menu closed: "hidden"
          -->
              <svg
                :class="(mobileMenuOpen ? '' : 'hidden') + ' h-6 w-6'"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
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
          <div
            class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start"
          >
            <div class="flex-shrink-0 flex items-center">
              <img
                class="block h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                alt="Workflow"
              />
            </div>
            <div class="hidden sm:block sm:ml-6">
              <div class="flex space-x-4">
                <router-link
                  to="/"
                  v-bind:class="[
                    currentRouteName == 'home'
                      ? 'bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium capitalize-first'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium capitalize-first',
                  ]"
                  >{{ $tc("tournament", 2) }}</router-link
                >
                <router-link
                  to="/results"
                  v-bind:class="[
                    currentRouteName == 'results'
                      ? 'bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium capitalize-first'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium capitalize-first',
                  ]"
                  >{{ $tc("result", 2) }}</router-link
                >
              </div>
            </div>
          </div>
          <div
            class="absolute inset-y-0 right-0 flex items-center justify-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 space-x-4"
          >
            <!-- Profile dropdown -->
            <a
              v-for="(lang, i) in filteredLang"
              :key="`Lang${i}`"
              :value="lang"
              href="#"
              v-on:click="changeLang(lang)"
              class="text-gray-400 text-lg lg:text-xs uppercase"
              >{{ lang }}
            </a>
            <div v-if="isAuthenticated">
              <button
                id="user-menu"
                class="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-white transition duration-150 ease-in-out"
                aria-label="User menu"
                aria-haspopup="true"
                @click="dropdown = !dropdown"
              >
                <span class="sr-only capitalize-first">{{
                  $t("openUserMenu")
                }}</span>

                <img
                  class="h-8 w-8 rounded-full"
                  v-bind:src="
                    'https://ui-avatars.com/api/?name=' + user.username
                  "
                  alt=""
                />
              </button>
              <div
                style="background-color: white"
                :class="`origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg transition ease-${
                  dropdown ? 'out' : 'in'
                } duration-${dropdown ? '100' : '75'} transform opacity-${
                  dropdown ? '100' : '0'
                } scale-${dropdown ? '100' : '95'}`"
              >
                <a
                  href="#"
                  :class="`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 capitalize-first ${
                    dropdown ? '' : 'hidden'
                  } rounded-t-md`"
                  role="menuitem"
                  >{{ $tc("setting", 2) }}</a
                >
                <router-link
                  v-if="user.isAdmin"
                  to="/admin"
                  :class="`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 capitalize-first ${
                    dropdown ? '' : 'hidden'
                  }`"
                  >{{ $tc("administration") }}</router-link
                >
                <a
                  v-on:click="logoutUser"
                  href="#"
                  :class="`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 capitalize-first ${
                    dropdown ? '' : 'hidden'
                  }`"
                  role="menuitem"
                  >{{ $t("signOut") }}</a
                >
              </div>
            </div>
            <div
              v-else
              class="flex ml-3 text-indigo-500 text-base underline justify-center"
            >
              <router-link to="/login">{{ $t("signIn") }}</router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile menu, show/hide based on menu state. -->
      <div
        class="sm:hidden"
        :class="mobileMenuOpen ? '' : 'hidden'"
        id="mobile-menu"
      >
        <div class="px-2 pt-2 pb-3 space-y-1">
          <router-link
            to="/"
            v-bind:class="[
              currentRouteName == 'home'
                ? 'bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium capitalize-first'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium capitalize-first',
            ]"
            >{{ $tc("tournament", 2) }}</router-link
          >
          <router-link
            to="/results"
            v-bind:class="[
              currentRouteName == 'results'
                ? 'bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium capitalize-first'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium capitalize-first',
            ]"
            >{{ $tc("result", 2) }}</router-link
          >
        </div>
      </div>
    </nav>
    <main class="LayoutDefault__main flex-grow mt-16">
      <slot />
    </main>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters(["user"]), // Gets current user
    ...mapGetters(["isAuthenticated", "user"]),
    currentRouteName() {
      return this.$route.name;
    },
    filteredLang() {
      return this.langs.filter((lang) => {
        return lang != this.$i18n.locale;
      });
    },
  },
  data() {
    return {
      dropdown: false,
      langs: ["fr", "en"],
      mobileMenuOpen: false,
    };
  },
  methods: {
    ...mapActions(["logOut"]),
    logoutUser: function () {
      this.logOut().then(() => this.$router.push("/login").catch(() => {}));
    },
    changeLang: function (newLang) {
      this.$i18n.locale = newLang;
      this.$cookies.set(
        "language",
        newLang,
        new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 365).toGMTString()
      ); // Expires in 1 year
    },
  },
};
</script>
