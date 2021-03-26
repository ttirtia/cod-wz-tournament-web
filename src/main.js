import Vue from "vue";
import Vuex from "vuex";
import VueRouter from "vue-router";
import VueCookies from "vue-cookies";
import App from "./App.vue";
import "./index.css";
import { createProvider } from "./vue-apollo";
import { onLogout, onLogin, apolloClient } from "@/vue-apollo";
import { LOGIN_USER } from "@/graphql/mutations";
import jwt_decode from "jwt-decode";
import createPersistedState from "vuex-persistedstate";
import VueI18n from 'vue-i18n';
import 'remixicon/fonts/remixicon.css'

import Table from "./components/Table.vue";
import Home from "./components/Tournaments.vue";
import Results from "./components/ResultsInput.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import Administration from "./components/Administration.vue";
import AdminTournament from "./components/admin/Tournament.vue";
import AdminTeam from "./components/admin/Team.vue";
import {
  FIND_PLAYERS,
  FIND_TOURNAMENTS,
  FIND_TEAMS,
  FIND_USERS,
  FIND_INVITATIONS,
} from "./graphql/queries";
import {
  CREATE_PLAYER,
  DELETE_PLAYER,
  CREATE_TOURNAMENT,
  DELETE_TOURNAMENT,
  UPDATE_TOURNAMENT,
  CREATE_TEAM,
  UPDATE_TEAM,
  DELETE_TEAM,
  CREATE_GAME,
  UPDATE_GAME,
  DELETE_GAME,
  CREATE_USER,
  DELETE_USER,
  UPDATE_USER,
  CREATE_INVITATION,
  DELETE_INVITATION
} from "./graphql/mutations";

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueCookies);
Vue.use(VueI18n);

Vue.config.productionTip = false;

