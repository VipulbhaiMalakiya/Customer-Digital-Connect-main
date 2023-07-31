import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserMasterRoutingModule } from './user-master-routing.module';
import { UserListComponent } from './pages/user-list/user-list.component';
import { AddUpdateUserComponent } from './components/add-update-user/add-update-user.component';
import { ViewUserComponent } from './components/view-user/view-user.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { UserFilterPipe } from 'src/app/_helpers/user-filter.pipe';

@NgModule({
  declarations: [
    UserListComponent,
    AddUpdateUserComponent,
    ViewUserComponent,
    UserFilterPipe
  ],
  imports: [
    CommonModule,
    UserMasterRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FormsModule
  ]
})
export class UserMasterModule { }
