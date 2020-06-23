<template>
  <div class="search">
    <div
      class="mx-3 my-3"
      v-for="(item, index) in searchItems"
      :key="
        item.id.kind === 'youtube#channel'
          ? item.id.channelId
          : item.id.kind === 'youtube#video'
          ? item.id.videoId
          : item.id.kind === 'youtube#playlist'
          ? item.id.playlistId
          : 'youtubeItem' + index
      "
    >
      <VideoItem v-if="item.id.kind === 'youtube#video'" :item="item" />
      <pre v-else>{{ item }}</pre>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import store from '@/store';

import AxiosClient from '../api/index';
import VideoItem from '@/components/VideoItem.vue';

@Component({
  components: {
    VideoItem
  }
})
export default class Search extends Vue {
  axiosClient = AxiosClient.getInstance();

  get searchItems() {
    return store.state.searchResult.items;
  }
}
</script>
