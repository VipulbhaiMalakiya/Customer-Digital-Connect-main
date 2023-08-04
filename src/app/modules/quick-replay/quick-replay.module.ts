import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuickReplayRoutingModule } from './quick-replay-routing.module';
import { AddEditeQuickReplayComponent } from './components/add-edite-quick-replay/add-edite-quick-replay.component';
import { ViewQuickReplayComponent } from './components/view-quick-replay/view-quick-replay.component';
import { QuickReplayComponent } from './pages/quick-replay/quick-replay.component';


@NgModule({
  declarations: [
    QuickReplayComponent,
    AddEditeQuickReplayComponent,
    ViewQuickReplayComponent
  ],
  imports: [
    CommonModule,
    QuickReplayRoutingModule
  ]
})
export class QuickReplayModule { }
