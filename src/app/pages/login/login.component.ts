import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Login, ResLogin } from '../../interfaces/login';
import { DataAuthService } from '../../services/data-auth.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  authService = inject(DataAuthService)
  router = inject(Router);
  showPassword: boolean = false; 

  LoginData: Login = {
    username: "admin",
    password: "admin"
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

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
  async login(loginForm: NgForm) {
    const {usuario,password} = loginForm.value;
    const logimData : Login = {username: usuario,password}
    const res = await this.authService.login(this.LoginData)
    if(res?.status === "ok") this.router.navigate(['/state-garage']);
    else this.errorLogin = true;
  }

}
