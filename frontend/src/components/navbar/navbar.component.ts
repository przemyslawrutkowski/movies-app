import { Component, inject, effect } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LocalStorageService } from '../../services/localstorage.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  private localStorageService = inject(LocalStorageService);
  private authService: AuthService = inject(AuthService);
  isLoggedIn = false;

  constructor() {
    effect(() => {
      this.isLoggedIn = this.authService.loginStatus();
    });
  }

  onLogout() {
    this.localStorageService.remove('jwt');
    this.authService.changeLoginStatus(false);
  }
}
