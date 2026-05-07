import { Component, inject, input, signal } from '@angular/core';
import { DurationPipe } from '../../pipes/duration.pipe';
import { Track } from '../../models/types';
import { PlayerService } from '../../services/player.service';
import { PlaylistStore } from '../../store/store';

@Component({
  selector: 'app-track',
  imports: [DurationPipe],
  templateUrl: './track.html',
  styleUrl: './track.css',
  host: {
    class: 'flex items-center gap-4 px-4 py-2 rounded-lg group hover:bg-[#1d1633] transition-colors relative',
  },
})
export class TrackItem {
  track = input.required<Track>();
  index = input.required<number>();
  coverUrl = input<string | undefined>(undefined);
  artistName = input<string | undefined>(undefined);

  protected playerService = inject(PlayerService);
  protected store = inject(PlaylistStore);

  menuOpen = signal(false);

  toggleMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.menuOpen.update(value => !value);
  }

  addToPlaylist(playlistId: string, event: MouseEvent): void {
    event.stopPropagation();
    this.store.addTrack(playlistId, this.track());
    this.menuOpen.set(false);
  }
}
