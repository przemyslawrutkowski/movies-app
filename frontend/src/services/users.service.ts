import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import LoginCredentialsI from '../interfaces/loginCredentials';
import RegisterCredentialsI from '../interfaces/registerCredentials';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private signUpUrl = 'http://localhost:3000/api/users';
  private signInUrl = 'http://localhost:3000/signin';

  constructor(private http: HttpClient) { }

  signUp(credentials: RegisterCredentialsI) {
    return this.http.post(this.signUpUrl, credentials).subscribe(_id => {
      console.log(`Created user with id: ${_id}.`);
    });
  }

  signIn(credentials: LoginCredentialsI) {
    return this.http.post(this.signInUrl, credentials).subscribe(jwt => {
      console.log(`Received JWT: ${jwt}.`);
    });
  }
}
