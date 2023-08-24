import { Component, Input } from '@angular/core';
import { EmailTemplate } from '@play.app/types/Mailing/EmailTemplate';
import {
  faSave,
  faTimes,
  faMailForward,
} from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { EmailTemplateDetailsDialogComponent } from '../../../@dialogs/EmailTemplates/email-template-details-dialog/email-template-details-dialog.component';
import { EmailTemplateService } from '@play.app/services/EmailTemplates/EmailTemplate.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'play-app-mailing-template-editor',
  templateUrl: './mailing-template-editor.component.html',
  styleUrls: ['./mailing-template-editor.component.scss'],
})
export class MailingTemplateEditorComponent {
  @Input() id = '';
  template: EmailTemplate | undefined;
  duplicate = false;
  loading = false;
  //icons
  faSave = faSave;
  faTimes = faTimes;
  faMailForward = faMailForward;

  html = ``;
  editorConfig: AngularEditorConfig = {
    sanitize: false,
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
  };

  //eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(
    private dialog: MatDialog,
    private etService: EmailTemplateService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id') ?? '';
    //if route is /mailing/templates/:id/duplicate, duplicate the template
    if (this.activatedRoute.snapshot.url[2]?.path === 'duplicate') {
      this.duplicate = true;
    }

    //if id is not empty, fetch the template
    if (this.id && this.id !== '') {
      this.loading = true;
      const sub = this.etService.getTemplateById(this.id).subscribe({
        next: (res) => {
          this.template = res;
          this.html = this.template?.body ?? '';
        },
        error: (err) => {
          this.toastr.error('Error fetching template');
          console.log(err);
        },
        complete: () => {
          this.loading = false;
          sub.unsubscribe();
        },
      });
    }
  }

  /**
   * @summary Save the template
   */
  saveTemplate() {
    //show EmailTemplateDetailsDialogComponent and wait for the result
    this.dialog
      .open(EmailTemplateDetailsDialogComponent, {
        width: '20%',
        data: this.template,
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          //save the template
          //if no template was passed, create a new one
          if (!this.template) {
            this.template = {
              id: '',
              name: result.name,
              subject: result.subject,
              body: this.html,
              createdDate: new Date().toISOString(),
            };
          } else {
            //update the template
            this.template.name = result.name;
            this.template.subject = result.subject;
            this.template.body = this.html;
            if (this.duplicate) {
              this.template.id = '';
            }
          }
        } else {
          return;
        }

        if (this.template && this.template.id === '') {
          const sub = this.etService.addTemplate(this.template).subscribe({
            next: () => {
              this.toastr.success('Template saved successfully');
              //navigate to /mailing
              this.router.navigate(['/mailing']);
            },
            error: (err) => {
              this.toastr.error('Error saving template');
              console.log(err);
            },
            complete: () => {
              sub.unsubscribe();
            },
          });
        } else if (this.template && this.id !== '') {
          const sub = this.etService.updateTemplate(this.template).subscribe({
            next: () => {
              this.toastr.success('Template saved successfully');
              //navigate to /mailing
              this.router.navigate(['/mailing']);
            },
            error: (err) => {
              this.toastr.error('Error saving template');
              console.log(err);
            },
            complete: () => {
              sub.unsubscribe();
            },
          });
        }
      });
  }

  /**
   * Cancel the editing
   */
  cancel() {
    this.router.navigate(['/mailing']);
  }
}
