import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailRoutingModule } from './product-detail-routing.module';
import { ProductsComponent } from './pages/products/products.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddOrderComponent } from './componet/add-order/add-order.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ConformOrderComponent } from './componet/conform-order/conform-order.component';
import { PhoneNoComponent } from './componet/phone-no/phone-no.component';
@NgModule({
  declarations: [
    ProductsComponent,
    AddOrderComponent,
    ConformOrderComponent,
    PhoneNoComponent
  ],
  imports: [
    CommonModule,
    ProductDetailRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FormsModule
  ]
})
export class ProductDetailModule { }
