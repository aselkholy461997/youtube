import SearchResult from '@/models/SearchResult';

export default {
  setSearchResult: (state: { searchResult: SearchResult }, searchResult: SearchResult) => {
    state.searchResult = searchResult;
  },
  appendToSearchResult: (state: { searchResult: SearchResult }, items: []) => {
    (state.searchResult as any).items.push(...items);
  },
  toggleIsLoading: (state: { isLoading: boolean }) => {
    state.isLoading = !state.isLoading;
  }
};
