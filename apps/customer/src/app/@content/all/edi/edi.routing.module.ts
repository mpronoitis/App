import { EdiDashboardComponent } from './edi-dashboard/edi-dashboard.component';
import { EdiProfileEditorComponent } from './edi-profile-editor/edi-profile-editor.component';

export const EDI_ROUTES = [
  {
    path: '',
    component: EdiDashboardComponent,
  },
  {
    path: 'profile-editor',
    component: EdiProfileEditorComponent,
  },
  {
    path: 'profile-editor/:id',
    component: EdiProfileEditorComponent,
  },
  {
    path: '**',
    redirectTo: '/edi',
  },
];
