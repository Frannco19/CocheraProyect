import { inject, Injectable } from '@angular/core';
import { Cochera } from '../interfaces/cochera';
import { DataAuthService } from './data-auth.service';
import { Estacionamiento } from '../interfaces/estacionamiento';

@Injectable({
  providedIn: 'root'
})
export class DataGaragesService {
  cocheras: Cochera[] = []
  estacionamientos: Estacionamiento[] = []
  authServices = inject(DataAuthService);

  constructor() {
    this.loadData()
   }

  async loadData() {
    await this.getGarages()
    await this.getParkingLots()
    this.associateParkingLotsWithGarages()
  }

  async getGarages(){
    const res = await fetch('http://localhost:4000/cocheras',{
      headers: {
        authorization:'Bearer '+localStorage.getItem("authToken")
      },
    })
    if(res.status !== 200) return;
    const resJson:Cochera[] = await res.json();
    this.cocheras = resJson;
  }

  async getParkingLots(){
    const res = await fetch('http://localhost:4000/estacionamientos',{
      headers: {
        authorization:'Bearer '+ localStorage.getItem("authToken")
      },
    })
    if(res.status !== 200) return;
    const resJson: Estacionamiento[] = await res.json();
    this.estacionamientos = resJson;
  }

  associateParkingLotsWithGarages() {
    this.cocheras = this.cocheras.map(garage => {
      const estacionamiento = this.estacionamientos.find(e => e.idCochera === garage.id)
      return {...garage, estacionamiento}
    });
    console.log(this.cocheras)
  }

  async disableGarage(idCochera: number) {
    const res = await fetch('http://localhost:4000/cocheras/'+idCochera+'/disable',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization:'Bearer '+localStorage.getItem("authToken")
      },
      body: JSON.stringify(idCochera)
    })
    if (res.status !== 200) {
      console.log("Error en la creacion de una nueva cochera")
    } else {
      console.log("Creacion de cochera exitosa")
    }
  };

  ultimoNumero = this.cocheras[this.cocheras.length-1]?.id || 0;

  async AddGarage(nombreCochera:string) {
    const cochera = {"descripcion" : nombreCochera };
    const res = await fetch('http://localhost:4000/cocheras', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization:'Bearer '+localStorage.getItem("authToken")
      },
      body: JSON.stringify(cochera)
    })
    if (res.status !== 200) {
      console.log("Error en la creacion de una nueva cochera")
    } else {
      console.log("Creacion de cochera exitosa")
      this.loadData();
    }
  };


  async deleteFile(index:number) {
    const res = await fetch(`http://localhost:4000/cocheras/${index}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer'+localStorage.getItem("authToken")
      }
    })
    if (res.status !== 200) {
      console.log('Error en la eliminacion de la cochera')
    } else {
      console.log("Cochera eliminada con exirto")
      this.loadData()
    }
  };

  async ableGarage(idCochera:number){
    const res = await fetch('http://localhost:4000/cocheras/'+idCochera+'/enable',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization:'Bearer '+ localStorage.getItem("authToken")
      },
    })
    if(res.status === 200) {
      console.log("Cochera hablitada")
      this.loadData()
    } else {
      console.warn("Error habilitando cochera")
    };
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
        authorization:'Bearer ' + localStorage.getItem("authToken")
      },
      body: JSON.stringify(body)
    })
    if(res.status !== 200) {
      console.log("Error en el cerrado del estacionamiento")
    } else {
      console.log("Cerrado del estacionamiento exitoso")
      this.loadData();
    };    
  }

}
