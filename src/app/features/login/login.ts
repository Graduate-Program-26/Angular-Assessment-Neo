import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
})
export class Login {
  protected auth = inject(AuthService);
  protected loading = signal(false);
  protected error = signal<string | null>(null);

  async signIn(): Promise<void> {
    this.loading.set(true);
    this.error.set(null);
    try {
      await this.auth.login();
    } catch {
      this.error.set('Sign-in failed. Please try again.');
      this.loading.set(false);
    }
  }
}
