import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivecustomerwithroomnumberRoutingModule } from './activecustomerwithroomnumber-routing.module';
import { ActivecustomerwithroomnumberComponent } from './activecustomerwithroomnumber.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../shared/shared.module';
import { activecustomerwithroomnumberPipe } from 'src/app/_helpers/activecustomerwithroomnumber';


@NgModule({
  declarations: [
    ActivecustomerwithroomnumberComponent,
    activecustomerwithroomnumberPipe
  ],
  imports: [
    CommonModule,
    ActivecustomerwithroomnumberRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class ActivecustomerwithroomnumberModule { }
