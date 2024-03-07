import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EscallationLevelRoutingModule } from './escallation-level-routing.module';
import { EscallationLevelComponent } from './escallation-level.component';


@NgModule({
  declarations: [
    EscallationLevelComponent
  ],
  imports: [
    CommonModule,
    EscallationLevelRoutingModule
  ]
})
export class EscallationLevelModule { }