const routes = [
  { path: "/", component: Home, name: "home", meta: { requiresAuth: true } },
  {
    path: "/table/:id",
    props: true,
    component: Table,
    name: "table",
    meta: { requiresAuth: true },
  },
  {
    path: "/results",
    component: Results,
    name: "results",
    meta: { requiresAuth: true },
  },
  {
    path: "/admin",
    redirect: "/admin/players",
    name: "adminRedirect",
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: "/admin/:view",
    component: Administration,
    name: "admin",
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: "/admin/tournaments/:id",
    component: AdminTournament,
    name: "adminTournament",
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: "/admin/teams/:id",
    component: AdminTeam,
    name: "adminTeam",
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  { path: "/login", component: Login, name: "login" },
  { path: "/register", component: Register, name: "register" },
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
      state.token = JSON.parse(token);
      Vue.$cookies.set(
        "token",
        JSON.parse(token),
        null,
        null,
        null,
        null,
        "Strict"
      );
    },
    LOGIN_USER(state, user) {
      state.isAuthenticated = true;
      state.authStatus = true;
      state.user = { ...user };
    },
    LOGOUT_USER(state) {
      state.authStatus = "";
      state.isAuthenticated = false;
      state.token = "";
      Vue.$cookies.remove("token");
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
          commit("LOGIN_USER", jwt_decode(token)),
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
    async apiFindTournaments(_, { filter, teamOrder }) {
      const { data } = await apolloClient.query({
        query: FIND_TOURNAMENTS,
        variables: {
          filter,
          teamOrder,
        },
        fetchPolicy: "network-only",
      });

      return data;
    },
    async apiCreateTournament(_, tournament) {
      const { data } = await apolloClient.mutate({
        mutation: CREATE_TOURNAMENT,
        variables: {
          tournament,
        },
      });

      return data;
    },
    async apiDeleteTournament(_, tournamentId) {
      const { data } = await apolloClient.mutate({
        mutation: DELETE_TOURNAMENT,
        variables: {
          id: tournamentId,
        },
      });

      return data;
    },
    async apiUpdateTournament(_, { id, tournament }) {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_TOURNAMENT,
        variables: {
          id,
          tournament,
        },
      });

      return data;
    },
    async apiFindTeams(_, filter) {
      const { data } = await apolloClient.query({
        query: FIND_TEAMS,
        variables: {
          filter,
        },
        fetchPolicy: "network-only",
      });

      return data;
    },
    async apiCreateTeam(_, team) {
      const { data } = await apolloClient.mutate({
        mutation: CREATE_TEAM,
        variables: {
          team,
        },
      });

      return data;
    },
    async apiUpdateTeam(_, { id, team }) {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_TEAM,
        variables: {
          id,
          team,
        },
      });

      return data;
    },
    async apiDeleteTeam(_, teamId) {
      const { data } = await apolloClient.mutate({
        mutation: DELETE_TEAM,
        variables: {
          id: teamId,
        },
      });

      return data;
    },
    async apiCreateGame(_, game) {
      const { data } = await apolloClient.mutate({
        mutation: CREATE_GAME,
        variables: {
          game,
        },
      });

      return data;
    },
    async apiUpdateGame(_, { id, game }) {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_GAME,
        variables: {
          id,
          game,
        },
      });

      return data;
    },
    async apiDeleteGame(_, gameId) {
      const { data } = await apolloClient.mutate({
        mutation: DELETE_GAME,
        variables: {
          id: gameId,
        },
      });

      return data;
    },
    async apiCreateUser(_, { invitationId, user }) {
      const { data } = await apolloClient.mutate({
        mutation: CREATE_USER,
        variables: {
          invitationId,
          user,
        },
      });

      return data;
    },
    async apiDeleteUser(_, userId) {
      const { data } = await apolloClient.mutate({
        mutation: DELETE_USER,
        variables: {
          id: userId,
        },
      });

      return data;
    },
    async apiFindPlayers(_, filter) {
      const { data } = await apolloClient.query({
        query: FIND_PLAYERS,
        variables: {
          filter,
        },
        fetchPolicy: "network-only",
      });

      return data;
    },
    async apiCreatePlayer(_, playerName) {
      const { data } = await apolloClient.mutate({
        mutation: CREATE_PLAYER,
        variables: {
          name: playerName,
        },
      });

      return data;
    },
    async apiDeletePlayer(_, playerId) {
      const { data } = await apolloClient.mutate({
        mutation: DELETE_PLAYER,
        variables: {
          id: playerId,
        },
      });

      return data;
    },
    async apiFindUsers(_, filter) {
      const { data } = await apolloClient.query({
        query: FIND_USERS,
        variables: {
          filter,
        },
        fetchPolicy: "network-only",
      });

      return data;
    },
    async apiUpdateUser(_, { id, user }) {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_USER,
        variables: {
          id,
          user,
        },
      });

      return data;
    },
    async apiFindInvitations() {
      const { data } = await apolloClient.query({
        query: FIND_INVITATIONS,
        fetchPolicy: "network-only",
      });

      return data;
    },
    async apiCreateInvitation(_, { player, isAdmin }) {
      const { data } = await apolloClient.mutate({
        mutation: CREATE_INVITATION,
        variables: {
          player,
          isAdmin,
        },
      });

      return data;
    },
    async apiDeleteInvitation(_, id) {
      const { data } = await apolloClient.mutate({
        mutation: DELETE_INVITATION,
        variables: {
          id,
        },
      });

      return data;
    },
  },
});

// Global Route Guards
router.beforeEach((to, from, next) => {
  // Check if the user is logged in
  const isUserLoggedIn = store.getters.isAuthenticated;
  const isUserAdmin = store.getters.user.isAdmin;
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
  } else if (to.matched.some((record) => record.meta.requiresAdmin)) {
    if (!isUserAdmin) {
      // TODO: Show a beautiful page telling users they can't be here
      next({
        path: "/",
        query: { redirect: to.fullPath },
      });
    }
  } else {
    next();
  }
});

import { languages, defaultLocale } from './locales/index.js'
const messages = Object.assign(languages)

const i18n = new VueI18n({
  locale: defaultLocale,
  fallbackLocale: 'fr',
  messages
})

new Vue({
  apolloProvider: createProvider(),
  router,
  render: (h) => h(App),
  store,
  i18n
}).$mount("#app");
