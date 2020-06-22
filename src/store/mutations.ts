export default {
  setSearchResult: (state: { searchResult: any }, searchResult: any) => {
    state.searchResult = searchResult;
  },
  appendToSearchResult: (state: { searchResult: any }, items: []) => {
    (state.searchResult.items as any[]).push(...items);
  },
  toggleIsLoading: (state: { isLoading: boolean; }) => {
    state.isLoading = !state.isLoading;
  }
};
