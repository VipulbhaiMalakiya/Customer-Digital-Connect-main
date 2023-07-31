import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationTableRoutingModule } from './reservation-table-routing.module';
import { ReservationTableComponent } from './pages/reservation-table/reservation-table.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    ReservationTableComponent
  ],
  imports: [
    CommonModule,
    ReservationTableRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ReservationTableModule { }
