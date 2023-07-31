import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentMasterRoutingModule } from './department-master-routing.module';
import { DepartmentListComponent } from './pages/department-list/department-list.component';
import { ViewDepartmentMasterComponent } from './components/view-department-master/view-department-master.component';
import { AddEditeDepartmentMasterComponent } from './components/add-edite-department-master/add-edite-department-master.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { DeptFilterPipe } from 'src/app/_helpers/dept-filter.pipe';
@NgModule({
  declarations: [
    DepartmentListComponent,
    ViewDepartmentMasterComponent,
    AddEditeDepartmentMasterComponent,
    DeptFilterPipe
  ],
  imports: [
    CommonModule,
    DepartmentMasterRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FormsModule
  ]
})
export class DepartmentMasterModule { }
