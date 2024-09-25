import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Login, ResLogin } from '../../interfaces/login';
import { DataAuthService } from '../../services/data-auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  authService = inject(DataAuthService)

  LoginData: Login = {
    username: "admin",
    password: "admin"
  }

  router = inject(Router);

  // login(){
  //   fetch('http://localhost:4000/login',{
  //     method: 'POST',
  //     headers: {
  //       'Content-type' : 'application/json'
  //     },
  //     body: JSON.stringify(this.LoginData)
  //   }).then(res =>{
  //     console.log("tengo respuesta del back",res)
  //     res.json().then(resJson =>{
  //       console.log(res.json)
  //     })
  //   })
  //   console.log("Despues del fetch")
  // }
  errorLogin = false
  async login() {
    const res = await this.authService.login(this.LoginData)
    if(res?.status === "ok") this.router.navigate(['/state-garage']);
    else this.errorLogin = true;
  }

}
