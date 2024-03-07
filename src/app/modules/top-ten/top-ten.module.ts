import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopTenRoutingModule } from './top-ten-routing.module';
import { TopTenComponent } from './top-ten.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../shared/shared.module';
import { top10Pipe } from 'src/app/_helpers/top-10.filter.ts.pipe';


@NgModule({
  declarations: [
    TopTenComponent,
    top10Pipe
  ],
  imports: [
    CommonModule,
    TopTenRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class TopTenModule { }
