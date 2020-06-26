export default {
  populateSearchResult: ({ commit }: any, payload: any) => {
    commit('setSearchResult', payload);
  },
  populateFilters: ({ commit }: any, payload: any) => {
    commit('setFilters', payload);
  },
  populateNextPageToken: ({ commit }: any, payload: any) => {
    commit('setNextPageToken', payload);
  },
  populateSelectedItem: ({ commit }: any, payload: any) => {
    commit('setSelectedVideo', payload);
  },
  populateSelectedVideo: ({ commit }: any, payload: any) => {
    commit('setSelectedItem', payload);
  },
  addToSearchResult: ({ commit }: any, payload: any) => {
    commit('appendToSearchResult', payload);
  }
};
