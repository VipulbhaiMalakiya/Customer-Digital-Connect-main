import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { MyticketComponent } from './pages/myticket/myticket.component';
import { AssigntomeComponent } from './pages/assigntome/assigntome.component';

const routes: Routes = [
  { path: '', component: UserDashboardComponent },
  { path: 'v1', component: AdminDashboardComponent },
  { path: 'myTcket', component: MyticketComponent },
  { path: 'Assign-to-me', component: AssigntomeComponent }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

