import { computed, inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { Auth, authState, GoogleAuthProvider, signInWithPopup, signOut } from '@angular/fire/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  private router = inject(Router);

  user = toSignal(authState(this.auth));
  isLoggedIn = computed(() => this.user() != null);

  async login(): Promise<void> {
    await signInWithPopup(this.auth, new GoogleAuthProvider());
    await this.router.navigate(['/']);
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
    await this.router.navigate(['/login']);
  }
}
