import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { get, set } from 'idb-keyval';
import { Track, UserPlaylist } from '../models/types';

const DB_KEY = 'playlists';

interface PlaylistState {
  playlists: UserPlaylist[];
}

export const PlaylistStore = signalStore(
  { providedIn: 'root' },

  withState<PlaylistState>({ playlists: [] }),

  withComputed(({ playlists }) => ({
    count: computed(() => playlists().length),
  })),

  withMethods((store) => ({
    create(name: string): void {
      const playlist: UserPlaylist = {
        id: crypto.randomUUID(),
        name: name.trim(),
        tracks: [],
        createdAt: Date.now(),
      };
      patchState(store, { playlists: [...store.playlists(), playlist] });
      set(DB_KEY, store.playlists());
    },

    addTrack(playlistId: string, track: Track): void {
      patchState(store, {
        playlists: store
          .playlists()
          .map((playlist) =>
            playlist.id === playlistId && !playlist.tracks.some((t) => t.id === track.id)
              ? { ...playlist, tracks: [...playlist.tracks, track] }
              : playlist,
          ),
      });
      set(DB_KEY, store.playlists());
    },

    rename(id: string, name: string): void {
      patchState(store, {
        playlists: store
          .playlists()
          .map((playlist) => (playlist.id === id ? { ...playlist, name: name.trim() } : playlist)),
      });
      set(DB_KEY, store.playlists());
    },

    delete(id: string): void {
      patchState(store, { playlists: store.playlists().filter((playlist) => playlist.id !== id) });
      set(DB_KEY, store.playlists());
    },

    removeTrack(playlistId: string, trackId: number): void {
      patchState(store, {
        playlists: store
          .playlists()
          .map((playlist) =>
            playlist.id === playlistId
              ? { ...playlist, tracks: playlist.tracks.filter((t) => t.id !== trackId) }
              : playlist,
          ),
      });
      set(DB_KEY, store.playlists());
    },
  })),

  withHooks({
    onInit(store) {
      get<UserPlaylist[]>(DB_KEY).then((stored) => {
        if (stored?.length) {
          patchState(store, { playlists: stored });
        }
      });
    },
  }),
);
