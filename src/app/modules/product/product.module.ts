import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductsComponent } from './pages/products/products.component';
import { AddEditeProductsComponent } from './components/add-edite-products/add-edite-products.component';
import { ViewProductsComponent } from './components/view-products/view-products.component';
import { SharedModule } from "../shared/shared.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProdactFilterPipe } from 'src/app/_helpers/prodacts-filter';


@NgModule({
    declarations: [
        ProductsComponent,
        ProductsComponent,
        AddEditeProductsComponent,
        ViewProductsComponent,
        ProdactFilterPipe
    ],
    imports: [
        CommonModule,
        ProductRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        FormsModule
    ]
})
export class ProductModule { }
