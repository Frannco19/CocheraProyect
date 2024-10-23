import { inject, Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Login, ResLogin } from '../interfaces/login';
import { Router } from '@angular/router';
import { Register } from '../interfaces/register';

@Injectable({
  providedIn: 'root'
})
export class DataAuthService {

  constructor() { }
  user: User | undefined;

  async login(LoginData: Login) {
    const res = await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(LoginData)
    })
    if (res.status !== 200) return;

    const resJson: ResLogin = await res.json();

    if (!resJson.token) return;

    this.user = {
      username: LoginData.username,
      token: resJson.token,
      esAdmin: false
    }

    localStorage.setItem("authToken", resJson.token);

    const userDetailsRes = await fetch(`http://localhost:4000/usuarios/${encodeURIComponent(LoginData.username)}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${resJson.token}`,
        'Content-Type': 'application/json'
      }
    });

    if (userDetailsRes.status !== 200) return;

    const userDetailsResJson = await userDetailsRes.json();

    this.user.esAdmin = userDetailsResJson.esAdmin;

    return userDetailsRes;
  }

  async register(registerData: Register) {
    const res = await fetch('http://localhost:4000/register', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(registerData)
    });

    if (res.status !== 201) return;
    return res;
  }

  getToken() {
    return localStorage.getItem("authToken");
  }

  clearToken() {
    localStorage.removeItem("authToken")
  }

}
