import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/login/login').then((m) => m.Login),
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./features/home/home').then((m) => m.Home),
  },
  {
    path: 'search',
    canActivate: [authGuard],
    loadComponent: () => import('./features/search/search').then((m) => m.Search),
  },
  {
    path: 'album/:id',
    canActivate: [authGuard],
    loadComponent: () => import('./features/album/album').then((m) => m.Album),
  },
  {
    path: 'artist/:id',
    canActivate: [authGuard],
    loadComponent: () => import('./features/artist/artist').then((m) => m.Artist),
  },
  {
    path: 'playlist',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/playlist/playlist-list/playlist-list').then((m) => m.PlaylistList),
  },
  {
    path: 'playlist/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/playlist/user-playlist/user-playlist').then((m) => m.UserPlaylist),
  },
  {
    path: '**',
    loadComponent: () => import('./features/not-found/not-found').then((m) => m.NotFound),
  },
];
