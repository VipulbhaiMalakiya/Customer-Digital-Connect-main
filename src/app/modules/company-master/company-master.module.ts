import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { CompanyMasterRoutingModule } from './company-master-routing.module';
import { CompanyListComponent } from './pages/company-list/company-list.component';
import { ViewCompanyComponent } from './components/view-company/view-company.component';
import { AddEditeCompanyComponent } from './components/add-edite-company/add-edite-company.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CompanyFilterPipe } from 'src/app/_helpers/company-filter.pipe';


@NgModule({
  declarations: [
    CompanyListComponent,
    ViewCompanyComponent,
    AddEditeCompanyComponent,
    CompanyFilterPipe
  ],
  imports: [
    CommonModule,
    CompanyMasterRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    NgxPaginationModule,
  ]
})
export class CompanyMasterModule { }
