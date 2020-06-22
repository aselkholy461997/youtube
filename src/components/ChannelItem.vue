<template>
  <div class="channel-item">
    <img @click="goToChannels" :src="imgSRC" />
    <h3 class="title" @click="goToChannels">
      {{ title }}
    </h3>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import YoutubeItem from '../models/YoutubeItem';

@Component
export default class ChannelItem extends Vue {
  @Prop({ required: true, type: YoutubeItem }) item!: YoutubeItem;

  get imgSRC(): string {
    const thumbnails = this.item.snippet.thumbnails;
    if (window.screen.width / 3 >= thumbnails.high.width) return thumbnails.high.url;
    else if (window.screen.width / 3 >= thumbnails.medium.width) return thumbnails.medium.url;
    else return thumbnails.default.url;
  }

  channelId = String(this.item.id.channelId);
  title = this.item.snippet.title;

  public goToSearch(): void {
    // with query, resulting in /register?plan=private
    this.$router.push({ path: '/channels', params: { channelId: this.channelId } });
  }
}
</script>

<style scoped lang="scss">
img {
  border-radius: 50%;
}
</style>
