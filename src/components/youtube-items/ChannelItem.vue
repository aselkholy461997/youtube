<template>
  <div class="d-flex cursor-pointer">
    <!-- @click="goToChannels"  -->
    <div class="img-container mr-3">
      <img :src="thumbnail.url" alt="Channel Image" />
    </div>
    <div class="text-container col" :style="{ 'max-height': thumbnail.height + 'px' }">
      <p class="title my-0">
        {{ title }}
      </p>
      <div class="info-row color-777 d-flex">
        <p class="separator my-0">{{ subscriberCount }} subscribers</p>
        <p class="my-0">{{ videoCount }} videos</p>
      </div>
      <p class="description color-777 my-0">
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

  get thumbnail() {
    const thumbnails = this.item.snippet.thumbnails;

    if (window.screen.width / 3 >= thumbnails.high.width) return thumbnails.high;
    else if (window.screen.width / 3 >= thumbnails.medium.width) return thumbnails.medium;
    else return thumbnails.default;
  }

  get title(): string {
    return this.translateHTMLEntities(this.item.snippet.title);
  }

  // goToChannel(): void {
  //   if (this.item.id.channelId) this.$router.push({ path: '/channels/', params: { channelId: this.item.id.channelId } });
  // }
}
</script>

<style scoped lang="scss">
.img-container {
  width: 320px;
  height: 180px;
  @media (max-width: 599px) {
    width: 120px;
    height: 90px;
  }

  img {
    border-radius: 50%;
    width: auto;
    height: 180px;
    @media (max-width: 599px) {
      width: auto;
      height: 90px;
    }
  }
}

.text-container {
  text-align: initial;
  overflow-y: hidden;
  align-items: stretch;
  justify-content: center;

  .title {
    color: #111111;
    font-size: small;
    @media (min-width: 600px) {
      font-size: large;
    }
  }

  .info-row {
    margin: 0.25rem 0 0;
    color: #9f9f9f;
    font-size: smaller;
    flex-direction: column-reverse;

    @media (min-width: 600px) {
      flex-direction: row;
      margin: 0.5rem 0;
      font-size: small;
    }
  }

  .description {
    font-size: small;
    color: #9f9f9f;
    @media (max-width: 599px) {
      display: none;
    }
  }
}
</style>
