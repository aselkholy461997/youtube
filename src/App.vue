<template>
  <div id="app">
    <LoadingItem />
    <HeadBar />

    <router-view class="router-view" />
  </div>
</template>

<style lang="scss">
#app {
  font-family: sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.router-view {
  background-color: #fafafa;
  padding: 1rem;
  min-height: calc(100vh - 6rem);
  @media (min-width: 600px) {
    padding: 1rem 15%;
  }
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import LoadingItem from '@/components/LoadingItem.vue';
import HeadBar from '@/components/HeadBar.vue';

@Component({
  components: {
    LoadingItem,
    HeadBar
  }
})
export default class App extends Vue {}
</script>
