<template>
  <div id="details-view">
    <div class="video-container mx-auto" :style="{ 'max-width': windowWidth >= 600 ? iframeWidth + 'px' : '' }">
      <!-- Video Div -->
      <div class="top-div">
        <iframe
          :width="iframeWidth"
          :height="iframeHeight"
          :src="iframeSrc"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
        <div class="row mt-2 bold" style="font-size: larger; padding: 0 5px;">
          {{ title }}
        </div>
        <div id="big-info-row" class="mt-2 row info-row align-items-center" style="padding: 0 5px;">
          <div class="left-info row">
            <span class="text-grey">{{ views }} Views</span>
          </div>
          <div class="right-info row">
            <div id="likes-col" class="col">
              <div id="likes-btn-row" class="row">
                <!-- Likes -->
                <div class="item-row">
                  <svg
                    viewBox="0 0 24 24"
                    preserveAspectRatio="xMidYMid meet"
                    focusable="false"
                    class="style-scope yt-icon mr-1"
                    style="pointer-events: none; display: block; width: 24px; height: 24px; fill: grey;"
                  >
                    <g class="style-scope yt-icon">
                      <path
                        d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z"
                        class="style-scope yt-icon"
                      ></path>
                    </g>
                  </svg>
                  <div class="text-grey">{{ likeCount }}</div>
                </div>
                <!-- Dislikes -->
                <div class="item-row">
                  <svg
                    viewBox="0 0 24 24"
                    preserveAspectRatio="xMidYMid meet"
                    focusable="false"
                    class="style-scope yt-icon  mr-1"
                    style="pointer-events: none; display: block; width: 24px; height: 24px; fill: grey;"
                  >
                    <g class="style-scope yt-icon">
                      <path
                        d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v1.91l.01.01L1 14c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z"
                        class="style-scope yt-icon"
                      ></path>
                    </g>
                  </svg>
                  <div class="text-grey">{{ dislikeCount }}</div>
                </div>
              </div>
            </div>
            <!-- Share -->
            <div class="item-row">
              <svg
                viewBox="0 0 24 24"
                preserveAspectRatio="xMidYMid meet"
                focusable="false"
                class="style-scope yt-icon mr-1"
                style="pointer-events: none; display: block; width: 24px; height: 24px; fill: grey;"
              >
                <g class="style-scope yt-icon">
                  <path
                    d="M11.7333 8.26667V4L19.2 11.4667L11.7333 18.9333V14.56C6.4 14.56 2.66667 16.2667 0 20C1.06667 14.6667 4.26667 9.33333 11.7333 8.26667Z"
                    class="style-scope yt-icon"
                  ></path>
                </g>
              </svg>
              <div class="text-grey">Share</div>
            </div>
            <!-- Save -->
            <div class="item-row">
              <svg
                viewBox="0 0 24 24"
                preserveAspectRatio="xMidYMid meet"
                focusable="false"
                class="style-scope yt-icon mr-1"
                style="pointer-events: none; display: block; width: 24px; height: 24px; fill: grey;"
              >
                <g class="style-scope yt-icon">
                  <path
                    d="M14 10H2v2h12v-2zm0-4H2v2h12V6zm4 8v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM2 16h8v-2H2v2z"
                    class="style-scope yt-icon"
                  ></path>
                </g>
              </svg>
              <div class="text-grey">Save</div>
            </div>
            <!-- Save -->
            <div class="item-row mr-0">
              <svg
                viewBox="0 0 24 24"
                preserveAspectRatio="xMidYMid meet"
                focusable="false"
                class="style-scope yt-icon"
                style="pointer-events: none; display: block; width: 24px; height: 24px; fill: grey;"
              >
                <g class="style-scope yt-icon">
                  <circle cx="5" cy="12" r="2" class="style-scope yt-icon"></circle>
                  <circle cx="12" cy="12" r="2" class="style-scope yt-icon"></circle>
                  <circle cx="19" cy="12" r="2" class="style-scope yt-icon"></circle>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <!-- Channel Div -->
      <div id="channel-div" class="row">
        <div class="img-container mr-3">
          <img :src="channelImgSrc" alt="Channel Image" />
        </div>
        <div class="col">
          <p :class="['bold', 'mb-0', 'cursor-pointer', windowWidth < 600 ? 'mt-0' : '']" style="width: fit-content;">
            {{ channelTitle }}
          </p>
          <p class="text-grey mt-2 mb-0" style="width: fit-content;">Published on {{ date }}</p>
        </div>
      </div>
      <hr />
      <!-- Related Videos -->
      <div id="related-videos" v-if="relatedVideos">
        <div
          v-for="(item, index) in relatedVideos.items"
          :key="'relatedVideo' + index"
          :class="{ 'mb-4': index != relatedVideos.items.length - 1 }"
        >
          <VideoItem :item="item" />
        </div>
      </div>
      <div></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import AxiosClient from '@/api';
