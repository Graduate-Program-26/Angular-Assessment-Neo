import { Component, inject, input } from '@angular/core';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { filter, switchMap } from 'rxjs';
import { TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DeezerService } from '../../shared/services/deezer.service';
import { DurationPipe } from '../../shared/pipes/duration.pipe';

@Component({
  selector: 'app-album',
  imports: [DurationPipe, RouterLink, TitleCasePipe],
  templateUrl: './album.html',
  styleUrl: './album.css',
})
export class Album {
  private deezerService = inject(DeezerService);

  id = input.required<string>();

  private id$ = toObservable(this.id).pipe(
    filter(id => !!id && !isNaN(Number(id)))
  );

  album = toSignal(
    this.id$.pipe(switchMap(id => this.deezerService.getAlbum(Number(id))))
  );
}