import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabelMasterRoutingModule } from './label-master-routing.module';
import { LabelsListComponent } from './pages/labels-list/labels-list.component';
import { LabelAddEditeComponent } from './components/label-add-edite/label-add-edite.component';
import { LabelViewComponent } from './components/label-view/label-view.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../shared/shared.module';
import { labelFilterPipe } from 'src/app/_helpers/label-filter';
@NgModule({
  declarations: [
    LabelsListComponent,
    LabelAddEditeComponent,
    LabelViewComponent,
    labelFilterPipe
  ],
  imports: [
    CommonModule,
    LabelMasterRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FormsModule
  ]
})
export class LabelMasterModule { }
