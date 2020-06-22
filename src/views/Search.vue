<template>
  <div class="search">
    <p>Welcome to Your Vue.js App</p>
  </div>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';

import AxiosClient from '../api/index';

@Component
export default class Search extends Vue {
  private axiosClient = AxiosClient.getInstance();
  public uploadDate = 'This week';
  public Type = 'Channel';
  public SortBy = 'default';
}
</script>
