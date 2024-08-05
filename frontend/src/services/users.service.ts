import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import LoginCredentialsI from '../interfaces/loginCredentials';
import RegisterCredentialsI from '../interfaces/registerCredentials';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private signUpUrl = 'http://localhost:3000/api/users';
  private signInUrl = 'http://localhost:3000/signin';
  private http = inject(HttpClient);

  signUp(credentials: RegisterCredentialsI) {
    return this.http.post(this.signUpUrl, credentials);
  }

  signIn(credentials: LoginCredentialsI) {
    return this.http.post(this.signInUrl, credentials);
  }
}
