import { Routes } from '@angular/router';

import { APP_ROUTES } from './@routes/app.routes';

export const appRoutes: Routes = [
  {
    path: '',
    children: APP_ROUTES,
  },
];
