import { Component, computed, inject, input } from '@angular/core';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { filter, switchMap } from 'rxjs';
import { TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DeezerService } from '../../shared/services/deezer.service';
import { TrackItem } from '../../shared/components/track/track';

@Component({
  selector: 'app-album',
  imports: [RouterLink, TitleCasePipe, TrackItem],
  templateUrl: './album.html',
  styleUrl: './album.css',
})
export class Album {
  private deezerService = inject(DeezerService);

  id = input.required<string>();

  private id$ = toObservable(this.id).pipe(filter((id) => !!id && !isNaN(Number(id))));

  album = toSignal(this.id$.pipe(switchMap((id) => this.deezerService.getAlbum(Number(id)))));

  totalDuration = computed(() => {
    const tracks = this.album()?.tracks?.data ?? [];
    const totalTime = tracks.reduce((sum, t) => sum + t.duration, 0);
    const hour = Math.floor(totalTime / 3600);
    const minute = Math.floor((totalTime % 3600) / 60);
    const second = totalTime % 60;
    if (hour > 0) return `${hour} hr ${minute} min`;
    if (minute > 0) return `${minute} min ${second} sec`;
    return `${second} sec`;
  });

  releaseYear = computed(() => {
    const date = this.album()?.release_date;
    return date ? new Date(date).getFullYear() : null;
  });
}
