import YoutubeItem from './YoutubeItem';

export default class SearchResult {
  kind!: string;
  etag!: string;
  nextPageToken: string | undefined;
  regionCode!: string;
  pageInfo!: { totalResults: string; resultsPerPage: string };
  items: YoutubeItem[] | undefined;
}
