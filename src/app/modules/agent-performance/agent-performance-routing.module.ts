import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgentPerformanceComponent } from './pages/agent-performance/agent-performance.component';

const routes: Routes = [{ path: '', component: AgentPerformanceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentPerformanceRoutingModule { }
