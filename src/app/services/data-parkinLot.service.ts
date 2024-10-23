import { inject, Injectable } from '@angular/core';
import { DataGaragesService } from './data-garages.service';
import { parkingLot } from '../interfaces/parkingLot';

@Injectable({
  providedIn: 'root'
})
export class DataparkingLotsService {
  dataGarageService = inject(DataGaragesService)
  ultimasTransacciones: parkingLot[] = [];

  constructor() {
    this.getUltimasTransacciones();
   }

  async getUltimasTransacciones(cantidad = 5) {
    if (!this.dataGarageService.parkingLots || this.dataGarageService.parkingLots.length === 0) {
      console.error("No hay estacionamientos disponibles");
    }

    const transaccionesFiltradas = this.dataGarageService.parkingLots.filter(parkinglot => 
        parkinglot.horaEgreso !== null && parkinglot.horaEgreso !== undefined
    );

    const ultimasTransacciones = transaccionesFiltradas
        .sort((a, b) => new Date(b.horaIngreso.replace(" ", "T")).getTime() - new Date(a.horaIngreso.replace(" ", "T")).getTime()) // Ordenar de más reciente a más antiguo
        .slice(0, cantidad);

    this.ultimasTransacciones = ultimasTransacciones;
    console.log(this.ultimasTransacciones)
  }
}