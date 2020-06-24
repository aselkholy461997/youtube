<template>
  <div class="desktop-header">
    <img class="logo" src="../assets/desktop-logo.png" />
    <div class="search-container">
      <input
        type="search"
        class="search-field"
        required
        placeholder="Search"
        v-model="searchQuery"
        @keyup.enter="goToSearch"
      />
      <button class="search-button cursor-pointer" @click="goToSearch"></button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import AxiosClient from '../api/index';

@Component
export default class HeadBar extends Vue {
  axiosClient = AxiosClient.getInstance();
  searchQuery = '';

  goToSearch(): void {
    if (this.searchQuery.trim()) {
      this.axiosClient.getSearchResults(this.searchQuery.trim());
      if (this.$route.fullPath !== `/search?query=${this.searchQuery.trim()}`)
        this.$router.push({
          path: '/search',
          query: { query: this.searchQuery.trim() }
        });
    }
  }
}
</script>

<style scoped lang="scss">
.desktop-header {
  height: 2.5rem;
  display: flex;
  flex-direction: row;
  flex-shrink: 30%;
  flex-basis: content;
  align-items: center;
  justify-content: space-between;
  padding: 12px 15%;
  // border-bottom: 1px solid #dbdbdb;
  box-shadow: 0 1px 10px -5px #888888;
  position: relative;

  .search-button {
    background-image: url('../assets/search-icon.jpg');
    background-size: 15px;
    padding: 0px;
    margin: 0px;
    background-repeat: no-repeat;
    background-position: center;
    width: 4.5rem;
    border-radius: 0px 3px 3px 0px;
  }

  .logo {
    height: auto;
    max-height: 60%;
    max-width: 20%;
  }

  .search-field {
    width: calc(100% - 4.5rem);
    box-shadow: 0 0 2px #dbdbdb;
    border-radius: 3px 0px 0px 3px;
    padding-right: 0.5rem;
    padding-left: 0.5rem;
  }

  .search-button,
  .search-field {
    height: 100%;
    outline: none;
    border-color: groove #dbdbdb;
    border-width: thin;
  }

  .search-field:focus,
  textarea:focus {
    box-shadow: 0 0 2px #065fd4;
    // padding: 3px 0px 3px 3px;
    border-color: #065fd4;
  }

  .search-container {
    //margin-left: 50px;
    height: 100%;
    display: flex;
    width: 60%;
  }
}
</style>
