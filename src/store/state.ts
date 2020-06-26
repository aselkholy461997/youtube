import SearchResult from '@/models/SearchResult';
import YoutubeItem from '@/models/YoutubeItem';
import VideoDetails from '@/models/VideoDetails';
import ChannelDetails from '@/models/ChannelDetails';
import PlaylistDetails from '@/models/PlaylistDetails';

export default {
  searchResult: new SearchResult(),
  filters: { type: '', order: '', uploadDate: '' },
  isLoading: false,
  selectedItem: new YoutubeItem(),
  selectedVideo: new VideoDetails(),
  selectedChanel: new ChannelDetails(),
  selectedPlaylist: new PlaylistDetails()
};
