import { agentperformanceftilterPipe } from './../../_helpers/agent-performance-filter';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentPerformanceRoutingModule } from './agent-performance-routing.module';
import { AgentPerformanceComponent } from './pages/agent-performance/agent-performance.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    AgentPerformanceComponent,
    agentperformanceftilterPipe
  ],
  imports: [
    CommonModule,
    AgentPerformanceRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,

  ]
})
export class AgentPerformanceModule { }
