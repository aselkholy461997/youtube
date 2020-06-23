import Thumbnails from './Thumbnails';

export default class YoutubeItem {
  kind!: string;
  etag!: string;
  id!: {
    kind: string;
    videoId?: string;
    channelId?: string;
    playlistId?: string;
  };
  snippet!: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: Thumbnails
  };
  channelTitle!: string;
  liveBroadcastContent!: string;
  publishTime!: string;
}
