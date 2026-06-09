import { Component, computed, inject, input } from '@angular/core';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { filter, switchMap } from 'rxjs';
import { DeezerService } from '../../shared/services/deezer.service';
import { AlbumCard } from '../../shared/components/album-card/album-card';
import { TrackItem } from '../../shared/components/track/track';
import { Spinner } from '../../shared/components/spinner/spinner';
import { TrackSkeleton } from '../../shared/components/track-skeleton/track-skeleton';
import { AlbumCardSkeleton } from '../../shared/components/album-card-skeleton/album-card-skeleton';

@Component({
  selector: 'app-artist',
  imports: [AlbumCard, TrackItem, Spinner, TrackSkeleton, AlbumCardSkeleton],
  templateUrl: './artist.html',
  styleUrl: './artist.css',
})
export class Artist {
  private deezerService = inject(DeezerService);

  id = input.required<string>();

  private id$ = toObservable(this.id).pipe(filter((id) => !!id && !isNaN(Number(id))));

  artist = toSignal(this.id$.pipe(switchMap((id) => this.deezerService.getArtist(Number(id)))));

  topTracks = toSignal(
    this.id$.pipe(switchMap((id) => this.deezerService.getArtistTopTracks(Number(id)))),
  );

  albums = toSignal(
    this.id$.pipe(switchMap((id) => this.deezerService.getArtistAlbums(Number(id)))),
  );

  formattedFans = computed(() => {
    const fans = this.artist()?.nb_fan ?? 0;
    if (fans >= 1_000_000) return `${(fans / 1_000_000).toFixed(1)}M`;
    if (fans >= 1_000) return `${(fans / 1_000).toFixed(0)}K`;
    return fans.toString();
  });

  protected readonly trackSkeletons = Array.from({ length: 10 });
  protected readonly albumSkeletons = Array.from({ length: 10 });
}
