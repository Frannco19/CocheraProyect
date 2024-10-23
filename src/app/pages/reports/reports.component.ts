import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataparkingLotsService } from '../../services/data-parkinLot.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent {
  dataparkingLotsService = inject(DataparkingLotsService)
}