import store from '@/store';
import YoutubeItemsMixin from '@/mixins/YoutubeItemsMixin';
import VideoItem from '@/components/youtube-items/VideoItem.vue';
import VideoDetails from '../models/VideoDetails';
import PlaylistDetails from '../models/PlaylistDetails';
import YoutubeItem from '../models/YoutubeItem';
import ChannelDetails from '../models/ChannelDetails';
import SearchResult from '../models/SearchResult';

@Component({
  components: {
    VideoItem
  }
})
export default class Details extends Mixins(YoutubeItemsMixin) {
  axiosClient = AxiosClient.getInstance();
  windowWidth = 0;
  youtubeItem!: YoutubeItem;
  details!: VideoDetails | PlaylistDetails;
  relatedVideos = new SearchResult();

  isLiked = false;
  isDisliked = false;
  title = '';
  views = '';
  channelTitle = '';
  date = '';
  likeCount = '';
  dislikeCount = '';
  channelImgSrc = '';

  async mounted() {
    if (store.state.selectedItem.id) {
      this.youtubeItem = store.state.selectedItem;
      if (this.youtubeItem.id.videoId) this.details = store.state.selectedVideo;
      else if (this.youtubeItem.id.playlistId) this.details = store.state.selectedPlaylist;
    } else {
      this.details = await this.axiosClient.getVideoDetails(this.$route.params.id);

      if (this.details) {
        const details = this.details as VideoDetails;

        if (!details.items.length) {
          this.$router.replace({ path: '/404/' + this.$route.fullPath });
        }

        if (details.items[0].snippet) {
          this.title = details.items[0].snippet.title;
          this.channelTitle = details.items[0].snippet.channelTitle;
          this.date = this.calculateDate(String(details.items[0].snippet.publishedAt));

          const channelDetails = (await this.axiosClient.getChannelDetails(
            details.items[0].snippet.channelId
          )) as ChannelDetails;
          if (channelDetails.items[0].snippet)
            this.channelImgSrc = channelDetails.items[0].snippet.thumbnails.default.url;
        }

        if (details.items[0].statistics) {
          this.views = Number(details.items[0].statistics.viewCount).toLocaleString();
          this.likeCount = this.calculateStatisticsNumbers(String(details.items[0].statistics.likeCount));
          this.dislikeCount = this.calculateStatisticsNumbers(String(details.items[0].statistics.dislikeCount));
        }

        this.relatedVideos = await this.axiosClient.getRelatedVideos(this.$route.params.id);
      }
    }

    this.windowWidth = window.innerWidth;
    window.addEventListener('resize', this.onResize);
  }

  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  }

  onResize() {
    this.windowWidth = window.innerWidth;
  }

  get iframeWidth() {
    if (this.windowWidth >= 600) return this.windowWidth * 0.7 < 640 ? this.windowWidth * 0.7 : 640;
    else return this.windowWidth * 0.9;
  }

  get iframeHeight() {
    if (this.windowWidth >= 600) return this.windowWidth * 0.7 * 0.5625 < 360 ? this.windowWidth * 0.7 * 0.5625 : 360;
    // 0.5625 is the ratio between height to width
    else return this.windowWidth * 0.9 * 0.5625;
  }

  get iframeSrc() {
    return 'https://www.youtube.com/embed/' + this.$route.params.id;
  }
}
</script>

<style scoped lang="scss">
#details-view {
  width: calc(70% - 4px);
  height: 100%;

  .video-container {
    background-color: white;
    min-height: calc(100vh + 2rem);
    border: 1px solid grey;
    border-bottom: 0;
    padding: 2px 2px 0;

    @media (max-width: 599px) {
      width: calc(100vw - 2rem);
    }

    #big-info-row {
      @media (max-width: 599px) {
        justify-content: center;
      }
    }
    .info-row {
      justify-content: space-between;
      align-items: center;

      .left-info {
        max-width: 300px;
        justify-content: baseline;
        margin-bottom: 0.5rem;

        @media (min-width: 600px) {
          margin-bottom: 0;
        }
      }

      .right-info {
        max-width: 500px;
        justify-content: center;

        @media (min-width: 600px) {
          justify-content: flex-end;
        }

        #likes-col {
          @media (max-width: 599px) {
            width: 100%;
            margin-bottom: 0.5rem;
          }

          #likes-btn-row {
            justify-content: center;
          }
        }
      }

      .right-info,
      .left-info {
        align-items: center;
      }

      .item-row {
        display: flex;
        flex-direction: row;
        margin-right: 1.25rem;
        align-items: center;
        cursor: pointer;
      }
    }
  }

  #channel-div {
    justify-content: center;
    padding: 0 5px;

    @media (min-width: 600px) {
      justify-content: flex-start;
    }

    .img-container {
      width: fit-content;

      img {
        border-radius: 50%;
        width: auto;
        max-height: 5rem;
      }
    }
  }
}
</style>
