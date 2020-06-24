<template>
  <div class="search">
    <div
      :class="{ 'mb-4': index != searchItems.length - 1 }"
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
      <VideoItem v-if="item.id.kind === 'youtube#channel'" :item="item" />
      <VideoItem v-else-if="item.id.kind === 'youtube#video'" :item="item" />
      <p v-else>{{ item.id.kind }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import store from '@/store';

import AxiosClient from '../api/index';
import VideoItem from '@/components/youtube-items/VideoItem.vue';
// import ChannelItem from '@/components/youtube-items/ChannelItem.vue';

@Component({
  components: {
    VideoItem
    // ChannelItem
  }
})
export default class Search extends Vue {
  axiosClient = AxiosClient.getInstance();

  get searchItems() {
    return store.state.searchResult.items;
  }
}
</script>
