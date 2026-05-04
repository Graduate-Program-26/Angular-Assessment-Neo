export interface Artist {
  id: number;
  name: string;
  picture: string;
  nb_album: number;
  nb_fan: number;
}

export interface Album {
  id: number;
  title: string;
  cover: string;
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
  picture: string;
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
  artist: Pick<Artist, 'id' | 'name' | 'picture'>;
  album: Pick<Album, 'id' | 'title' | 'cover'>;
}

export interface SearchResponse {
  data: SearchResult[];
  total: number;
  next?: string;
}
