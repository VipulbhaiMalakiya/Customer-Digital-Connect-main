import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepatmentTicketComponent } from './pages/depatment-ticket/depatment-ticket.component';

const routes: Routes = [{ path: '', component: DepatmentTicketComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepatmentTicketRoutingModule { }
