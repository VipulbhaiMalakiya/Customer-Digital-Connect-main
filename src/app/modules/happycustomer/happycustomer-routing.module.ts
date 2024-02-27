import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HappycustomerComponent } from './happycustomer.component';

const routes: Routes = [{ path: '', component: HappycustomerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HappycustomerRoutingModule { }
