<template>
  <layout-default>
    <div class="flex flex-grow justify-center pt-12">
      <div class="space-y-8">
        <div>
          <img
            class="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>
        <form
          v-if="this.$route.query.id && !isAuthenticated"
          class="mt-8 space-y-6"
          action="POST"
          @submit.prevent="createUser"
        >
          <input type="hidden" name="remember" value="true" />
          <div class="rounded-md shadow-sm -space-y-px">
            <div>
              <label for="username" class="sr-only">Username</label>
              <input
                v-model="userInfo.username"
                id="username"
                name="username"
                type="text"
                autocomplete="username"
                required
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username"
              />
            </div>
            <div>
              <label for="password" class="sr-only">Password</label>
              <input
                v-model="userInfo.password"
                id="password"
                name="password"
                type="password"
                autocomplete="current-password"
                required
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>
          <div>
            <!-- <button @click="login()" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"> -->
            <button
              class="auth-submit w-full px-3 py-2 mt-4 rounded-md font-medium tracking-widest text-white shadow-lg focus:outline-none bg-gray-900"
            >
              Register
            </button>
          </div>
        </form>

        <div v-if="!this.$route.query.id" class="mt-8 space-y-6">
          <p>You need an invitation to create an account.</p>
        </div>

        <div v-if="isAuthenticated" class="mt-8 space-y-6">
          <p>Hi {{ user.username }}, you're already logged-in</p>
          <a
            v-on:click="logoutUser()"
            href="#"
            class="font-medium text-indigo-600 hover:text-indigo-500"
            >Log-out</a
          >
        </div>
      </div>
    </div>
  </layout-default>
</template>
<script>
import LayoutDefault from "../layouts/LayoutDefault.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Register",
  components: {
    LayoutDefault,
  },
  data() {
    return {
      userInfo: {
        username: "",
        password: "",
      },
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated", "user"]),
  },
  methods: {
    ...mapActions(["login", "logOut", "apiCreateUser"]),
    createUser: function () {
      this.apiCreateUser({
        invitationId: this.$route.query.id,
        userInfo: this.userInfo,
      }).then(() =>
        this.login(this.userInfo).then(() =>
          this.$router.push("/").catch(() => {})
        )
      );
    },
    logoutUser: function () {
      this.logOut();
    },
  },
};
</script>
