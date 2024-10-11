import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Garage } from '../../interfaces/garage';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { DataGaragesService } from '../../services/data-garages.service';
import { DataAuthService } from '../../services/data-auth.service';
@Component({
  selector: 'app-state-garage',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './state-garage.component.html',
  styleUrl: './state-garage.component.scss'
})
export class StateGarageComponent {
  titulo = "PARKING APP";
  esAdmin = true

  Garages: Garage[] = []

  dataGarageServices = inject(DataGaragesService)

  constructor() {

  }

  deleteGarage($index:number) {
    this.dataGarageServices.deleteGarage()
  }

  AddGarage() {
    this.dataGarageServices.AddGarage()
  }

  disableGarage($index:number) {
    this.dataGarageServices.disableGarage($index)
  }

  ableGarage($index:number) {
    this.dataGarageServices.ableGarage($index)
  }

  questionDeleteGarage(index: number) {
    Swal.fire({
      title: "¿Deseas eliminar la cochera?",
      text: "Se eliminará el registro de la cochera",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      willOpen: () => {
        const titleEl = document.querySelector('.swal2-title') as HTMLElement;
        const contentEl = document.querySelector('.swal2-html-container') as HTMLElement;
        if (titleEl) {
          titleEl.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
        }
        if (contentEl) {
          contentEl.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataGarageServices.Garages.splice(index, 1);
        Swal.fire({
          title: "Eliminado!",
          text: "La cochera ha sido eliminada.",
          icon: "success",
          willOpen: () => {
            const titleEl = document.querySelector('.swal2-title') as HTMLElement;
            const contentEl = document.querySelector('.swal2-html-container') as HTMLElement;
            if (titleEl) {
              titleEl.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
            }
            if (contentEl) {
              contentEl.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
            }
          }
        });
      }
    });
  }
}