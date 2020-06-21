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
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class HeadBar extends Vue {
  public searchQuery = '';

  public goToSearch (): void {
    // with query, resulting in /register?plan=private
    this.$router.push({ path: '/search', query: { query: this.searchQuery.trim() } })
  }
}
</script>

<style scoped lang="scss">
.desktop-header {
  position: fixed;
  display: flex;
  align-items: center;

  .search-button {
    background-image: url('../assets/search-icon.jpg');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    height: 100%;
    width: 30px;
  }

  .logo {
    height: 30px;
  }

  .search-field:focus, textarea:focus {
    outline: none;
    box-shadow: 0 0 3px #065fd4;
    padding: 3px 0px 3px 3px;
    margin: 5px 1px 3px 0px;
    border: 1px solid #065fd4;
  }

  .search-container {
    margin-left: 30px;
    height: 30px;
    display: flex;
  }
}
</style>
