import YoutubeItem from './YoutubeItem';
import Thumbnails from './Thumbnails';

export default class PlaylistDetails extends YoutubeItem {
  items!: {
    kind: string;
    etag: string;
    id: string;
    snippet?: {
      publishedAt: string;
      channelId: string;
      title: string;
      description: string;
      thumbnails: Thumbnails;
      channelTitle: string;
      playlistId: string;
      liveBroadcastContent: string;
      publishTime: string;
      position: number;
      resourceId: {
        kind: string; 
        videoId: string;
      };
    };
  }[];
  pageInfo!: {
    totalResults: number;
    resultsPerPage: number;
  };
}
