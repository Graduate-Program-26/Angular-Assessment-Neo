import { Component, inject, input } from '@angular/core';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { DeezerService } from '../../shared/services/deezer.service';

@Component({
  selector: 'app-artist',
  imports: [],
  templateUrl: './artist.html',
  styleUrl: './artist.css',
})
export class Artist {
  private deezerService = inject(DeezerService);

  id = input.required<string>();
  artist = toSignal(
    toObservable(this.id).pipe(switchMap((id) => this.deezerService.getArtist(Number(id)))),
  );
}
