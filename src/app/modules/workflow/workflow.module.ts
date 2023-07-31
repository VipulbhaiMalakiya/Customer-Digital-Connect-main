import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkflowRoutingModule } from './workflow-routing.module';
import { ListWorkflowComponent } from './pages/list-workflow/list-workflow.component';
import { CreateWorkflowComponent } from './components/create-workflow/create-workflow.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ListWorkflowComponent,
    CreateWorkflowComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    WorkflowRoutingModule
  ]
})
export class WorkflowModule { }
