import { Routes } from '@angular/router';
import { Album } from './features/album/album';
import { Artist } from './features/artist/artist';
import { Playlist } from './features/playlist/playlist';
import { Home } from './features/home/home';

export const routes: Routes = [
    {
        path: '',
        component: Home,
    },
    {
        path: 'album',
        component: Album,
    },
    {
        path: 'artist',
        component: Artist,
    },
    {
        path: 'playlist',
        component: Playlist,
    },
];
