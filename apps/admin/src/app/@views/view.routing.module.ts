import { Routes } from '@angular/router';
import { AuthGuard } from '../@auth/auth.guard';
import { AdminViewComponent } from './view.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: '',
    canActivate: [AuthGuard],
    component: AdminViewComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },

      {
        path: 'edi',
        loadChildren: () => import('./edi/edi.module').then((m) => m.EdiModule),
      },
      {
        path: '20i',
        loadChildren: () =>
          import('./20i/twentyi.module').then((m) => m.TwentyiModule),
      },
      {
        path: 'pylon',
        loadChildren: () =>
          import('./pylon/pylon.module').then((m) => m.PylonModule),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./user/user.module').then((m) => m.UserModule),
      },
      {
        path: 'whmcs',
        loadChildren: () =>
          import('./whmcs/whmcs.module').then((m) => m.WhmcsModule),
      },
      {
        path: 'malwarebytes',
        loadChildren: () =>
          import('./malwarebytes/mbam.module').then((m) => m.MbamModule),
      },
      {
        path: 'contracting',
        loadChildren: () =>
          import('./contracting/contracting.module').then(
            (m) => m.ContractingModule
          ),
      },
      {
        path: 'mailing',
        loadChildren: () =>
          import('./mailing/mailing.module').then((m) => m.MailingModule),
      },
      {
        path: 'events',
        loadChildren: () =>
          import('./events/events.module').then((m) => m.EventsModule),
      },
    ],
  },
];
