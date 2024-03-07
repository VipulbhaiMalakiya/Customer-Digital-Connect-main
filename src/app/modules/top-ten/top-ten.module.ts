import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopTenRoutingModule } from './top-ten-routing.module';
import { TopTenComponent } from './top-ten.component';


@NgModule({
  declarations: [
    TopTenComponent
  ],
  imports: [
    CommonModule,
    TopTenRoutingModule
  ]
})
export class TopTenModule { }
