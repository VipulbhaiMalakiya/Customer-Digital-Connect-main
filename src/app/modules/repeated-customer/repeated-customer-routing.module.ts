import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RepeatedCustomerComponent } from './repeated-customer.component';

const routes: Routes = [{ path: '', component: RepeatedCustomerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RepeatedCustomerRoutingModule { }
