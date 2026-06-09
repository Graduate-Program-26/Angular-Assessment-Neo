import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PlaylistStore } from '../../../shared/store/store';
import { AutofocusDirective } from '../../../shared/directives/autofocus.directive';

@Component({
  selector: 'app-playlist-list',
  imports: [ReactiveFormsModule, RouterLink, AutofocusDirective],
  templateUrl: './playlist-list.html',
  styleUrl: './playlist-list.css',
})
export class PlaylistList {
  protected store = inject(PlaylistStore);

  newName = new FormControl<string>('', { nonNullable: true });
  renamingId = signal<string | null>(null);
  renameControl = new FormControl<string>('', { nonNullable: true });

  create(): void {
    const name = this.newName.value.trim();
    if (!name) return;
    this.store.create(name);
    this.newName.reset();
  }

  startRename(id: string, currentName: string): void {
    this.renamingId.set(id);
    this.renameControl.setValue(currentName);
  }

  confirmRename(id: string): void {
    const name = this.renameControl.value.trim();
    if (name) this.store.rename(id, name);
    this.renamingId.set(null);
  }

  cancelRename(): void {
    this.renamingId.set(null);
  }

  totalDuration(tracks: { duration: number }[]): string {
    const totalDuration = tracks.reduce((sum, total) => sum + total.duration, 0);
    const hour = Math.floor(totalDuration / 3600);
    const minute = Math.floor((totalDuration % 3600) / 60);
    if (hour > 0) return `${hour} hr ${minute} min`;
    if (minute > 0) return `${minute} min`;
    return `${totalDuration} sec`;
  }
}
