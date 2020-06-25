<template>
  <div id="app-header">
    <img class="logo cursor-pointer" />
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
import store from '@/store';

import AxiosClient from '@/api/index';

@Component
export default class HeadBar extends Vue {
  axiosClient = AxiosClient.getInstance();
  searchQuery = '';

  mounted() {
    if (!store.state.isLoading && !store.state.searchResult.items) {
      const searchQuery = this.$route.query.query as string;

      if (searchQuery && searchQuery.trim()) {
        this.searchQuery = searchQuery.trim();
        this.axiosClient.getSearchResults(this.searchQuery.trim());
      }
    }
  }

  goToSearch(): void {
    if (this.searchQuery.trim()) {
      if (this.$route.fullPath !== `/search?query=${this.searchQuery.trim()}`) {
        this.axiosClient.getSearchResults(this.searchQuery.trim());
        this.$router.push({
          path: '/search',
          query: { query: this.searchQuery.trim() }
        });
      }
    }
  }
}
</script>

<style scoped lang="scss">
#app-header {
  height: 2.5rem;
  display: flex;
  flex-direction: row;
  flex-shrink: 30%;
  flex-basis: content;
  align-items: center;
  justify-content: space-between;
  padding: 12px;

  box-shadow: 0 1px 10px -5px #888888;
  position: relative;
  background-color: #ff0000;

  @media (min-width: 600px) {
    background-color: #ffffff;
    padding: 12px 15%;
  }

  .search-button {
    background-image: url('../assets/mobile-search-icon.png');
    background-size: 1rem;
    padding: 0px;
    margin: 0px;
    background-repeat: no-repeat;
    background-position: center;
    background-color: transparent;
    width: 3rem;
    border-width: 0;

    @media (min-width: 600px) {
      border-radius: 0px 3px 3px 0px;
      background-image: url('../assets/desktop-search-icon.png');
      background-color: #efefef;
      width: 4.5rem;
      border-width: thin;
    }
  }

  .logo {
    height: auto;
    max-height: 60%;
    content: url('../assets/mobile-logo.png');

    @media (min-width: 600px) {
      content: url('../assets/desktop-logo.png');
      max-width: 20%;
    }
  }

  .search-button,
  .search-field {
    height: 100%;
    outline: none;
  }

  .search-field {
    width: 100%;
    box-shadow: 0 0 2px #dbdbdb;
    padding-right: 0.5rem;
    padding-left: 0.5rem;
    border-width: 0;
    color: white;
    background: transparent;
    box-shadow: none;

    @media (min-width: 600px) {
      border-radius: 3px 0px 0px 3px;
      border-width: thin;
      color: black;
      background: white;
    }
  }

  // .search-button,
  // .search-field {
  //   height: 100%;
  //   outline: none;
  //   border: none;
  //   color: white;
  //   background: transparent;

  //   @media (min-width: 600px) {
  //     border: thick;
  //     color: black;
  //     background-color: white;
  //   }
  // }

  .search-field:focus,
  textarea:focus {
    color: black;
    background: white;

    @media (min-width: 600px) {
      box-shadow: 0 0 2px #065fd4;
      border-color: #065fd4;
    }
  }

  .search-container {
    //margin-left: 50px;
    height: 100%;
    display: flex;
    width: 100%;
    margin-left: 1rem;
    @media (min-width: 600px) {
      margin-left: 0;
      width: 60%;
    }

    ::placeholder {
      color: white;
      @media (min-width: 600px) {
        color: black;
      }
    }
  }
}
</style>
