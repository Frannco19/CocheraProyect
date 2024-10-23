import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DataAuthService } from '../../services/data-auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  errorRegister = false;
  authService = inject(DataAuthService)
  router = inject(Router)
  showPassword: boolean = false; 

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  async register(registerForm: NgForm) {
    const { username, nombre, apellido, password } = registerForm.value;
    const registerData = { username, nombre, apellido, password };

    const res = await this.authService.register(registerData)

    if (res?.statusText === "Created") {
      this.router.navigate(['/login']).then(() => (
        Swal.fire({
          title: "Registro Exitoso!",
          text: "",
          icon: "success",
          confirmButtonColor: "#3085d6", 
          willOpen: () => {
            const titleEl = document.querySelector('.swal2-title') as HTMLElement;
            const contentEl = document.querySelector('.swal2-html-container') as HTMLElement;
            if (titleEl) {
              titleEl.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
              titleEl.style.color = "#4CAF50"; 
            }
            if (contentEl) {
              contentEl.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
            }
          }
        })
      ));
    } else this.errorRegister= true;
    
    
  }
}

