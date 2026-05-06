import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Artist } from '../../models/types';

@Component({
  selector: 'app-artist-card',
  imports: [RouterLink],
  templateUrl: './artist-card.html',
  styleUrl: './artist-card.css',
})
export class ArtistCard {
  artist =
    input.required<
      Pick<
        Artist,
        'id' | 'name' | 'picture_small' | 'picture_medium' | 'picture_big' | 'picture_xl'
      >
    >();
}
