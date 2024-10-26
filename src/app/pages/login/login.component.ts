import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Login, ResLogin } from '../../interfaces/login';
import { DataAuthService } from '../../services/data-auth.service';
import { FormsModule, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

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

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  errorLogin = false;
  async login(loginForm: NgForm){
    const {username, password} = loginForm.value;
    const loginData = {username, password};

    const res = await this.authService.login(loginData)
    
    if(res?.statusText === "OK") this.router.navigate(['/state-garage']);
    else this.errorLogin = true, this.loginFail();
  }

  loginFail() {
    Swal.fire({
      title: "Usuario y/o contraseña incorrecto/s!",
      willOpen: () => {
        const titleEl = document.querySelector('.swal2-title') as HTMLElement;
        const contentEl = document.querySelector('.swal2-html-container') as HTMLElement;
        const confirmButton = document.querySelector('.swal2-confirm') as HTMLElement;
        if (titleEl) {
          titleEl.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
        }
        if (contentEl) {
          contentEl.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
        }
        if (confirmButton){
          confirmButton.style.backgroundColor = '#ffd000'; 
          confirmButton.style.color = 'black'; 
          confirmButton.style.border = 'none'; 
        }
      },
      confirmButtonText: "Intentar de nuevo"
    });
  }

}
