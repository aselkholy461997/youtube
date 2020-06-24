import YoutubeItem from './YoutubeItem';
import Thumbnails from './Thumbnails';

export default class ChannelDetails extends YoutubeItem {
  items!: {
    kind: string;
    etag: string;
    id: string;
    snippet?: {
      title: string;
      description: string;
      publishedAt: string;
      thumbnails: Thumbnails;
    };
    localized: {
      title: string;
      description: string;
    };
    contentDetails?: {
      relatedPlaylists: {
        likes: string;
        favorites: string;
        uploads: string;
        watchHistory: string;
        watchLater: string;
      }
    };
    statistics?: {
      viewCount: string;
      commentCount: string;
      subscriberCount: string;
      favoriteCount: string;
      hiddenSubscriberCount: boolean;
      videoCount: string;
    };
  }[];
  pageInfo!: {
    totalResults: number;
    resultsPerPage: number;
  };
}
