import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomsRoutingModule } from './rooms-routing.module';
import { RoomsComponent } from './pages/rooms/rooms.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../shared/shared.module';
import { RoomFilterPipe } from 'src/app/_helpers/roomfilter';
import { ViewRoomsComponent } from './components/view-rooms/view-rooms.component';
import { AddEditeRoomsComponent } from './components/add-edite-rooms/add-edite-rooms.component';


@NgModule({
  declarations: [
    RoomsComponent,
    RoomFilterPipe,
    ViewRoomsComponent,
    AddEditeRoomsComponent
  ],
  imports: [
    CommonModule,
    RoomsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FormsModule
  ]
})
export class RoomsModule { }
