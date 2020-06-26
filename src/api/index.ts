import { Mixins } from 'vue-property-decorator';

import axios from 'axios';

import store from '@/store';
import DateTimeMixin from '@/mixins/DateTimeMixin';

export default class AxiosClient extends Mixins(DateTimeMixin) {
  private static axiosClient: AxiosClient;

  private baseApiURL = 'https://www.googleapis.com/youtube/v3/';

  private apiKey = '';

  private maxResults = 4;

  private constructor() {
    super();
  }

  public static getInstance(): AxiosClient {
    if (!this.axiosClient) this.axiosClient = new AxiosClient();
    return this.axiosClient;
  }

  public getSearchResults(
    query: string,
    filters?: { type: string; order: string; uploadDate: string },
    nextPageToken?: string
  ) {
    store.commit('toggleIsLoading');
    let url = `${this.baseApiURL}search?part=snippet&maxResults=${this.maxResults}&q=${query}&key=${this.apiKey}`;
    if (filters) {
      url += filters.type ? `&type=${filters.type}` : '';
      url += filters.order ? `&order=${filters.order}` : '';
      url += filters.uploadDate ? `&publishedAfter=${this.calculateUploadDate(filters.uploadDate)}` : '';
    }
    if (nextPageToken) url += `&pageToken=${nextPageToken}`;
    return axios.get(url).then((response) => {
      // if (response.status === 400) this.getSearchResults(query, undefined, nextPageToken);
      // else {
      if (nextPageToken) {
        store.dispatch('addToSearchResult', response.data.items);
        store.dispatch('populateNextPageToken', response.data.nextPageToken);
      } else store.dispatch('populateSearchResult', response.data);
      // }
      store.commit('toggleIsLoading');
    });
  }

  public async getVideoDetails(videoId: string) {
    const url = `${this.baseApiURL}videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${this.apiKey}`;
    const response = await axios.get(url);
    return response.data;
  }

  public async getChannelDetails(channelId: string) {
    const url = `${this.baseApiURL}channels?part=snippet&part=statistics&id=${channelId}&key=${this.apiKey}`;
    const response = await axios.get(url);
    return response.data;
  }

  public async getPlaylistDetails(playlistId: string) {
    const url = `${this.baseApiURL}playlistItems?part=snippet&playlistId=${playlistId}&key=${this.apiKey}`;
    const response = await axios.get(url);
    return response.data;
  }

  public async getRelatedVideos(videoId: string) {
    const url = `${this.baseApiURL}search?part=snippet&relatedToVideoId=${videoId}&type=video&maxResults=${this.maxResults}&key=${this.apiKey}`;
    const response = await axios.get(url);
    return response.data;
  }
}
