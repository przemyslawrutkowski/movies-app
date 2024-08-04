import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import passwordMatchValidator from '../../validators/passwordMatchValidator';
import { UsersService } from '../../services/users.service';
import RegisterCredentialsI from '../../interfaces/registerCredentials';

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
      this.usersService.signUp(credentials).subscribe(_id => {
        console.log(`Created user with id: ${_id}.`);
      });
    }
  }
}
