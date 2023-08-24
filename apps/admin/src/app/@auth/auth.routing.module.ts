import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminLogoutComponent } from './logout/logout.component';

export const routes: Routes = [
  {
    path: 'auth/login',
    component: LoginComponent,
  },
  {
    path: 'auth/logout',
    component: AdminLogoutComponent,
  },
];
