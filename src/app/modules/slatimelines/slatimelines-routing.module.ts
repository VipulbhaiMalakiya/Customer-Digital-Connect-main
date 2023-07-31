import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SlatimelinesComponent } from './pages/slatimelines/slatimelines.component';

const routes: Routes = [{ path: '', component: SlatimelinesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SLATimelinesRoutingModule { }
