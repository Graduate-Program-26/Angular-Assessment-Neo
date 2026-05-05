export interface Artist {
  id: number;
  name: string;
  picture_small: string;
  picture_medium: string;
  picture_big: string;
  picture_xl: string;
  nb_album: number;
  nb_fan: number;
  tracklist: string;
}

export interface Album {
  id: number;
  title: string;
  cover_small: string;
  cover_medium: string;
  cover_big: string;
  cover_xl: string;
  release_date: string;
  record_type: string;
  label?: string;
  nb_tracks?: number;
  duration?: number;
  tracks?: { data: Track[] };
}

export interface Track {
  id: number;
  title: string;
  duration: number;
  preview: string;
  explicit_lyrics: boolean;
  md5_image: string;
  release_date?: string;
  track_position?: number;
  rank?: number;
}

export interface TopTrack {
  id: number;
  title: string;
  duration: number;
  rank: number;
  explicit_lyrics: boolean;
  preview: string;
  md5_image: string;
  album: Pick<Album, 'id' | 'title' | 'cover_medium'>;
}

export interface TopTracksResponse {
  data: TopTrack[];
}

export interface ArtistAlbumsResponse {
  data: Pick<Album, 'id' | 'title' | 'cover_small' | 'cover_medium' | 'cover_big' | 'cover_xl' | 'release_date' | 'record_type'>[];
  total: number;
}

export interface Playlist {
  id: number;
  title: string;
  description: string;
  fans: number;
  picture_small: string;
  picture_medium: string;
  picture_big: string;
  picture_xl: string;
  creator: { name: string };
  tracks: Track[];
}

export interface SearchResult {
  id: number;
  title: string;
  duration: number;
  preview: string;
  artist: Pick<Artist, 'id' | 'name' | 'picture_small' | 'picture_medium' | 'picture_big' | 'picture_xl'>;
  album: Pick<Album, 'id' | 'title' | 'cover_small' | 'cover_medium' | 'cover_big' | 'cover_xl'>;
}

export interface SearchResponse {
  data: SearchResult[];
  total: number;
  next?: string;
}
