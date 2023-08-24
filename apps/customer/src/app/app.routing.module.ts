import { Routes } from '@angular/router';
import { app_routes } from './@routes/app.routes';

export const appRoutes: Routes = [
  {
    path: '',
    children: app_routes,
  },
];
