import { inject, Injectable } from '@angular/core';
import { DataGaragesService } from './data-garages.service';
import { Estacionamiento } from '../interfaces/estacionamiento';

@Injectable({
  providedIn: 'root'
})
export class DataparkingLotsService {
  dataGarageService = inject(DataGaragesService)
  ultimasTransacciones: Estacionamiento[] = [];

  constructor() {
    this.getUltimasTransacciones();
   }

  async getUltimasTransacciones(cantidad = 5) {
    if (!this.dataGarageService.estacionamientos || this.dataGarageService.estacionamientos.length === 0) {
      console.error("No hay estacionamientos disponibles");
    }

    const transaccionesFiltradas = this.dataGarageService.estacionamientos.filter(parkinglot => 
        parkinglot.horaEgreso !== null && parkinglot.horaEgreso !== undefined
    );

    const ultimasTransacciones = transaccionesFiltradas
        .sort((a, b) => new Date(b.horaIngreso.replace(" ", "T")).getTime() - new Date(a.horaIngreso.replace(" ", "T")).getTime()) // Ordenar de más reciente a más antiguo
        .slice(0, cantidad);

    this.ultimasTransacciones = ultimasTransacciones;
    console.log(this.ultimasTransacciones)
  }
}