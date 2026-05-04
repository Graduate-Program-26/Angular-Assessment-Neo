import { Component, computed, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs';
import { DeezerService } from '../../shared/services/deezer.service';
import { ArtistCard } from '../../shared/components/artist-card/artist-card';
import { AlbumCard } from '../../shared/components/album-card/album-card';

@Component({
  selector: 'app-search',
  imports: [ReactiveFormsModule, ArtistCard, AlbumCard],
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
    return (this.results()?.data ?? []).filter(result => {
      if (seenArtists.has(result.artist.id)) return false;
      seenArtists.add(result.artist.id);
      return true;
    }).map(result => result.artist);
  });

  uniqueAlbums = computed(() => {
    const seenAlbums = new Set<number>();
    return (this.results()?.data ?? []).filter(result => {
      if (seenAlbums.has(result.album.id)) return false;
      seenAlbums.add(result.album.id);
      return true;
    }).map(result => ({ ...result.album, artistName: result.artist.name }));
  });
}
