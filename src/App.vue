<template>
  <div id="app">
    <router-view />
    <!-- <Table/> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  component: {

  },
  data () {
    return {

    }
  },
  methods: {
    logOut: function () {
      this.$store.dispatch('logOut')
        .then(() => this.$router.push('/login'))
    }

  },
  computed: {
    ...mapGetters(['authStatus', 'user'])
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
