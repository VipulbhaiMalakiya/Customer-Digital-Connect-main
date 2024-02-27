import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HappycustomerRoutingModule } from './happycustomer-routing.module';
import { HappycustomerComponent } from './happycustomer.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { hcFilterPipe } from 'src/app/_helpers/happycustomer-filter';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    HappycustomerComponent,
    hcFilterPipe
  ],
  imports: [
    CommonModule,
    HappycustomerRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    SharedModule
  ]
})
export class HappycustomerModule { }
