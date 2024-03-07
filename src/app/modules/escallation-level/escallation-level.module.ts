import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EscallationLevelRoutingModule } from './escallation-level-routing.module';
import { EscallationLevelComponent } from './escallation-level.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../shared/shared.module';
import { eipipe } from 'src/app/_helpers/Escalation-Level.filter';


@NgModule({
  declarations: [
    EscallationLevelComponent,
    eipipe
  ],
  imports: [
    CommonModule,
    EscallationLevelRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FormsModule
  ]
})
export class EscallationLevelModule { }
