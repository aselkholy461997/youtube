import SearchResult from '@/models/SearchResult';

export default {
  searchResult: new SearchResult(),
  filters: { type: '', order: '', uploadDate: '' },
  isLoading: false
};
