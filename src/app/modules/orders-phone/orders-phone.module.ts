import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersPhoneRoutingModule } from './orders-phone-routing.module';
import { OrderComponent } from './pages/order/order.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../shared/shared.module';
import { ConformRoderComponent } from './componets/conform-roder/conform-roder.component';


@NgModule({
  declarations: [
    OrderComponent,
    ConformRoderComponent
  ],
  imports: [
    CommonModule,
    OrdersPhoneRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
  ]
})
export class OrdersPhoneModule { }
