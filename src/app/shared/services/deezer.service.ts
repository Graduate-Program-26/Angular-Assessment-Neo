import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Album} from '../models/types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeezerService {
  private http = inject(HttpClient);
  private BASE_URL = 'https://corsproxy.io/?https://api.deezer.com';

  getAlbum(id:number): Observable<Album> {
    return this.http.get<Album>(`${this.BASE_URL}/album/${id}`);
  }
}
