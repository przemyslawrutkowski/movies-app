import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginStatusSignal = signal<boolean>(false);

  get loginStatus() {
    return this.loginStatusSignal;
  }

  changeLoginStatus(isLoggedIn: boolean) {
    this.loginStatusSignal.set(isLoggedIn);
  }
}
