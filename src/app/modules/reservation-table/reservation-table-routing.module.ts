import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservationTableComponent } from './pages/reservation-table/reservation-table.component';
const routes: Routes = [{ path: '', component: ReservationTableComponent }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationTableRoutingModule { }
