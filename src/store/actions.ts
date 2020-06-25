export default {
  addToSearchResult: ({ commit }: any, payload: any) => {
    commit('appendToSearchResult', payload);
  },
  populateSearchResult: ({ commit }: any, payload: any) => {
    commit('setSearchResult', payload);
  },
  populateNextPageToken: ({ commit }: any, payload: any) => {
    commit('setNextPageToken', payload);
  },
  populateFilters: ({ commit }: any, payload: any) => {
    commit('setFilters', payload);
  }
};
