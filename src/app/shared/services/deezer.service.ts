import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {
  Album,
  Artist,
  ArtistAlbumsResponse,
  ChartResponse,
  Playlist,
  SearchResponse,
  TopTracksResponse,
} from '../models/types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeezerService {
  private http = inject(HttpClient);
  private BASE_URL = environment.apiUrl;

  getAlbum(id: number): Observable<Album> {
    return this.http.get<Album>(`${this.BASE_URL}/album/${id}`);
  }

  getArtist(id: number): Observable<Artist> {
    return this.http.get<Artist>(`${this.BASE_URL}/artist/${id}`);
  }

  getArtistTopTracks(id: number): Observable<TopTracksResponse> {
    return this.http.get<TopTracksResponse>(`${this.BASE_URL}/artist/${id}/top?limit=10`);
  }

  getArtistAlbums(id: number): Observable<ArtistAlbumsResponse> {
    return this.http.get<ArtistAlbumsResponse>(`${this.BASE_URL}/artist/${id}/albums`);
  }

  getPlaylist(id: number): Observable<Playlist> {
    return this.http.get<Playlist>(`${this.BASE_URL}/playlist/${id}`);
  }

  getChart(): Observable<ChartResponse> {
    return this.http.get<ChartResponse>(`${this.BASE_URL}/chart`);
  }

  search(query: string): Observable<SearchResponse> {
    return this.http.get<SearchResponse>(`${this.BASE_URL}/search?q=${query}`);
  }
}
