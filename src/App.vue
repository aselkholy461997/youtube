<template>
  <div id="app">
    <LoadingItem />
    <HeadBar />

    <router-view />
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

.d-flex {
  display: flex;
}

.mr-2 {
  margin-right: 0.5rem;
}

.mr-3 {
  margin-right: 1rem;
}

.mx-2 {
  margin-right: 0.5rem;
  margin-left: 0.5rem;
}

.mx-3 {
  margin-right: 1rem;
  margin-left: 1rem;
}

.mt-0 {
  margin-top: 0;
}

.mb-0 {
  margin-bottom: 0;
}

.my-3 {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.bold {
  font-weight: bold;
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
