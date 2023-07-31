import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrderListComponent } from './pages/order-list/order-list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../shared/shared.module';
import { OrderftilterPipe } from 'src/app/_helpers/ordersList.filter';
import { EditeComponent } from './components/edite/edite.component';
import { ViewComponent } from './components/view/view.component';


@NgModule({
  declarations: [
    OrderListComponent,
    OrderftilterPipe,
    EditeComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
  ]
})
export class OrdersModule { }
