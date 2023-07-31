import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubcategoryListComponent } from './pages/subcategory-list/subcategory-list.component';
const routes: Routes = [{ path: '', component: SubcategoryListComponent }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubcategoryListRoutingModule { }
