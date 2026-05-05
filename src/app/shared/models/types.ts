export interface Artist {
  id: number;
  name: string;
  picture_small: string;
  picture_medium: string;
  picture_big: string;
  picture_xl: string;
  nb_album: number;
  nb_fan: number;
}

export interface Album {
  id: number;
  title: string;
  cover_small: string;
  cover_medium: string;
  cover_big: string;
  cover_xl: string
  label: string;
  nb_tracks: number;
  duration: number;
  release_date: Date;
  record_type: string;
  tracks: Track[];
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
  creator: {
    name: string;
  };
  tracks: Track[];
}

export interface Track {
  id: number;
  title: string;
  duration: number;
  release_date: Date;
  preview: string;
  track_postion: number;
  explicit_lyrics: boolean;
  md5_image: string;
}

export interface SearchResult {
  id: number;
  title: string;
  duration: number;
  preview: string;
  artist: Pick<Artist, 'id' | 'name' | 'picture_small'|  'picture_medium' | 'picture_big' | 'picture_xl'>;
  album: Pick<Album, 'id' | 'title' | 'cover_small' | 'cover_medium' | 'cover_big' | 'cover_xl'>;
}

export interface SearchResponse {
  data: SearchResult[];
  total: number;
  next?: string;
}
