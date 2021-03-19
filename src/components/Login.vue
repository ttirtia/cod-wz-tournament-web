<template>
  <layout-default>
<div class="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-md w-full space-y-8">
    <div>
      <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Sign in to your account
      </h2>
    </div>
     <form v-if="!isAuthenticated" class="mt-8 space-y-6" action="POST" @submit.prevent="loginUser">
      <input type="hidden" name="remember" value="true">
      <div class="rounded-md shadow-sm -space-y-px">
        <div>
          <label for="username" class="sr-only">Username</label>
          <input v-model="authInfo.username" id="username" name="username" type="text" autocomplete="username" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Username">
        </div>
        <div>
          <label for="password" class="sr-only">Password</label>
          <input v-model="authInfo.password" id="password" name="password" type="password" autocomplete="current-password" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password">
        </div>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <input id="remember_me" name="remember_me" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded">
          <label for="remember_me" class="ml-2 block text-sm text-gray-900">
            Remember me
          </label>
        </div>

        <div class="text-sm">
          <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
            Forgot your password?
          </a>
        </div>
      </div>

      <div>
        <!-- <button @click="login()" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"> -->
          <button class="auth-submit w-full px-3 py-2 mt-4 rounded-md font-medium tracking-widest text-white shadow-lg focus:outline-none bg-gray-900">
          Sign in
        </button>
      </div>
    </form>
    <div v-if="isAuthenticated" class="mt-8 space-y-6">
      <p>Hi {{user.username}}, you're already logged-in</p>
      <a v-on:click="logoutUser()" href="#" class="font-medium text-indigo-600 hover:text-indigo-500">Log-out</a>
    </div>
  </div>
</div>
</layout-default>
</template>
<script>
  import LayoutDefault from "../layouts/LayoutDefault.vue";
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: "Login",
    components: {
      LayoutDefault,
    }, 
    data () {
        return {
          authInfo: {
          username: '',
          password: ''
        }
        }
      },
      computed:{
        ...mapGetters(['isAuthenticated', 'user']),
        ...mapGetters(['user'])
      },
    methods: {
      ...mapActions(['login']),
      ...mapActions(['logOut']),
      loginUser: function () {
      this.login(this.authInfo)
        .then(() => this.$router.push('/').catch(() => {}))
        
      },
      logoutUser: function () {
      this.logOut()
        .then(() => this.$router.push('/login').catch(() => {}))
    
    }}
  };
</script>
