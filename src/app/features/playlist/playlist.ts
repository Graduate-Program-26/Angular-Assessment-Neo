import { Component, inject, input } from '@angular/core';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { DeezerService } from '../../shared/services/deezer.service';

@Component({
  selector: 'app-playlist',
  imports: [],
  templateUrl: './playlist.html',
  styleUrl: './playlist.css',
})
export class Playlist {
  private deezerService = inject(DeezerService);

  id = input.required<string>();
  playlist = toSignal(
    toObservable(this.id).pipe(switchMap((id) => this.deezerService.getPlaylist(Number(id)))),
  );
}
