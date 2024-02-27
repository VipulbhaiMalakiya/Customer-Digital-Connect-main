import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RepeatedCustomerRoutingModule } from './repeated-customer-routing.module';
import { RepeatedCustomerComponent } from './repeated-customer.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../shared/shared.module';
import { ReFilterPipe } from 'src/app/_helpers/Repeated-filter';


@NgModule({
  declarations: [
    RepeatedCustomerComponent,
    ReFilterPipe
  ],
  imports: [
    CommonModule,
    RepeatedCustomerRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    SharedModule
  ]
})
export class RepeatedCustomerModule { }
