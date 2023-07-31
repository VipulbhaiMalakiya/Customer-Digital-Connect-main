import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductCategoryRoutingModule } from './product-category-routing.module';
import { ViewProductCategoryComponent } from './components/view-product-category/view-product-category.component';
import { AddEditeProductCategoryComponent } from './components/add-edite-product-category/add-edite-product-category.component';
import { ProductCategoryComponent } from './pages/product-category/product-category.component';
import { SharedModule } from "../shared/shared.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProdactCategoryFilterPipe } from 'src/app/_helpers/prodact-cate-filter.pipe';


@NgModule({
  declarations: [
    ViewProductCategoryComponent,
    AddEditeProductCategoryComponent,
    ProductCategoryComponent,
    ProdactCategoryFilterPipe
  ],
  imports: [
    CommonModule,
    ProductCategoryRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class ProductCategoryModule { }
