import { Component, computed, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs';
import { DeezerService } from '../../shared/services/deezer.service';
import { ArtistCard } from '../../shared/components/artist-card/artist-card';
import { AlbumCard } from '../../shared/components/album-card/album-card';
import { TrackItem } from '../../shared/components/track/track';
import { TrackSkeleton } from '../../shared/components/track-skeleton/track-skeleton';
import { ArtistCardSkeleton } from '../../shared/components/artist-card-skeleton/artist-card-skeleton';
import { AlbumCardSkeleton } from '../../shared/components/album-card-skeleton/album-card-skeleton';

@Component({
  selector: 'app-search',
  imports: [ReactiveFormsModule, ArtistCard, AlbumCard, TrackItem, TrackSkeleton, ArtistCardSkeleton, AlbumCardSkeleton],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {
  private deezerService = inject(DeezerService);

  query = new FormControl<string>('', { nonNullable: true });

  results = toSignal(
    this.query.valueChanges.pipe(
      debounceTime(450),
      distinctUntilChanged(),
      filter((query) => query.trim().length > 0),
      switchMap((query) => this.deezerService.search(query)),
    ),
  );

  uniqueArtists = computed(() => {
    const seenArtists = new Set<number>();
    return (this.results()?.data ?? [])
      .filter((result) => {
        if (seenArtists.has(result.artist.id)) return false;
        seenArtists.add(result.artist.id);
        return true;
      })
      .map((result) => result.artist);
  });

  uniqueAlbums = computed(() => {
    const seenAlbums = new Set<number>();
    return (this.results()?.data ?? [])
      .filter((result) => {
        if (seenAlbums.has(result.album.id)) return false;
        seenAlbums.add(result.album.id);
        return true;
      })
      .map((result) => ({ ...result.album, artistName: result.artist.name }));
  });

  uniqueTracks = computed(() => {
    const seen = new Set<number>();
    return (this.results()?.data ?? []).filter((result) => {
      if (seen.has(result.id)) return false;
      seen.add(result.id);
      return true;
    });
  });

  protected readonly artistSkeletons = Array.from({ length: 6 });
  protected readonly albumSkeletons = Array.from({ length: 5 });
  protected readonly trackSkeletons = Array.from({ length: 5 });
}
