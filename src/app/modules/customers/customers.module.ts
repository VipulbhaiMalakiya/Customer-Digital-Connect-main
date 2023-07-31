import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersListComponent } from './pages/customers-list/customers-list.component';
import { AddUpdateCustomersComponent } from './components/add-update-customers/add-update-customers.component';
import { ViewCustomersComponent } from './components/view-customers/view-customers.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { CusomerFilterPipe } from 'src/app/_helpers/customer-filter.pipe';

@NgModule({
  declarations: [
    CustomersListComponent,
    AddUpdateCustomersComponent,
    ViewCustomersComponent,
    CusomerFilterPipe
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FormsModule
  ]
})
export class CustomersModule { }
