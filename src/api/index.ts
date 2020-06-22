import axios from 'axios';

import store from '@/store';

// https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=over and over again&key=

export default class AxiosClient {
  private static axiosClient: AxiosClient;

  private baseApiURL = 'https://www.googleapis.com/youtube/v3/';
  private apiKey = 'AIzaSyA6y_OuMGhA9fGJIpirKMJx3IclpMogiU0';

  private maxResults = 25;

  private constructor() {}

  public static getInstance(): AxiosClient {
    if (!this.axiosClient) this.axiosClient = new AxiosClient();
    return this.axiosClient;
  }

  public getSearchResults(query: string, filters?: { type: string; order: string; uploadDate: string }) {
    store.commit('toggleIsLoading');
    let url = `${this.baseApiURL}search?part=snippet&maxResults=${this.maxResults}&q=${query}&key=${this.apiKey}`;
    if (filters) {
      url += filters.type ? `&type=${filters.type}` : '';
      url += filters.order ? `&order=${filters.order}` : '';
      url += filters.uploadDate ? `&publishedAfter=${this.calculateUploadDate(filters.uploadDate)}` : '';
    }
    return axios.get(url).then((response) => {
      store.dispatch('populateSearchResult', response.data);
      store.commit('toggleIsLoading');
    });
  }

  private calculateUploadDate(uploadDate: string) {
    const youtubeDateFormat = new Date(Date.now());
    if (uploadDate === 'Last hour') youtubeDateFormat.setMinutes(0, 0, 0);
    else if (uploadDate === 'Today') youtubeDateFormat.setHours(0, 0, 0, 0);
    else if (uploadDate === 'This month') {
      youtubeDateFormat.setMonth(youtubeDateFormat.getMonth(), 1);
      youtubeDateFormat.setHours(0, 0, 0, 0);
    } else {
      const firstDay = youtubeDateFormat.getDate() - youtubeDateFormat.getDay();
      youtubeDateFormat.setDate(firstDay);
      youtubeDateFormat.setHours(0, 0, 0, 0);
    }
    return youtubeDateFormat.toISOString();
  }
}
