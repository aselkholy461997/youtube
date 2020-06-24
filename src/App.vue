<template>
  <div id="app">
    <LoadingBar v-if="loadingStatus && windowWidth >= 600" />
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
import store from '@/store';

import LoadingBar from '@/components/loading/LoadingBar.vue';
import HeadBar from '@/components/HeadBar.vue';

@Component({
  components: {
    LoadingBar,
    HeadBar
  }
})
export default class App extends Vue {
  windowWidth = 0;

  mounted() {
    this.windowWidth = window.innerWidth;
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth;
    });
  }

  beforeDestroy() {
    window.removeEventListener('resize', () => {
      this.windowWidth = window.innerWidth;
    });
  }

  get loadingStatus(): boolean {
    return store.state.isLoading;
  }
}
</script>
