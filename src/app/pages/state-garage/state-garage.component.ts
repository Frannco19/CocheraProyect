import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Garage } from '../../interfaces/garage';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-state-garage',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './state-garage.component.html',
  styleUrl: './state-garage.component.scss'
})
export class StateGarageComponent {
  titulo = "PARKING APP";

  headerTable = {
  }

  Garages: Garage[] = [{
    numero: 1,
    disponible: false,
    ingreso: '-',
    acciones: ""
  }

  ]

  updateGarage() {
    this.Garages = []
  }

  deleteGarage(index:number){
    this.Garages.splice(index,1);
  }

  ultimoNumero = this.Garages[this.Garages.length - 1].numero || 0;
  AddGarage() {
    this.Garages.push({
      numero: this.ultimoNumero + 1,
      disponible: true,
      ingreso: '-',
      acciones: ""
    })
    this.ultimoNumero++;
  }

  disableGarage($index:number){
    this.Garages[$index].disponible = false;
  }

  ableGarage($index:number){
    this.Garages[$index].disponible = true;
  }


}



