import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefoultComponent } from './_layouts/defoult/defoult.component';
import { LoginComponent } from './_layouts/login/login.component';
import { ForgotPasswordComponent } from './_layouts/forgot-password/forgot-password.component';
import { SignUpComponent } from './_layouts/sign-up/sign-up.component';
import { AuthGaurdGuard } from './_helpers/auth-gaurd.guard';
import { ChatComponent } from './modules/chat/pages/chat/chat.component';
import { ResetPasswordComponent } from './_layouts/reset-password/reset-password.component';
import { NotFoundComponent } from './_layouts/not-found/not-found.component';
import { CreateWorkflowComponent } from './modules/workflow/components/create-workflow/create-workflow.component';
import { InboxLayoutComponent } from './_layouts/inbox-layout/inbox-layout.component';

const routes: Routes = [
  {
    path: '',
    component: InboxLayoutComponent,
    canActivate: [AuthGaurdGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./modules/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'orders',
        loadChildren: () =>
          import('./modules/product-detail/product-detail.module').then(
            (m) => m.ProductDetailModule
          ),
      },
      {
        path: 'ordersList',
        loadChildren: () =>
          import('./modules/orders/orders.module').then((m) => m.OrdersModule),
      },
      {
        path: 'orders/:phone',
        loadChildren: () =>
          import('./modules/orders-phone/orders-phone.module').then(
            (m) => m.OrdersPhoneModule
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./modules/profile/profile.module').then(
            (m) => m.ProfileModule
          ),
      },
      {
        path: 'ticket',
        loadChildren: () =>
          import('./modules/ticket/ticket.module').then((m) => m.TicketModule),
      },
      {
        path: 'assigned-ticket-list',
        loadChildren: () =>
          import('./modules/assigne-ticket/assigne-ticket.module').then(
            (m) => m.AssigneTicketModule
          ),
      },
      {
        path: 'department-tickets',
        loadChildren: () =>
          import('./modules/depatment-ticket/depatment-ticket.module').then(
            (m) => m.DepatmentTicketModule
          ),
      },
      {
        path: 'inbox',
        loadChildren: () =>
          import('./modules/chat/chat.module').then((m) => m.ChatModule),
      },
      // { path: 'products', loadChildren: () => import('./modules/product-detail/product-detail.module').then(m => m.ProductDetailModule) },
    ],
  },
  {
    path: 'admin',
    component: InboxLayoutComponent,
    canActivate: [AuthGaurdGuard],
    children: [
      {
        path: 'master',
        children: [
          {
            path: 'company',
            loadChildren: () =>
              import('./modules/company-master/company-master.module').then(
                (m) => m.CompanyMasterModule
              ),
          },
          {
            path: 'rooms',
            loadChildren: () =>
              import('./modules/rooms/rooms.module').then((m) => m.RoomsModule),
          },

          {
            path: 'department',
            loadChildren: () =>
              import(
                './modules/department-master/department-master.module'
              ).then((m) => m.DepartmentMasterModule),
          },
          {
            path: 'user',
            loadChildren: () =>
              import('./modules/user-master/user-master.module').then(
                (m) => m.UserMasterModule
              ),
          },
          {
            path: 'roles-permissions',
            loadChildren: () =>
              import(
                './modules/roles-permissions/roles-permissions.module'
              ).then((m) => m.RolesPermissionsModule),
          },
          {
            path: 'approval-matrix',
            loadChildren: () =>
              import('./modules/approval-matrix/approval-matrix.module').then(
                (m) => m.ApprovalMatrixModule
              ),
          },

          {
            path: 'approval-matrix',
            loadChildren: () =>
              import('./modules/approval-matrix/approval-matrix.module').then(
                (m) => m.ApprovalMatrixModule
              ),
          },
          {
            path: 'customers',
            loadChildren: () =>
              import('./modules/customers/customers.module').then(
                (m) => m.CustomersModule
              ),
          },
          {
            path: 'category-list',
            loadChildren: () =>
              import('./modules/category-list/category-list.module').then(
                (m) => m.CategoryListModule
              ),
          },
          {
            path: 'service-title-list',
            loadChildren: () =>
              import(
                './modules/service-title-list/service-title-list.module'
              ).then((m) => m.ServiceTitleListModule),
          },
          {
            path: 'subcategory-list',
            loadChildren: () =>
              import('./modules/subcategory-list/subcategory-list.module').then(
                (m) => m.SubcategoryListModule
              ),
          },
          {
            path: 'issue',
            loadChildren: () =>
              import('./modules/issue/issue.module').then((m) => m.IssueModule),
          },
          {
            path: 'SLA-Timelines',
            loadChildren: () =>
              import('./modules/slatimelines/slatimelines.module').then(
                (m) => m.SLATimelinesModule
              ),
          },
          {
            path: 'product-category',
            loadChildren: () =>
              import('./modules/product-category/product-category.module').then(
                (m) => m.ProductCategoryModule
              ),
          },
          {
            path: 'products',
            loadChildren: () =>
              import('./modules/product/product.module').then(
                (m) => m.ProductModule
              ),
          },
          {
            path: 'labels',
            loadChildren: () =>
              import('./modules/label-master/label-master.module').then(
                (m) => m.LabelMasterModule
              ),
          },
          {
            path: 'tables',
            loadChildren: () =>
              import('./modules/tables/tables.module').then(
                (m) => m.TablesModule
              ),
          },
          {
            path: 'templates',
            loadChildren: () =>
              import('./modules/templates/templates.module').then(
                (m) => m.TemplatesModule
              ),
          },
          {
            path: 'quick-reply',
            loadChildren: () =>
              import('./modules/quick-replay/quick-replay.module').then(
                (m) => m.QuickReplayModule
              ),
          },
          {
            path: 'custom-reply',
            loadChildren: () =>
              import('./modules/custom-reply/custom-reply.module').then(
                (m) => m.CustomReplyModule
              ),
          },
        ],
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./modules/profile/profile.module').then(
            (m) => m.ProfileModule
          ),
      },
      {
        path: 'inbox',

        loadChildren: () =>
          import('./modules/chat/chat.module').then((m) => m.ChatModule),
      },
      {
        path: 'ticket',
        loadChildren: () =>
          import('./modules/ticket/ticket.module').then((m) => m.TicketModule),
      },
      {
        path: 'assigned-ticket-list',
        loadChildren: () =>
          import('./modules/assigne-ticket/assigne-ticket.module').then(
            (m) => m.AssigneTicketModule
          ),
      },
      {
        path: 'orders',
        loadChildren: () =>
          import('./modules/product-detail/product-detail.module').then(
            (m) => m.ProductDetailModule
          ),
      },
      {
        path: 'ordersList',
        loadChildren: () =>
          import('./modules/orders/orders.module').then((m) => m.OrdersModule),
      },
      {
        path: 'orders/:phone',
        loadChildren: () =>
          import('./modules/orders-phone/orders-phone.module').then(
            (m) => m.OrdersPhoneModule
          ),
      },
      {
        path: 'sla-reports',
        loadChildren: () =>
          import('./modules/sla/sla.module').then((m) => m.SLAModule),
      },
      {
        path: 'workflow',
        loadChildren: () =>
          import('./modules/workflow/workflow.module').then(
            (m) => m.WorkflowModule
          ),
      },
      {
        path: 'chat-report',
        loadChildren: () =>
          import('./modules/chat-report/chat-report.module').then(
            (m) => m.ChatReportModule
          ),
      },
      {
        path: 'chat-histroy',
        loadChildren: () =>
          import('./modules/chat-history-reort/chat-history-reort.module').then(
            (m) => m.ChatHistoryReortModule
          ),
      },
      { path: 'chat-history-dept', loadChildren: () => import('./modules/chathistoryreportcount/chathistoryreportcount.module').then(m => m.ChathistoryreportcountModule) },
      { path: 'active-room-number', loadChildren: () => import('./modules/activecustomerwithroomnumber/activecustomerwithroomnumber.module').then(m => m.ActivecustomerwithroomnumberModule) },
      { path: 'happy-customer', loadChildren: () => import('./modules/happycustomer/happycustomer.module').then(m => m.HappycustomerModule) },
      { path: 'repeated-customer', loadChildren: () => import('./modules/repeated-customer/repeated-customer.module').then(m => m.RepeatedCustomerModule) },
      { path: 'escalation-depaetment-wise-report', loadChildren: () => import('./modules/escalation-depaetment-wise-report/escalation-depaetment-wise-report.module').then(m => m.EscalationDepaetmentWiseReportModule) },
      { path: 'top-ten', loadChildren: () => import('./modules/top-ten/top-ten.module').then(m => m.TopTenModule) },

      {
        path: 'overview',
        loadChildren: () =>
          import('./modules/analytics/analytics.module').then(
            (m) => m.AnalyticsModule
          ),
      },

      {
        path: 'reservation-table',
        loadChildren: () =>
          import('./modules/reservation-table/reservation-table.module').then(
            (m) => m.ReservationTableModule
          ),
      },

      {
        path: 'agent-performance',
        loadChildren: () =>
          import('./modules/agent-performance/agent-performance.module').then(
            (m) => m.AgentPerformanceModule
          ),
      },

      {
        path: 'workflow/create-workflow',
        component: CreateWorkflowComponent,
      },
      {
        path: 'permissions',
        loadChildren: () =>
          import('./modules/permissions/permissions.module').then(
            (m) => m.PermissionsModule
          ),
      },

      {
        path: 'inbox/:id',
        component: ChatComponent,
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./modules/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'reset-password/:token', component: ResetPasswordComponent },

  { path: '**', component: NotFoundComponent },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
