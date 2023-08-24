import { MailingDashboardComponent } from './mailing-dashboard/mailing-dashboard.component';
import { MailingTemplateEditorComponent } from './mailing-template-editor/mailing-template-editor.component';

export const MAILING_ROUTES = [
  {
    path: '',
    component: MailingDashboardComponent,
  },
  {
    path: 'editor',
    component: MailingTemplateEditorComponent,
  },
  {
    path: 'editor/:id',
    component: MailingTemplateEditorComponent,
  },
  {
    path: 'editor/:id/duplicate',
    component: MailingTemplateEditorComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
