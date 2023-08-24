import { NgModule } from '@angular/core';
import { MailingDashboardComponent } from './mailing-dashboard/mailing-dashboard.component';
import { SharedModule } from '../../@utils/shared.module';
import { RouterModule } from '@angular/router';
import { MAILING_ROUTES } from './mailing.routing.module';
import { MailingTemplateEditorComponent } from './mailing-template-editor/mailing-template-editor.component';
import { EmailTemplateDetailsDialogComponent } from '../../@dialogs/EmailTemplates/email-template-details-dialog/email-template-details-dialog.component';
import { MailingTemplatesTableComponent } from './mailing-templates-table/mailing-templates-table.component';

@NgModule({
  declarations: [
    MailingDashboardComponent,
    MailingTemplateEditorComponent,
    EmailTemplateDetailsDialogComponent,
    MailingTemplatesTableComponent,
  ],
  imports: [SharedModule, RouterModule.forChild(MAILING_ROUTES)],
  exports: [MailingTemplatesTableComponent],
  providers: [],
})
export class MailingModule {}
