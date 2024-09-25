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
  }

  async GetCocheras(){
    console.log(this.authServices.user?.token)
    const res = await fetch('http://localhost:4000/cocheras', {
      method: 'GET',
      headers: {
        authorization: 'Bearer ' + this.authServices.user?.token
      },
    })
    if (res.status != 200) return;
     const resJson:Garage[] = await res.json();
     this.Garages = resJson;
    //  this.router.navigate(['/state-garage']);
  }

  ultimoNumero = this.Garages[this.Garages.length - 1]?.id || 0;
  AddGarage() {
    this.Garages.push({
      id: this.ultimoNumero + 1,
      deshabilitado: 0,
      descripcion: '-',
      eliminada: 0
    })
    this.ultimoNumero++;
    console.log(this.Garages)
  }

  updateGarage(index:number) {
    this.Garages = []
  }

  deleteGarage(index: number) {
    this.Garages.splice(index, 1);
  }


  disableGarage($index: number) {
    this.Garages[$index].deshabilitado = 1;
  }

  ableGarage($index: number) {
    this.Garages[$index].deshabilitado = 0;
  }

}
