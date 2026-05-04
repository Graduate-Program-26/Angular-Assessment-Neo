import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./features/home/home').then(m => m.Home),
    },
    {
        path: 'album/:id',
        loadComponent: () => import('./features/album/album').then(m => m.Album),
    },
    {
        path: 'artist/:id',
        loadComponent: () => import('./features/artist/artist').then(m => m.Artist),
    },
    {
        path: 'playlist/:id',
        loadComponent: () => import('./features/playlist/playlist').then(m => m.Playlist),
    },
];
