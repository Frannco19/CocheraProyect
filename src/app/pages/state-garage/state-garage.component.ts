import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Garage } from '../../interfaces/garage';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { DataGaragesService } from '../../services/data-garages.service';
import { DataAuthService } from '../../services/data-auth.service';
import { DataRatesService } from '../../services/data-rates.service';
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
  authService = inject(DataAuthService)
  dataGarageServices = inject(DataGaragesService)
  dataRatesService = inject(DataRatesService);

  async deleteGarage(index: number) {
    await this.dataGarageServices.deleteFile(index)
  }

  async AddGarage() {
    await this.dataGarageServices.AddGarage()
  }

  disableGarage(index:number) {
    this.dataGarageServices.disableGarage(index)
  }

  ableGarage(index:number) {
    this.dataGarageServices.ableGarage(index)
  }

  questionDeleteGarage(index:number) {
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

  openParkingLot(idCochera: number) {
    const idUsuarioIngreso = "ADMIN"
    Swal.fire({
      title: "Abrir Cochera",
      html: `<input type="text" id="patente" class="swal2-input" placeholder="Ingrese patente">`,
      showCancelButton: true,
      confirmButtonText: "Abrir",
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        const patenteInput = document.getElementById("patente") as HTMLInputElement
        if (!patenteInput || !patenteInput.value) {
          Swal.showValidationMessage("Por favor, ingrese una patente")
          return false;
        }
        return { patente: patenteInput.value };
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { patente } = result.value;
        await this.dataGarageServices.openParkingLot(patente, idUsuarioIngreso, idCochera);
      }
    })
  }

  closeParkingLot(garage: Garage) {
    const horario = garage.parkingLot?.horaIngreso;
    let fechaIngreso;
    let horasPasadas = 0; 
    let minutosPasados = 0; 
    let patente: string;
    let tarifaABuscar: string;
    let total;

    if (horario) {
        fechaIngreso = new Date(horario);

        if (fechaIngreso) {
            const fechaActual = new Date();
            const diferenciaEnMilisegundos = fechaActual.getTime() - fechaIngreso.getTime();
            horasPasadas = Math.floor(diferenciaEnMilisegundos / (1000 * 60 * 60));
            minutosPasados = Math.floor((diferenciaEnMilisegundos % (1000 * 60 * 60)) / (1000 * 60));
        }

        patente = garage.parkingLot?.patente!;

        const totalMinutos = horasPasadas * 60 + minutosPasados;
        if (totalMinutos <= 30) {
            tarifaABuscar = "MEDIAHORA";
        } else if (totalMinutos <= 60) {
            tarifaABuscar = "PRIMERAHORA";
        } else {
            tarifaABuscar = "VALORHORA";
        }

        total = this.dataRatesService.tarifas.find(t => t.id === tarifaABuscar)?.valor;
    }

    const horaFormateada = fechaIngreso ? fechaIngreso.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';

    Swal.fire({
        html: `
            <div style="text-align: left;">
                <h4>Horario de inicio: ${horaFormateada}</h4>
                <h4>Tiempo transcurrido: ${horasPasadas} horas y ${minutosPasados} minutos</h4>
                <hr style="border: 1px solid #ccc;">
                <h2 style="margin: 20px 0 10px; text-align: center;">Total a cobrar</h2>
                <div style="background-color: #28a745; color: white; font-size: 24px; padding: 10px; border-radius: 5px; text-align: center; margin: 0 auto; display: block; width: fit-content;">
                    $${total}
                </div>
                <div style="margin-top: 20px; text-align: center;">
                    <button id="cobrar" class="swal2-confirm swal2-styled" style="background-color: #007bff; padding: 10px 24px;">Cobrar</button>
                    <button id="volver" class="swal2-cancel swal2-styled" style="background-color: #aaa; padding: 10px 24px;">Volver</button>
                </div>
            </div>`,
        showConfirmButton: false,
        didOpen: () => {
            const cobrarButton = document.getElementById('cobrar');
            const volverButton = document.getElementById('volver');
            
            if (cobrarButton) {
                cobrarButton.addEventListener('click', async () => {
                    const idUsuarioEgreso = "ADMIN";
                    await this.dataGarageServices.closeParkingLot(patente, idUsuarioEgreso);
                    Swal.close();
                });
            }
            
            if (volverButton) {
                volverButton.addEventListener('click', () => {
                    Swal.close();
                });
            }
        }
    });
  }
}