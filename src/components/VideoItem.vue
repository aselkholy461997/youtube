<template>
  <div class="d-flex">
    <div class="img-container mr-3">
      <img v-bind:src="imgSrc" alt="Video Image" />
    </div>
    <div class="text-container">
      <p class="bold" style="font-size: 2rem;">
        {{ item.snippet.title }}
      </p>
      <p class="mb-0">
        {{ item.snippet.description }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import YoutubeItem from '../models/YoutubeItem';

@Component
export default class VideoItem extends Vue {
  @Prop({ required: true }) item!: YoutubeItem;

  get imgSrc(): string {
    const thumbnails = this.item.snippet.thumbnails;

    if (window.screen.width / 3 >= thumbnails.high.width) return thumbnails.high.url;
    else if (window.screen.width / 3 >= thumbnails.medium.width) return thumbnails.medium.url;
    else return thumbnails.default.url;
  }
}
</script>

<style scoped lang="scss">
// .img-container {
  // position: relative;
  // text-align: center;
  // color: white;

  // .duration {
  //   position: absolute;
  //   bottom: 8px;
  //   right: 16px;
  // }
// }

// .text-container {
// }
</style>
