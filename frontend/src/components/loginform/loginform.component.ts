import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import LoginCredentialsI from '../../interfaces/loginCredentials';
import { LocalStorageService } from '../../services/localstorage.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-loginform',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './loginform.component.html',
  styleUrl: '../../styles/shared-styles.css'
})
export class LoginFormComponent {
  private usersService = inject(UsersService);
  private authService = inject(AuthService);
  private localStorageService = inject(LocalStorageService);
  private router = inject(Router);
  loginForm: FormGroup;
  wasFormSubmitted = false;
  loginError: string | null = null;

  constructor() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(12)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(128)
      ])
    }, { updateOn: 'submit' });
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    this.wasFormSubmitted = true;
    if (this.loginForm.valid) {
      const credentials: LoginCredentialsI = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password
      };
      this.usersService.signIn(credentials).subscribe({
        next: jwt => {
          this.localStorageService.set('jwt', JSON.stringify(jwt));
          this.authService.changeLoginStatus(true);
          this.router.navigate(['/']);
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 404 || err.status === 401) {
            this.loginError = err.error.message ?? 'Invalid credentials.';
          }
        }
      });
    }
  }
}
