import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceTitleListComponent } from './pages/service-title-list/service-title-list.component';
const routes: Routes = [{ path: '', component: ServiceTitleListComponent }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceTitleListRoutingModule { }
