import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListWorkflowComponent } from './pages/list-workflow/list-workflow.component';


const routes: Routes = [
  { path: '', component: ListWorkflowComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkflowRoutingModule { }
