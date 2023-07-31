import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApprovalMatrixListComponent } from './pages/approval-matrix-list/approval-matrix-list.component';
const routes: Routes = [{ path: '', component: ApprovalMatrixListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApprovalMatrixRoutingModule { }
