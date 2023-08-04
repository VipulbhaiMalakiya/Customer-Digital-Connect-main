import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuickReplayComponent } from './pages/quick-replay/quick-replay.component';

const routes: Routes = [{ path: '', component: QuickReplayComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuickReplayRoutingModule { }
