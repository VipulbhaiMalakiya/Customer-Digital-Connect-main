import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EscallationLevelComponent } from './escallation-level.component';

const routes: Routes = [{ path: '', component: EscallationLevelComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EscallationLevelRoutingModule { }
