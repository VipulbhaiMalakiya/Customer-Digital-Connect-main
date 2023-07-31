import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SLATimelinesRoutingModule } from './slatimelines-routing.module';
import { SlatimelinesComponent } from './pages/slatimelines/slatimelines.component';
import { AddEditeSlatimelinesComponent } from './components/add-edite-slatimelines/add-edite-slatimelines.component';
import { ViewSlatimelinesComponent } from './components/view-slatimelines/view-slatimelines.component';
import { SharedModule } from "../shared/shared.module";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SLAFilterPipe } from 'src/app/_helpers/sla-filter.pipe';


@NgModule({
  declarations: [
    SlatimelinesComponent,
    AddEditeSlatimelinesComponent,
    ViewSlatimelinesComponent,
    SLAFilterPipe
  ],
  imports: [
    CommonModule,
    SLATimelinesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FormsModule
  ]
})
export class SLATimelinesModule { }
