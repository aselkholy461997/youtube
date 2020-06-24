<template>
  <div class="d-flex">
    <div class="img-container cursor-pointer mr-3">
      <img :src="thumbnail.url" @click="goToChannels" alt="Channel Image" />
    </div>
    <div class="text-container col" :style="{ 'max-height': thumbnail.height + 'px' }">
      <p class="title cursor-pointer my-0" @click="goToChannels">
        {{ title }}
      </p>
      <div class="info-row" :class="{ row: windowWidth >= 600 }">
        <p class="separator cursor-pointer my-0">{{ item.snippet.channelTitle }}</p>
        <p class="publishedAt separator my-0">{{ subscriberCount }}</p>
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
import YoutubeItem from '@/models/YoutubeItem';
import ChannelDetails from '@/models/ChannelDetails';
import HTMLEntitiesMixin from '@/mixins/HTMLEntitiesMixin';
import YoutubeItemsMixin from '@/mixins/YoutubeItemsMixin';
import AxiosClient from '@/api';

@Component
export default class ChannelItem extends Mixins(HTMLEntitiesMixin, YoutubeItemsMixin) {
  @Prop({ required: true }) item!: YoutubeItem;

  axiosClient = AxiosClient.getInstance();

  channelDetails: ChannelDetails | undefined;

  subscriberCount = '';
  videoCount = '';
  windowWidth = 0;

  async created() {
    if (this.item.id.channelId && !this.channelDetails) {
      this.channelDetails = await this.axiosClient.getChannelDetails(this.item.id.channelId);
      if (this.channelDetails) {
        if (this.channelDetails.items[0].statistics) {
          this.subscriberCount = this.calculateStatisticsNumbers(
            this.channelDetails.items[0].statistics.subscriberCount
          );
          this.videoCount = this.calculateStatisticsNumbers(this.channelDetails.items[0].statistics.videoCount);
        }
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

  goToChannel(): void {
    if (this.item.id.channelId) this.$router.push({ path: '/channels/', params: { channelId: this.item.id.channelId } });
  }
}
</script>

<style scoped lang="scss">
.img-container {
  width: fit-content;
  height: fit-content;
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

  .description {
    font-size: medium;
    color: #9f9f9f;
    @media (max-width: 599px) {
      display: none;
    }
  }
}
</style>
