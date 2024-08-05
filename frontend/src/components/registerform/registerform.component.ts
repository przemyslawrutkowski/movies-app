import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import passwordMatchValidator from '../../validators/passwordMatchValidator';
import { UsersService } from '../../services/users.service';
import RegisterCredentialsI from '../../interfaces/registerCredentials';
import { HttpErrorResponse } from '@angular/common/http';

interface RegisterResultI {
  status: 'success' | 'error';
  message: string;
}

@Component({
  selector: 'app-registerform',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './registerform.component.html',
  styleUrl: '../../styles/shared-styles.css'
})
export class RegisterFormComponent {
  private usersService = inject(UsersService);
  registerForm: FormGroup;
  wasFormSubmitted = false;
  registerResult: RegisterResultI | null = null;

  constructor() {
    this.registerForm = new FormGroup({
      email: new FormControl('', {
        validators: [
          Validators.required,
          Validators.email
        ],
        updateOn: 'submit'
      }),
      username: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(12)
        ],
        updateOn: 'submit'
      }),
      password: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(128)
        ],
        updateOn: 'submit'
      }),
      passwordConfirm: new FormControl('', {
        validators: [
          Validators.required
        ],
        updateOn: 'submit'
      })
    }, { validators: passwordMatchValidator(), updateOn: 'submit' });
  }

  get email() {
    return this.registerForm.get('email');
  }

  get username() {
    return this.registerForm.get('username');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get passwordConfirm() {
    return this.registerForm.get('passwordConfirm');
  }

  onSubmit() {
    this.wasFormSubmitted = true;
    if (this.registerForm.valid) {
      const credentials: RegisterCredentialsI = {
        email: this.registerForm.value.email,
        username: this.registerForm.value.username,
        password: this.registerForm.value.password,
        passwordConfirm: this.registerForm.value.passwordConfirm
      };
      this.usersService.signUp(credentials).subscribe({
        next: _id => {
          console.log(`Created user with id: ${_id}.`);
          this.registerResult = {
            status: 'success',
            message: 'User created successfully.'
          };
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 409) {
            this.registerResult = {
              status: 'error',
              message: err.error.message ?? 'User with specified email or username already exists.'
            };
          }
        }
      });
    }
  }
}
