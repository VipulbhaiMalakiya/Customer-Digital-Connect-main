import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuickReplayRoutingModule } from './quick-replay-routing.module';
import { AddEditeQuickReplayComponent } from './components/add-edite-quick-replay/add-edite-quick-replay.component';
import { ViewQuickReplayComponent } from './components/view-quick-replay/view-quick-replay.component';
import { QuickReplayComponent } from './pages/quick-replay/quick-replay.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../shared/shared.module';
import { RepalyFilterPipe } from 'src/app/_helpers/quick-replay-filter';


@NgModule({
  declarations: [
    QuickReplayComponent,
    AddEditeQuickReplayComponent,
    ViewQuickReplayComponent,
    RepalyFilterPipe
  ],
  imports: [
    CommonModule,
    QuickReplayRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FormsModule
  ]
})
export class QuickReplayModule { }
