import { Routes } from '@angular/router';
import { AuthGuard } from '../@auth/auth.guard';
import { ContentComponent } from './content.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: '',
    canActivate: [AuthGuard],
    component: ContentComponent,
    children: [
      {
        path: 'user',
        loadChildren: () =>
          import('./all/profile/profile.module').then((m) => m.ProfileModule),
      },
      {
        path: 'edi',
        loadChildren: () =>
          import('./all/edi/edi.module').then((m) => m.EdiModule),
      },
      {
        path: 'invoices',
        loadChildren: () =>
          import('./all/invoicing/invoicing.module').then(
            (m) => m.InvoicingModule
          ),
      },
    ],
  },
];
