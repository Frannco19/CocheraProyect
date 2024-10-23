import { inject, Injectable } from '@angular/core';
import { rates } from '../interfaces/rates';
import { DataAuthService } from './data-auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataRatesService {
  tarifas: rates[] = []
  authService = inject(DataAuthService);

  constructor() { 
    this.getTarifas()
  }

  async getTarifas(){
    const res = await fetch('http://localhost:4000/tarifas',{
      headers: {
        authorization:'Bearer '+this.authService.user?.token
      },
    })
    if(res.status !== 200) {
      console.log("Error")
    } else {
      console.log(res)
      this.tarifas = await res.json();
    }
  }

}
