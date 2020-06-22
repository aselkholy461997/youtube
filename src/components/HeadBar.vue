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
      <button class="search-button" @click="goToSearch"></button>
    </div>
  </div>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';

import AxiosClient from '../api/index';

@Component
export default class HeadBar extends Vue {
  private axiosClient = AxiosClient.getInstance();
  public searchQuery = '';

  public goToSearch (): void {
    if (this.searchQuery.trim()) {
      this.axiosClient.getSearchResults(this.searchQuery.trim());
      if (this.$route.fullPath !== `/search?query=${this.searchQuery.trim()}`)
        this.$router.push({
          path: '/search',
          query: { query: this.searchQuery.trim() }
        });
    }
    // with query, resulting in /register?plan=private
  }
}
</script>

<style scoped lang="scss">
.desktop-header {
  flex-shrink: 30%;
  flex-basis: content;
  // position: fixed;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding-bottom: 12px;
  // border-bottom: 1px solid #dbdbdb;

  .search-button {
    background-image: url('../assets/search-icon.jpg');
    background-size: 15px;
    padding: 0px;
    margin: 0px;
    background-repeat: no-repeat;
    background-position: center;
    width: 75px;
    border-radius: 0px 3px 3px 0px;
  }

  .logo {
    height: 20px;
    padding: 0px;
  }

  .search-field {
    width: 450px;
    box-shadow: 0 0 2px #dbdbdb;
    border-radius: 3px 0px 0px 3px;
  }

  .search-button,
  .search-field {
    height: 100%;
    outline: none;
    border-color: 1px groove #dbdbdb;
    border-width: thin;
  }

  .search-field:focus,
  textarea:focus {
    box-shadow: 0 0 2px #065fd4;
    padding: 3px 0px 3px 3px;
    border-color: #065fd4;
  }

  .search-container {
    //margin-left: 50px;
    height: 35px;
    display: flex;
  }
}
</style>
