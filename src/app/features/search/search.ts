import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs';
import { DeezerService } from '../../shared/services/deezer.service';

@Component({
  selector: 'app-search',
  imports: [ReactiveFormsModule],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {
  private deezerService = inject(DeezerService);

  query = new FormControl<string>('', { nonNullable: true });

  results = toSignal(
    this.query.valueChanges.pipe(
      debounceTime(450),
      distinctUntilChanged(),
      filter(query => query.trim().length > 0),
      switchMap(query => this.deezerService.search(query))
    )
  );
}
