<template>
  <div class="d-flex cursor-pointer">
    <!-- @click="goToDetails"  -->
    <div class="img-container mr-3">
      <img :src="thumbnail.url" alt="Playlist Image" />
      <div class="playlist-videos-count col">
        <p class="mb-2">{{ totalResults }}</p>
        <img src="../../assets/playlist-icon.png" alt="Playlist Icon"/>
      </div>
    </div>
    <div class="text-container col" :style="{ 'max-height': thumbnail.height + 'px' }">
      <p class="title my-0">
        {{ title }}
      </p>
      <p class="channel-title color-777 my-0">
        {{ item.snippet.channelTitle }}
      </p>
      <p class="description color-777">
        {{ item.snippet.description }}
      </p>
      <p class="watch-full-playlist color-777">VIEW FULL PLAYLIST ({{ totalResults }} VIDEOS)</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Mixins } from 'vue-property-decorator';
import YoutubeItem from '@/models/YoutubeItem';
import PlaylistDetails from '@/models/PlaylistDetails';
import HTMLEntitiesMixin from '@/mixins/HTMLEntitiesMixin';
import YoutubeItemsMixin from '@/mixins/YoutubeItemsMixin';
import AxiosClient from '@/api';

@Component
export default class ChannelItem extends Mixins(HTMLEntitiesMixin, YoutubeItemsMixin) {
  @Prop({ required: true }) item!: YoutubeItem;

  axiosClient = AxiosClient.getInstance();

  PlaylistDetails: PlaylistDetails | undefined;

  totalResults = 0;

  async created() {
    if (this.item.id.playlistId && !this.PlaylistDetails)
      this.PlaylistDetails = await this.axiosClient.getPlaylistDetails(this.item.id.playlistId);
    if (this.PlaylistDetails) {
      if (this.PlaylistDetails.pageInfo)
        this.totalResults = Number(this.calculateStatisticsNumbers(String(this.PlaylistDetails.pageInfo.totalResults)));
    }
  }

  get thumbnail() {
    const thumbnails = this.item.snippet.thumbnails;

    if (window.screen.width / 3 >= thumbnails.high.width) return thumbnails.high;
    else if (window.screen.width / 3 >= thumbnails.medium.width) return thumbnails.medium;
    else return thumbnails.default;
  }

  get title(): string {
    return this.translateHTMLEntities(this.item.snippet.title);
  }

  // goToDetails(): void {
  //   if (this.item.id.channelId) this.$router.push({ path: '/details/', params: { videoId: this.PlaylistDetails.snippet.resourceId.videoId } });
  // }
}
</script>

<style scoped lang="scss">
.img-container {
  position: relative;
  width: fit-content;
  height: fit-content;

  .playlist-videos-count {
    position: absolute;
    top: 0rem;
    right: 0rem;
    bottom: 0rem;
    justify-content: center;
    text-align: center;
    color: white;
    background-color: rgba(35, 34, 35, 0.75);
    pointer-events: none;
    width: 45%;
    height: 98%;

    img {
      margin: 0% 45%;
      width: 10%;
      height: 10%;
    }
  }
}

.text-container {
  text-align: initial;
  overflow-y: hidden;
  align-items: stretch;

  .title {
    color: #111111;
    font-size: small;
    @media (min-width: 600px) {
      font-size: large;
    }
  }

  .channel-title {
    margin: 0.27rem 0;
    font-size: smaller;

    @media (min-width: 600px) {
      font-size: small;
    }
  }

  .description,
  .watch-full-playlist {
    font-size: small;
    @media (max-width: 599px) {
      display: none;
    }
  }
}
</style>
