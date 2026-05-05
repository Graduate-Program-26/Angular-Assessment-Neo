import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PlayerService {
  private audio = new Audio();

  playingTrackId = signal<number | null>(null);

  constructor() {
    this.audio.addEventListener('ended', () => this.playingTrackId.set(null));
  }

  async togglePlay(id: number, previewUrl: string): Promise<void> {
    if (this.playingTrackId() === id) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.playingTrackId.set(null);
      return;
    }

    if (!previewUrl) return;

    this.audio.src = previewUrl;
    this.audio.load();
    this.playingTrackId.set(id);

    try {
      await this.audio.play();
    } catch {
      this.playingTrackId.set(null);
    }
  }
}
