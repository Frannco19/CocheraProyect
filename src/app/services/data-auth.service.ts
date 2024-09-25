import { inject, Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Login, ResLogin } from '../interfaces/login';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataAuthService {

  constructor() { }
  user: User | undefined;

  async login(LoginData:Login) {
    const res = await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(LoginData)
    })
    if (res.status != 200) return;
    const resJson: ResLogin = await res.json();
    if (!resJson.token) return;
    this.user = {
      username: LoginData.username,
      token: resJson.token,
      esAdmin: false
    }
    return resJson;
  }
}
