<template>
  <div>
    <SearchFilters v-show="searchItems" :windowWidth="windowWidth" :changedTotalResults="changedTotalResults" />
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
      <ChannelItem v-if="item.id.kind === 'youtube#channel'" :item="item" />
      <VideoItem v-else-if="item.id.kind === 'youtube#video'" :item="item" />
      <PlaylistItem v-else-if="item.id.kind === 'youtube#playlist'" :item="item" />
      <p v-else>{{ item.id.kind }}</p>
    </div>
    <button v-show="searchItems" v-if="windowWidth < 600" id="load-more-button" class="mt-2" @click="loadMore">
      {{ loadingStatus ? '' : 'Load More' }}
      <LoadingSpinner v-if="loadingStatus" />
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import store from '@/store';
import AxiosClient from '@/api/index';
import VideoItem from '@/components/youtube-items/VideoItem.vue';
import ChannelItem from '@/components/youtube-items/ChannelItem.vue';
import PlaylistItem from '@/components/youtube-items/PlaylistItem.vue';
import LoadingSpinner from '@/components/loading/LoadingSpinner.vue';
import SearchFilters from '@/components/SearchFilters.vue';

@Component({
  components: {
    VideoItem,
    ChannelItem,
    PlaylistItem,
    LoadingSpinner,
    SearchFilters
  }
})
export default class Search extends Vue {
  axiosClient = AxiosClient.getInstance();
  windowWidth = 0;
  searchQuery = '';
  totalResults = '';

  get loadingStatus(): boolean {
    return store.state.isLoading;
  }

  get searchItems() {
    return store.state.searchResult.items;
  }

  get changedTotalResults() {
    if (store.state.searchResult.pageInfo)
      return Number(store.state.searchResult.pageInfo.totalResults).toLocaleString();
    else return '';
  }

  async created() {
    if (!store.state.isLoading && !store.state.searchResult.items) {
      const searchQuery = this.$route.query.query as string;
      if (searchQuery && searchQuery.trim()) {
        this.searchQuery = searchQuery.trim();
        await this.axiosClient.getSearchResults(this.searchQuery.trim());
        this.totalResults = Number(store.state.searchResult.pageInfo.totalResults).toLocaleString();
      }
    }
  }

  mounted() {
    this.windowWidth = window.innerWidth;
    window.addEventListener('resize', this.onResize);
    window.addEventListener('scroll', this.onScroll);
  }

  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('scroll', this.onScroll);
  }

  onResize() {
    this.windowWidth = window.innerWidth;
  }

  onScroll() {
    if (store.state.searchResult.nextPageToken && this.windowWidth >= 600) {
      const isBottomOfWindowReached =
        Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) +
          window.innerHeight ===
        document.documentElement.offsetHeight;

      if (isBottomOfWindowReached) this.loadMore();
    }
  }

  loadMore() {
    if (!store.state.isLoading) {
      this.axiosClient.getSearchResults(
        this.searchQuery.trim(),
        store.state.filters,
        store.state.searchResult.nextPageToken
      );
    }
  }
}
</script>

<style scoped lang="scss">
#load-more-button {
  width: 100%;
  height: 3rem;
  padding: 0.5rem;
  font-size: larger;
}
</style>
