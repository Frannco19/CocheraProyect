import { inject, Injectable } from '@angular/core';
import { tarifa } from '../interfaces/tarifa';
import { DataAuthService } from './data-auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataRatesService {
  tarifas: tarifa[] = []
  authService = inject(DataAuthService);

  constructor() { 
    this.loadData()
  }

  async loadData() {
    await this.getTarifas()
    await this.UpdateTarifas
  }

  async getTarifas(){
    const res = await fetch('http://localhost:4000/tarifas',{
      headers: {
        authorization:'Bearer '+ localStorage.getItem("authToken")
      },
    })
    if(res.status !== 200) {
      console.log("Error")
    } else {
      console.log(res)
      this.tarifas = await res.json();
    }
  }

  async UpdateTarifas(descripcion: string, valor: string) {
    const body = {descripcion, valor};
    const res = await fetch(`http://localhost:4000/tarifas/${descripcion}`, {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
        authorization:'Bearer ' +  localStorage.getItem("authToken")
      },
      body: JSON.stringify(body) 
    });
  
    if (res.status !== 200) {
      console.log("Error al actualizar la tarifa");
    } else {
      console.log("Tarifa actualizada correctamente");
      this.loadData()
    }
  }
}
