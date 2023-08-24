import { Component } from '@angular/core';
import { faAdd, faSync, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngxs/store';
import { EdiVariable } from '@play.app/types/Edi/EdiVariable';
import { BadRequestResponse } from '@play.app/types/Response/BadRequestResponse';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { GetEdiVariables } from '../../../../@store/Actions/edi.actions';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
@Component({
  selector: 'play-app-admin-edi-variable-dashboard',
  templateUrl: './edi-variable-dashboard.component.html',
  styleUrls: ['./edi-variable-dashboard.component.scss'],
})
export class EdiVariableDashboardComponent {
  showForm = false; //show update form only if we choose a varaible that exists
  ediVariables: EdiVariable[] = [];
  variableOptions: string[] = []; //all title variables
  activeTab = '';
  faAdd = faAdd;
  faSync = faSync;
  faTrash = faTrash;
  faArrowLeft = faArrowLeft;
  loading = false; //to display loading state
  subscription: Subscription | undefined; //to manage subscription

  showAddEdiVariableForm = false; //to show/hide add form
  showEditEdiVariableForm = false; //to show/hide edit form
  showDeleteEdiVariableForm = false; //to show/hide delete form
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(
    private store: Store,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.getEdiVariables(1, 1000);
  }

  //get all edi variables
  getEdiVariables(page: number, pageSize: number) {
    try {
      this.loading = true;
      this.subscription = this.store
        .dispatch(new GetEdiVariables({ page: page, pageSize: pageSize }))
        .subscribe({
          next: (res) => {
            this.ediVariables = res.edi.ediVariables;
            this.variableOptions = res.edi.ediVariables.map(
              (variable: any) => variable.title
            );
          },
          error: (err) => {
            if (err.status === 400) {
              const badRequestResponse: BadRequestResponse = err.error;
              this.toastr.error();
              this.loading = false;
            } else {
              throw err; //if error is not 400, throw error
            }
          },
          complete: () => {
            this.loading = false;
            this.toastr.success('Edi Variables loaded successfully');
          },
        });
    } catch (error) {
      console.log(error);
      this.loading = false;
    }
  }

  //Functions when to show forms on click of buttons
  showAddForm() {
    this.showAddEdiVariableForm = true;
    this.showDeleteEdiVariableForm = false;
    this.showEditEdiVariableForm = false;
    this.activeTab = 'create-variable';
  }

  showEditForm() {
    this.showAddEdiVariableForm = false;
    this.showEditEdiVariableForm = true;
    this.showDeleteEdiVariableForm = false;
    this.activeTab = 'edit-variable';
  }

  showDeleteForm() {
    this.showAddEdiVariableForm = false;
    this.showDeleteEdiVariableForm = true;
    this.showEditEdiVariableForm = false;
    this.activeTab = 'delete-variable';
  }

  goBack() {
    this.activeTab = '';
    this.showAddEdiVariableForm = false;
    this.showDeleteEdiVariableForm = false;
    this.showEditEdiVariableForm = false;
    this.showForm = false;
    this.router.navigate(['/edi/variables']);
  }

  ngOnDestroy(): void {
    //destroy subscription
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
