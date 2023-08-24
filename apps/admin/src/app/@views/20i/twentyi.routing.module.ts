import { TwentyiDashoardComponent } from './twentyi-dashoard/twentyi-dashoard.component';

export const TWENTYI_ROUTES = [
  {
    path: '',
    component: TwentyiDashoardComponent,
  },
  {
    path: '**',
    redirectTo: '/20i',
  },
];
