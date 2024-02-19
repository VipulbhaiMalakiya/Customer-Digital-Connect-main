import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivecustomerwithroomnumberComponent } from './activecustomerwithroomnumber.component';

const routes: Routes = [{ path: '', component: ActivecustomerwithroomnumberComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivecustomerwithroomnumberRoutingModule { }
