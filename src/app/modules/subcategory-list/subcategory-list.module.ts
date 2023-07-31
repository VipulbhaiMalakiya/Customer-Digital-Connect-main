import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubcategoryListRoutingModule } from './subcategory-list-routing.module';
import { SubcategoryListComponent } from './pages/subcategory-list/subcategory-list.component';
import { SharedModule } from "../shared/shared.module";
import { AddEditeSubCategoryComponent } from './components/components/add-edite-sub-category/add-edite-sub-category.component';
import { ViewSubCategoryComponent } from './components/components/view-sub-category/view-sub-category.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SubCategoryFilterPipe } from 'src/app/_helpers/sub-cat-filter.pipe';

@NgModule({
    declarations: [
        SubcategoryListComponent,
        SubcategoryListComponent,
        AddEditeSubCategoryComponent,
        ViewSubCategoryComponent,
        SubCategoryFilterPipe
    ],
    imports: [
        CommonModule,
        SubcategoryListRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        FormsModule
    ]
})
export class SubcategoryListModule { }
