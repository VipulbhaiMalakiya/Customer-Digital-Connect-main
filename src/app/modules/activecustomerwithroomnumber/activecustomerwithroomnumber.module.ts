import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivecustomerwithroomnumberRoutingModule } from './activecustomerwithroomnumber-routing.module';
import { ActivecustomerwithroomnumberComponent } from './activecustomerwithroomnumber.component';


@NgModule({
  declarations: [
    ActivecustomerwithroomnumberComponent
  ],
  imports: [
    CommonModule,
    ActivecustomerwithroomnumberRoutingModule
  ]
})
export class ActivecustomerwithroomnumberModule { }
