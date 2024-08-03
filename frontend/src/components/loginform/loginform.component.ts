import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import LoginCredentialsI from '../../interfaces/loginCredentials';

@Component({
  selector: 'app-loginform',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './loginform.component.html',
  styleUrl: '../../styles/shared-styles.css'
})
export class LoginFormComponent {
  private usersService: UsersService = inject(UsersService);
  loginForm: FormGroup;
  wasFormSubmitted = false;

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
      this.usersService.signIn(credentials);
    }
  }
}
