import { Component, inject, input } from '@angular/core';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { DeezerService } from '../../shared/services/deezer.service';

@Component({
  selector: 'app-album',
  imports: [],
  templateUrl: './album.html',
  styleUrl: './album.css',
})
export class Album {
  private deezerService = inject(DeezerService);

  id = input.required<string>();
  album = toSignal(
    toObservable(this.id).pipe(
      switchMap(id => this.deezerService.getAlbum(Number(id)))
    )
  );
 
}
