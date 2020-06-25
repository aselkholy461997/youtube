import YoutubeItem from './YoutubeItem';
import Thumbnails from './Thumbnails';

export default class VideoDetails extends YoutubeItem {
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
      tags: string[];
      categoryId: string;
      liveBroadcastContent: string;
      localized: {
        title: string;
        description: string;
      };
      defaultAudioLanguage: string;
    };
    contentDetails?: {
      duration: string;
      dimension: string;
      definition: string;
      caption: string;
      licensedContent: boolean;
      contentRating: any;
      projection: string;
    };
    statistics?: {
      viewCount: string;
      likeCount: string;
      dislikeCount: string;
      favoriteCount: string;
      commentCount: string;
    };
  }[];

  pageInfo!: {
    totalResults: number;
    resultsPerPage: number;
  };
}
