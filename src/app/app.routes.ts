import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home').then((m) => m.Home),
  },
  {
    path: 'search',
    loadComponent: () => import('./features/search/search').then((m) => m.Search),
  },
  {
    path: 'album/:id',
    loadComponent: () => import('./features/album/album').then((m) => m.Album),
  },
  {
    path: 'artist/:id',
    loadComponent: () => import('./features/artist/artist').then((m) => m.Artist),
  },
  {
    path: 'playlist',
    loadComponent: () =>
      import('./features/playlist/playlist-list/playlist-list').then((m) => m.PlaylistList),
  },
  {
    path: 'playlist/:id',
    loadComponent: () =>
      import('./features/playlist/user-playlist/user-playlist').then((m) => m.UserPlaylist),
  },
  {
    path: '**',
    loadComponent: () => import('./features/not-found/not-found').then((m) => m.NotFound),
  },
];
