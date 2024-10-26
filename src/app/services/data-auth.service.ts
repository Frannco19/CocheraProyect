import { inject, Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';
import { Login, ResLogin } from '../interfaces/login';
import { Router } from '@angular/router';
import { Register } from '../interfaces/register';

@Injectable({
  providedIn: 'root'
})
export class DataAuthService {
  constructor() {
    const token = this.getToken();
    if(token){
      if(!this.usuario) this.usuario = {
        username: '',
        token: token,
        esAdmin: false
      }
      else this.usuario!.token = token;
    }
   }
  usuario: Usuario | undefined;

  async login(loginData: Login) {
    const res = await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(loginData)
    })
    if (res.status !== 200) return;

    const resJson: ResLogin = await res.json();

    if (!resJson.token) return;

    this.usuario = {
      username: loginData.username,
      token: resJson.token,
      esAdmin: false
    }

    localStorage.setItem("authToken", resJson.token);

    const userDetailsRes = await fetch(`http://localhost:4000/usuarios/${encodeURIComponent(loginData.username)}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${resJson.token}`,
        'Content-Type': 'application/json'
      }
    });

    if (userDetailsRes.status !== 200) return;

    const userDetailsResJson = await userDetailsRes.json();

    this.usuario.esAdmin = userDetailsResJson.esAdmin;

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
     localStorage.removeItem("authToken");
  }
}
