<template>
  <div class="d-flex">
    <div class="img-container cursor-pointer mr-3">
      <img v-bind:src="imgSrc" alt="Video Image" />
      <div class="duration">{{ duration }}</div>
    </div>
    <div class="text-container">
      <p class="title cursor-pointer my-0">
        {{ title }}
      </p>
      <div class="row info-row my-2">
        <p class="separator cursor-pointer my-0">{{ item.snippet.channelTitle }}</p>
        <p class="separator my-0">{{ views }}</p>
        <p class="my-0">{{ publishedAt }}</p>
      </div>
      <p class="description my-0">
        {{ item.snippet.description }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Mixins, Watch } from 'vue-property-decorator';
import YoutubeItem from '../models/YoutubeItem';
import VideoDetails from '../models/VideoDetails';
import HTMLEntitiesMixin from '@/mixins/HTMLEntitiesMixin';
import DateTimeMixin from '../mixins/DateTimeMixin';
import VideoInfoMixin from '../mixins/VideoInfoMixin';
import AxiosClient from '../api';

@Component
export default class VideoItem extends Mixins(HTMLEntitiesMixin, DateTimeMixin, VideoInfoMixin) {
  @Prop({ required: true }) item!: YoutubeItem;
  private axiosClient = AxiosClient.getInstance();
  private videoDetails: VideoDetails | undefined;
  private views = '';
  private duration = '';

  async created() {
    if (this.item.id.videoId && !this.videoDetails) {
      this.videoDetails = await this.axiosClient.getVideoDetails(this.item.id.videoId);
      if (this.videoDetails) {
        if (this.videoDetails.items[0].statistics)
          this.views = this.calculateViews(this.videoDetails.items[0].statistics.viewCount);
        if (this.videoDetails.items[0].contentDetails)
          this.duration = this.calculateDuration(this.videoDetails.items[0].contentDetails.duration);
      }
    }
  }

  get imgSrc(): string {
    const thumbnails = this.item.snippet.thumbnails;

    if (window.screen.width / 3 >= thumbnails.high.width) return thumbnails.high.url;
    else if (window.screen.width / 3 >= thumbnails.medium.width) return thumbnails.medium.url;
    else return thumbnails.default.url;
  }

  get title(): string {
    return this.translateHTMLEntities(this.item.snippet.title);
  }

  get publishedAt(): string {
    return this.calculatePublishedAtDate(this.item.snippet.publishedAt);
  }

  // get duration(): string {
  //   if(this.videoDetails)
  //   return this.videoDetails.items[0].contentDetails
  // }
}
</script>

<style scoped lang="scss">
.img-container {
  position: relative;

  .duration {
    position: absolute;
    right: 12px;
    bottom: 10px;
    text-align: center;
    color: white;
    background-color: rgba(35, 34, 35, 0.75);
    padding: 0.1rem 0.2rem 0;
    pointer-events: none;
  }
}

.text-container {
  text-align: initial;
  overflow-y: auto;

  .title {
    font-size: larger;
    color: #111111;
  }

  .info-row {
    .separator::after {
      content: '•';
      margin: 0 4px;
    }
  }

  .description {
    font-size: medium;
    color: #9f9f9f;
  }
}
</style>
