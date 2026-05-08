import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { DeezerService } from '../../shared/services/deezer.service';
import { ArtistCard } from '../../shared/components/artist-card/artist-card';
import { AlbumCard } from '../../shared/components/album-card/album-card';
import { TrackItem } from '../../shared/components/track/track';
import { ArtistCardSkeleton } from '../../shared/components/artist-card-skeleton/artist-card-skeleton';
import { AlbumCardSkeleton } from '../../shared/components/album-card-skeleton/album-card-skeleton';
import { TrackSkeleton } from '../../shared/components/track-skeleton/track-skeleton';

@Component({
  selector: 'app-home',
  imports: [ArtistCard, AlbumCard, TrackItem, ArtistCardSkeleton, AlbumCardSkeleton, TrackSkeleton],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private deezerService = inject(DeezerService);

  chart = toSignal(this.deezerService.getChart());

  greeting = computed(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  });

  protected readonly artistSkeletons = Array.from({ length: 6 });
  protected readonly albumSkeletons = Array.from({ length: 5 });
  protected readonly trackSkeletons = Array.from({ length: 5 });
}
