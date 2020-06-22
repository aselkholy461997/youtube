<template>
  <div id="app">
    <LoadingItem/>
    <HeadBar/>
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
</style>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'

import LoadingItem from '@/components/LoadingItem.vue'
import HeadBar from '@/components/HeadBar.vue'

@Component({
  components: {
    LoadingItem,
    HeadBar
  }
})
export default class App extends Vue {
}
</script>
