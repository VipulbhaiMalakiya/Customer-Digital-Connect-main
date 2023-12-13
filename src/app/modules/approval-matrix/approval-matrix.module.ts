import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApprovalMatrixRoutingModule } from './approval-matrix-routing.module';
import { ApprovalMatrixListComponent } from './pages/approval-matrix-list/approval-matrix-list.component';
import { AddUpdateApprovalMatrixComponent } from './components/add-update-approval-matrix/add-update-approval-matrix.component';
import { ViewApprovalMatrixComponent } from './components/view-approval-matrix/view-approval-matrix.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxPaginationModule } from 'ngx-pagination';
import { ApprovalMatrixftilterPipe } from 'src/app/_helpers/ApprovalMatrix-filter';


@NgModule({
  declarations: [
    ApprovalMatrixListComponent,
    AddUpdateApprovalMatrixComponent,
    ViewApprovalMatrixComponent,
    ApprovalMatrixftilterPipe,
  ],
  imports: [
    CommonModule,
    ApprovalMatrixRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),


        NgxPaginationModule,
        FormsModule
  ]
})
export class ApprovalMatrixModule { }
