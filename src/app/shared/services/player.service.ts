import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PlayerService {
  private audio = new Audio();

  playingTrackId = signal<number | null>(null);

  constructor() {
    this.audio.addEventListener('ended', () => this.playingTrackId.set(null));
  }

  togglePlay(id: number, previewUrl: string): void {
    if (this.playingTrackId() === id) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.playingTrackId.set(null);
    } else {
      this.audio.src = previewUrl;
      this.audio.play();
      this.playingTrackId.set(id);
    }
  }
}