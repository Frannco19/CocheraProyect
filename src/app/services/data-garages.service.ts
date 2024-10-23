import { inject, Injectable } from '@angular/core';
import { Garage } from '../interfaces/garage';
import { DataAuthService } from './data-auth.service';
import { parkingLot } from '../interfaces/parkingLot';

@Injectable({
  providedIn: 'root'
})
export class DataGaragesService {
  Garages: Garage[] = []
  parkingLots: parkingLot[] = []
  authServices = inject(DataAuthService);

  constructor() {
    this.loadData()
   }

  async loadData() {
    await this.getGarages()
    await this.getParkingLots()
    this.associateParkingLotsWithGarages()
  }

  async desableGarage(idCochera: number) {
    const res = await fetch('http://localhost:4000/cocheras', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization:'Bearer '+this.authServices.user?.token
      },
      body: JSON.stringify(idCochera)
    })
    if (res.status !== 200) {
      console.log("Error en la creacion de una nueva cochera")
    } else {
      console.log("Creacion de cochera exitosa")
    }
  };

  async getGarages() {
    const res = await fetch('http://localhost:4000/cocheras', {
      method: 'GET',
      headers: {
        authorization: 'Bearer ' + this.authServices.user?.token
      },
    })
    if (res.status != 200) return;
    const resJson: Garage[] = await res.json();
    this.Garages = resJson;
  }

  async getParkingLots(){
    const res = await fetch('http://localhost:4000/estacionamientos',{
      headers: {
        authorization:'Bearer '+ localStorage.getItem("authToken")
      },
    })
    if(res.status !== 200) return;
    const resJson: parkingLot[] = await res.json();
    this.parkingLots = resJson;
  }

  associateParkingLotsWithGarages() {
    this.Garages = this.Garages.map(garages  => {
      const estacionamiento = this.parkingLots.find(e => e.idCochera === garages.id)
      return {...garages, estacionamiento}
    });
    console.log(this.Garages)
  }

  ultimoNumero = this.Garages[this.Garages.length-1]?.id || 0;

  async AddGarage() {
    const cochera = {"descripcion" : "Agregada por WebApi" };
    const res = await fetch('http://localhost:4000/cocheras', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization:'Bearer '+this.authServices.user?.token
      },
      body: JSON.stringify(cochera)
    })
    if (res.status !== 200) {
      console.log("Error en la creacion de una nueva cochera")
    } else {
      console.log("Creacion de cochera exitosa")
    }
  };


  async deleteFile(index:number) {
    const res = await fetch(`http://localhost:4000/cocheras/${index}`, {
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
      this.loadData()
    }
  };

  disableGarage(index: number) {
    this.Garages[index].deshabilitado = 1;
  }

  ableGarage(index: number) {
    this.Garages[index].deshabilitado = 0;
  }

  async openParkingLot(patente: string, idUsuarioIngreso: string, idCochera: number) {
    const body = {patente, idUsuarioIngreso, idCochera};
    const res = await fetch('http://localhost:4000/estacionamientos/abrir',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization:'Bearer '+ localStorage.getItem("authToken")
      },
      body: JSON.stringify(body)
    })
    if(res.status !== 200) {
      console.log("Error en abrir estacionamiento")
    } else {
      console.log("Creacion de estacionamiento exitoso")
      this.loadData()
    };
  }

  async closeParkingLot(patente: string, idUsuarioEgreso: string) {
    const body = {patente, idUsuarioEgreso};
    const res = await fetch('http://localhost:4000/estacionamientos/cerrar',{
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization:'Bearer '+this.authServices.user?.token
      },
      body: JSON.stringify(body)
    })
    if(res.status !== 200) {
      console.log("Error en el cerrado del estacionamiento")
    } else {
      console.log("Cerrado del estacionamiento exitoso")
      console.log(res)
      this.loadData();
    };    
  }

}
