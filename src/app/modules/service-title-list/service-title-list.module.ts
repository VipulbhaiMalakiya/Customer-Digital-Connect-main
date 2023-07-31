import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceTitleListRoutingModule } from './service-title-list-routing.module';
import { AddEditeServiceTitleComponent } from './components/add-edite-service-title/add-edite-service-title.component';
import { ViewServiceTitleComponent } from './components/view-service-title/view-service-title.component';
import { ServiceTitleListComponent } from './pages/service-title-list/service-title-list.component';
import { SharedModule } from "../shared/shared.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ServiceTitleFilterPipe } from 'src/app/_helpers/serviceTitle-filter.pipe';
@NgModule({
  declarations: [
    ServiceTitleListComponent,
    AddEditeServiceTitleComponent,
    ViewServiceTitleComponent,
    ServiceTitleFilterPipe
  ],
  imports: [
    CommonModule,
    ServiceTitleListRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FormsModule
  ]
})
export class ServiceTitleListModule { }
