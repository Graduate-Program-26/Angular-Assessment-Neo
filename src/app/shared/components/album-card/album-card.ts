import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Album } from '../../models/types';

@Component({
  selector: 'app-album-card',
  imports: [RouterLink],
  templateUrl: './album-card.html',
  styleUrl: './album-card.css',
})
export class AlbumCard {
  album =
    input.required<
      Pick<Album, 'id' | 'title' | 'cover_small' | 'cover_medium' | 'cover_big' | 'cover_xl'>
    >();
  artistName = input<string>();
}
