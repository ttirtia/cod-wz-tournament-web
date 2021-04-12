import Vue from "vue";
import VueApollo from "vue-apollo";
import { createApolloClient, restartWebsockets } from "vue-cli-plugin-apollo/graphql-client";
import { setContext } from "apollo-link-context";
import { onError } from "apollo-link-error"

// Used to translate error messages. Variable is passed to the createProvider function
var i18n;

// Install the vue plugin
Vue.use(VueApollo);

// Name of the localStorage item
const AUTH_TOKEN = "token";

// Http endpoint
const httpEndpoint =
  process.env.VUE_APP_GRAPHQL_HTTP || "http://localhost:8888/graphql";

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = Vue.$cookies.get(AUTH_TOKEN);
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      "Authorization": `Bearer ${token}`,
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {

  //if we're in production, just show generic message without details
  if (process.env.NODE_ENV === 'production') {
    Vue.notify({
          group: "error",
          title: i18n.t('oops'),
          text: i18n.t('msgSomethingWentWrong'),
          type: "error"
        });
    return;
  }

  if (graphQLErrors){
      graphQLErrors.forEach(function(error) {
        Vue.notify({
          group: "error",
          title: "GraphQl error",
          text: error.message,
          type: "error",
          duration: 10000, // default is 3000
        });
      });
    }

    if (networkError) {
      // do something with network errors, if we need to
    }

});

// Config
const defaultOptions = {
  // You can use `https` for secure connection (recommended in production)
  httpEndpoint,
  // You can use `wss` for secure connection (recommended in production)
  // Use `null` to disable subscriptions
  wsEndpoint: null,
  // LocalStorage token
  tokenName: AUTH_TOKEN,
  // Enable Automatic Query persisting with Apollo Engine
  persisting: false,
  // Use websockets for everything (no HTTP)
  // You need to pass a `wsEndpoint` for this to work
  websocketsOnly: false,
  // Is being rendered on the server?
  ssr: false,

  // Override default apollo link
  // note: don't override httpLink here, specify httpLink options in the
  // httpLinkOptions property of defaultOptions.
  link: authLink.concat(errorLink),

  // Override default cache
  // cache: myCache

  // Override the way the Authorization header is set
  // getAuth: (tokenName) => ...

  // Additional ApolloClient options
  // apollo: { ... }

  // Client local data (see apollo-link-state)
  // clientState: { resolvers: { ... }, defaults: { ... } }
};

export const { apolloClient, wsClient } = createApolloClient({
  ...defaultOptions,
  // ...options
});
apolloClient.wsClient = wsClient;

// Call this in the Vue app file
export function createProvider(_i18n) {
  // Create vue apollo provider
  const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
    defaultOptions: {
      $query: {
        // fetchPolicy: 'cache-and-network',
      },
    },
  });

  i18n = _i18n;

  return apolloProvider;
}

// Manually call this when user log in
export async function onLogin(apolloClient, token) {
  if (typeof localStorage !== "undefined" && token) {
    localStorage.setItem(AUTH_TOKEN, token);
  }
  if (apolloClient.wsClient) restartWebsockets(apolloClient.wsClient);
  try {
    await apolloClient.resetStore();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log("%cError on cache reset (login)", "color: orange;", e.message);
  }
}

// Manually call this when user log out
export async function onLogout(apolloClient) {
  if (typeof localStorage !== "undefined") {
    localStorage.removeItem(AUTH_TOKEN);
  }
  // if (apolloClient.wsClient) restartWebsockets(apolloClient.wsClient)
  try {
    await apolloClient.resetStore();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log("%cError on cache reset (logout)", "color: orange;", e.message);
  }
}
