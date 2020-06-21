<template>
  <div id="app">
    <div id="nav">
      <HeadBar/>
      <!-- <router-link to="/">Search</router-link> |
      <router-link to="/details">Details</router-link> -->
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 12px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'

import HeadBar from '@/components/HeadBar.vue'

@Component({
  components: {
    HeadBar
  }
})
export default class App extends Vue {
}
</script>
