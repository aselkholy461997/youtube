import SearchResult from '@/models/SearchResult';
import YoutubeItem from '@/models/YoutubeItem';
import VideoDetails from '@/models/VideoDetails';

export default {
  setSearchResult: (state: { searchResult: SearchResult }, searchResult: SearchResult) => {
    state.searchResult = searchResult;
  },
  appendToSearchResult: (state: { searchResult: SearchResult }, items: []) => {
    (state.searchResult as any).items.push(...items);
  },
  toggleIsLoading: (state: { isLoading: boolean }) => {
    state.isLoading = !state.isLoading;
  },
  setIsLoading: (state: { isLoading: boolean }, value: boolean) => {
    state.isLoading = value;
  },
  setFilters: (state: { filters: { type: string; order: string; uploadDate: string } }, value: { type: string; order: string; uploadDate: string }) => {
    state.filters = value;
  },
  setNextPageToken: (state: { searchResult: SearchResult }, value: string) => {
    state.searchResult.nextPageToken = value;
  },
  setSelectedItem: (state: { selectedItem: YoutubeItem }, value: YoutubeItem) => {
    state.selectedItem = value;
  },
  setSelectedVideo: (state: { selectedVideo: VideoDetails }, value: VideoDetails) => {
    state.selectedVideo = value;
  }
};
