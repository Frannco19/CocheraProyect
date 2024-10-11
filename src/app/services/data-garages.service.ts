import { inject, Injectable } from '@angular/core';
import { Garage } from '../interfaces/garage';
import { DataAuthService } from './data-auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataGaragesService {
  Garages: Garage[] = []

  authServices = inject(DataAuthService);

  constructor() {
    this.GetCocheras()
    this.AddGarage
    this.deleteGarage
  }

  async GetCocheras() {
    console.log(this.authServices.user?.token)
    const res = await fetch('http://localhost:4000/cocheras', {
      method: 'GET',
      headers: {
        authorization: 'Bearer ' + this.authServices.user?.token
      },
    })
    if (res.status != 200) return;
    const resJson: Garage[] = await res.json();
    this.Garages = resJson;
    //  this.router.navigate(['/state-garage']);
  }

  async AddGarage() {
    const cochera = { "descripcion": "Agregada por WebApi" }
    const res = await fetch('http://localhost:5001/cocheras/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer' + this.authServices.user?.token
      },
      body: JSON.stringify(cochera)
    })
    if (res.status !== 200) {
      console.log("Error en la creacion de una nueva cochera")
    } else {
      console.log("Creacion de cochera exitosa")
    }
  };

  ultimoNumero = this.Garages[this.Garages.length - 1]?.id || 0;

  async deleteGarage() {
    const res = await fetch('http://localhost:5001/cocheras/$(index)', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer' + this.authServices.user?.token
      }
    })
    if (res.status !== 200) {
      console.log('Error en la eliminacion de la cochera')
    } else {
      console.log("Cochera eliminada con exirto")
      this.GetCocheras()
    }
  };

  disableGarage(index: number) {
    this.Garages[index].deshabilitado = 1;
  }

  ableGarage(index: number) {
    this.Garages[index].deshabilitado = 0;
  }


}
