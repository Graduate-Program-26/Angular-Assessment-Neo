import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { DeezerService } from '../../shared/services/deezer.service';
import { ArtistCard } from '../../shared/components/artist-card/artist-card';
import { AlbumCard } from '../../shared/components/album-card/album-card';
import { TrackItem } from '../../shared/components/track/track';

@Component({
  selector: 'app-home',
  imports: [ArtistCard, AlbumCard, TrackItem],
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
}
