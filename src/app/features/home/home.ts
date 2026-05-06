import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { DeezerService } from '../../shared/services/deezer.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private deezerService = inject(DeezerService);

  chart = toSignal(this.deezerService.getChart());
}
