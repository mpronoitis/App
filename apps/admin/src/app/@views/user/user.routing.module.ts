import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';

export const USER_ROUTES = [
  {
    path: '',
    component: UserDashboardComponent,
  },
  {
    path: '**',
    redirectTo: '/users',
  },
];
