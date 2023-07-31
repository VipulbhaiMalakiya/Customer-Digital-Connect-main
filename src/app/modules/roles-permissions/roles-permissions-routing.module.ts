import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolePermissionsListComponent } from './pages/role-permissions-list/role-permissions-list.component';

const routes: Routes = [{ path: '', component: RolePermissionsListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesPermissionsRoutingModule { }
