import { Component, input } from '@angular/core';

@Component({
  selector: 'app-track-skeleton',
  templateUrl: './track-skeleton.html',
  host: {
    class: 'flex items-center gap-4 px-4 py-2 rounded-lg',
  },
})
export class TrackSkeleton {
  showCover = input<boolean>(false);
}
