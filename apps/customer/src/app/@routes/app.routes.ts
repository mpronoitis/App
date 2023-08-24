import { Routes } from '@angular/router';
import { NotFoundComponent } from '../@errors/not-found/not-found.component';

export const app_routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../@auth/auth.module').then((m) => m.AuthModule),
  },

  {
    path: '',
    loadChildren: () =>
      import('../@content/content.module').then((m) => m.ContentModule),
  },

  {
    path: '**',
    component: NotFoundComponent,
  },
];
