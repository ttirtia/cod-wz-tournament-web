import Vue from "vue";
import Vuex from "vuex";
import VueRouter from "vue-router";
import App from "./App.vue";
import "./index.css";
import { createProvider } from "./vue-apollo";
import { onLogout, onLogin, apolloClient } from "@/vue-apollo";
import { LOGIN_USER } from "@/graphql/mutations";
import jwt_decode from "jwt-decode";
import createPersistedState from "vuex-persistedstate";

import Table from "./components/Table.vue";
import Home from "./components/Tournaments.vue";
import Results from "./components/ResultsInput.vue";
import Login from "./components/Login.vue";

Vue.use(VueRouter);
Vue.use(Vuex);

Vue.config.productionTip = false;

const routes = [
  { path: "/", component: Home, name: "home", meta: { requiresAuth: true } },
  { path: "/table/:id", props: true ,component: Table, name: "table", meta: { requiresAuth: true } },
  {
    path: "/results",
    component: Results,
    name: "results",
    meta: { requiresAuth: true },
  },
  { path: "/login", component: Login, name: "login" },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

const store = new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    token: null,
    user: {},
    authStatus: false,
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    authStatus: (state) => state.authStatus,
    user: (state) => state.user,
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
    LOGIN_USER(state, user) {
      state.isAuthenticated = true;
      state.authStatus = true;
      state.user = { ...user };
    },
    LOGOUT_USER(state) {
      state.authStatus = "";
      state.isAuthenticated = false;
      state.token = "" && localStorage.removeItem("apollo-token");
    },
  },
  actions: {
    async login({ commit /*, dispatch*/ }, authInfo) {
      try {
        const { data } = await apolloClient.mutate({
          mutation: LOGIN_USER,
          variables: { ...authInfo },
        });
        const token = JSON.stringify(data.login);
        await Promise.all([
          commit("SET_TOKEN", token),
          commit("LOGIN_USER", jwt_decode(token))
        ]);
        onLogin(apolloClient, token);
      } catch (e) {
        console.log(e);
      }
    },
    async logOut({ commit }) {
      await commit("LOGOUT_USER");
      onLogout(apolloClient);
    },
  },
});

// Global Route Guards
router.beforeEach((to, from, next) => {
  // Check if the user is logged in
  const isUserLoggedIn = store.getters.isAuthenticated;
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isUserLoggedIn) {
      store.dispatch("logOut");
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

new Vue({
  apolloProvider: createProvider(),
  router,
  render: (h) => h(App),
  store,
}).$mount("#app");
