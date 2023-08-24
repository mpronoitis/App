import { Component, OnInit, ViewChild } from '@angular/core';
import { EmailTemplateService } from '@play.app/services/EmailTemplates/EmailTemplate.service';
import { ToastrService } from 'ngx-toastr';
import { EmailTemplate } from '@play.app/types/Mailing/EmailTemplate';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
  faSync,
  faPlus,
  faEdit,
  faTrash,
  faCopy,
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'play-app-mailing-templates-table',
  templateUrl: './mailing-templates-table.component.html',
  styleUrls: ['./mailing-templates-table.component.scss'],
})
export class MailingTemplatesTableComponent implements OnInit {
  templates: EmailTemplate[] = [];
  loading = false;

  //table vars
  displayedColumns: string[] = ['name', 'subject', 'CreatedDate', 'actions'];
  dataSource!: MatTableDataSource<EmailTemplate>;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  //icons
  faSync = faSync;
  faPlus = faPlus;
  faEdit = faEdit;
  faTrash = faTrash;
  faCopy = faCopy;

  //eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(
    private etService: EmailTemplateService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchTemplates();
  }

  /**
   * @summary Fetch templates
   */
  fetchTemplates() {
    this.loading = true;
    const sub = this.etService.getTemplates(1, 1000).subscribe({
      next: (res) => {
        this.templates = res;
        setTimeout(
          () => (this.dataSource = new MatTableDataSource(this.templates))
        );
        setTimeout(() => (this.dataSource.paginator = this.paginator));
        setTimeout(() => (this.dataSource.sort = this.sort));
        this.toastr.success('Loaded ' + this.templates.length + ' templates');
        this.loading = false;
      },
      error: (err) => {
        this.toastr.error('Error loading templates');
        this.loading = false;
      },
      complete: () => {
        sub.unsubscribe();
      },
    });
  }

  /**
   * @summary Filter table
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   *  @summary Redirect to add template
   */
  addTemplate() {
    this.router.navigate(['/mailing/editor']);
  }

  /**
   *  @summary Redirect to edit template passing id
   *  @param id
   */
  editTemplate(id: string) {
    this.router.navigate(['/mailing/editor', id]);
  }

  /**
   * @summary Delete template
   * @param id
   */
  deleteTemplate(id: string) {
    //ask for confirmation
    if (confirm('Are you sure you want to delete this template?')) {
      const sub = this.etService.deleteTemplate(id).subscribe({
        next: (res) => {
          this.toastr.success('Template deleted');
          this.fetchTemplates();
        },
        error: (err) => {
          this.toastr.error('Error deleting template');
        },
        complete: () => {
          sub.unsubscribe();
        },
      });
    }
  }

  /**
   * @summary Duplicate template
   * @param id
   */
  duplicateTemplate(id: string) {
    this.router.navigate(['/mailing/editor', id, 'duplicate']);
  }
}
