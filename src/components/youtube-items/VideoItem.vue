<template>
  <div class="d-flex">
    <div class="img-container cursor-pointer mr-3">
      <img v-bind:src="thumbnail.url" alt="Video Image" />
      <div class="duration">{{ duration }}</div>
    </div>
    <div class="text-container col" :style="{ 'max-height': thumbnail.height + 'px' }">
      <p class="title cursor-pointer my-0">
        {{ title }}
      </p>
      <div class="info-row" :class="{ row: windowWidth >= 600 }">
        <p class="separator cursor-pointer my-0">
          {{ item.snippet.channelTitle }}
        </p>
        <p class="publishedAt separator my-0">{{ views }}</p>
        <p class="my-0">{{ publishedAt }}</p>
      </div>
      <p class="description my-0">
        {{ item.snippet.description }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Mixins } from 'vue-property-decorator';
import YoutubeItem from '../../models/YoutubeItem';
import VideoDetails from '../../models/VideoDetails';
import HTMLEntitiesMixin from '@/mixins/HTMLEntitiesMixin';
import DateTimeMixin from '../../mixins/DateTimeMixin';
import VideoInfoMixin from '../../mixins/VideoInfoMixin';
import AxiosClient from '../../api';

@Component
export default class VideoItem extends Mixins(HTMLEntitiesMixin, DateTimeMixin, VideoInfoMixin) {
  @Prop({ required: true }) item!: YoutubeItem;
  private axiosClient = AxiosClient.getInstance();
  private videoDetails: VideoDetails | undefined;
  views = '';
  duration = '';
  windowWidth = 0;

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

  mounted() {
    this.windowWidth = window.innerWidth;
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth;
    });
  }

  beforeDestroy() {
    window.removeEventListener('resize', () => {
      this.windowWidth = window.innerWidth;
    });
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

  get publishedAt(): string {
    return this.calculatePublishedAtDate(this.item.snippet.publishedAt);
  }
}
</script>

<style scoped lang="scss">
.img-container {
  position: relative;
  width: fit-content;
  height: fit-content;

  .duration {
    position: absolute;
    right: 0.6rem;
    bottom: 0.6rem;
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
  align-items: stretch;

  .title {
    color: #111111;
    @media (min-width: 600px) {
      font-size: larger;
    }
  }

  .info-row {
    margin: 0.25rem 0 0;
    color: #9f9f9f;

    @media (min-width: 600px) {
      margin: 0.5rem 0;

      .separator::after {
        content: '•';
        margin: 0 4px;
      }
    }
  }

  .publishedAt {
    display: none;
    @media (min-width: 600px) {
      display: block;
    }
  }
  .description {
    font-size: medium;
    color: #9f9f9f;
    @media (max-width: 599px) {
      display: none;
    }
  }
}
</style>
