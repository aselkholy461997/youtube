export default {
  populateSearchResult: ({ commit }: any, payload: any) => {
    commit('setSearchResult', payload);
  },
  addToSearchResult: ({ commit }: any, payload: any) => {
    commit('appendToSearchResult', payload);
  },
  populateNextPageToken: ({ commit }: any, payload: any) => {
    commit('setNextPageToken', payload);
  }
};
