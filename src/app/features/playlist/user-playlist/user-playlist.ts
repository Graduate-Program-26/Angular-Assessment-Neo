import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PlaylistStore } from '../../../shared/store/store';
import { TrackItem } from '../../../shared/components/track/track';

@Component({
  selector: 'app-user-playlist',
  imports: [RouterLink, TrackItem],
  templateUrl: './user-playlist.html',
  styleUrl: './user-playlist.css',
})
export class UserPlaylist {
  protected store = inject(PlaylistStore);

  id = input.required<string>();

  playlist = computed(() =>
    this.store.playlists().find(playlist => playlist.id === this.id())
  );

  totalDuration = computed(() => {
    const tracks = this.playlist()?.tracks ?? [];
    const total = tracks.reduce((sum, t) => sum + t.duration, 0);
    const hour = Math.floor(total / 3600);
    const minute = Math.floor((total % 3600) / 60);
    const second = total % 60;
    if (hour > 0) return `${hour} hr ${minute} min`;
    if (minute > 0) return `${minute} min ${second} sec`;
    return `${second} sec`;
  });
}
