import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import {
  faAdd,
  faReceipt,
  faSync,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { EdiModel } from '@play.app/types/Edi/EdiModel';
import { Subscription } from 'rxjs';
import {
  GetEdiModels,
  GetEdiOrganizations,
} from '../../../../@store/Actions/edi.actions';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { BadRequestResponse } from '@play.app/types/Response/BadRequestResponse';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'play-app-admin-edi-model-dashboard',
  templateUrl: './edi-model-dashboard.component.html',
  styleUrls: ['./edi-model-dashboard.component.scss'],
})
export class EdiModelDashboardComponent implements OnDestroy, OnInit {
  activeTab = ''; //when use clicks to create model activate this div
  //Icons font awesome
  faAdd = faAdd;
  faTrash = faTrash;
  faSync = faSync;
  faReceipt = faReceipt;
  ediModel: EdiModel | undefined;
  faArrowLeft = faArrowLeft; //icon to go back to table
  ediModels: EdiModel[] = [];
  show_message = false;
  message_text = '';
  options: string[] = []; // Names of Organization that model refer to (foreign key)
  modelOptions: string[] = []; //Names Of Models that we want to edit
  showDeleteModelForm = false;
  showAddModelForm = false; //when to show addmodel form
  showUpdateModelForm = false; //when to show updatemodel form
  loading = false; //boolean to show loading state
  subscription: Subscription | undefined; //to destroy subscription after request

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(
    private store: Store,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.getEdiModels(1, 1000); //get edi models when load page to display them
  }

  ngOnInit(): void {
    this.store //get all Edi Organizations to display theme to autocomplete field
      .dispatch(new GetEdiOrganizations({ page: 1, pageSize: 1000 }))
      .subscribe((res) => {
        this.options = res.edi.ediOrganizations.map((org: any) => org.name); //mapping object to get only names
      });
  }

  //function to get edi models
  getEdiModels(page: number, pageSize: number) {
    //
    try {
      this.loading = true; //set loading to true
      this.subscription = this.store
        .dispatch(new GetEdiModels({ page: page, pageSize: pageSize }))
        .subscribe({
          next: (response) => {
            this.ediModels = response.edi.ediModels; //get edi models

            this.modelOptions = response.edi.ediModels.map(
              (model: any) => model.title
            ); //mapping object to get only names
          },
          error: (err) => {
            if (err.status === 400) {
              const badRequestResponse: BadRequestResponse = err.error;
              this.toastr.error();
              this.loading = false;
            } else {
              throw err;
            }
          },

          complete: () => {
            this.loading = false;
            this.toastr.success('Edi Models fetched successfully'); //show toastr message
          },
        });
    } catch (error) {
      console.log(error);

      this.show_message = true;
      this.message_text = 'Something went wrong';
    } finally {
      //set loading to false after 700 ms
      setTimeout(() => {
        this.loading = false;
      }, 700);
    }
  }

  //function to show add model form
  showModelForm() {
    //show form to create model
    this.showAddModelForm = true; //boolean to show form and hide mat-table
    this.showDeleteModelForm = false; //hide delete form
    this.activeTab = 'create-model'; //active tab when clicks to div
    this.showUpdateModelForm = false; //hide update form
  }

  showUpdateForm() {
    this.showAddModelForm = false; //hiden add from
    this.showDeleteModelForm = false; //hide delete form
    this.activeTab = 'update-model'; //make active update div
    this.showUpdateModelForm = true; //show update form when user clicks to an model
  }

  showDeleteForm() {
    this.showAddModelForm = false; //hide add form if is active
    this.showUpdateModelForm = false; //hide update form is active
    this.showDeleteModelForm = true; //hide delete form
    this.activeTab = 'delete-model'; //make active delete div
  }
  goBack() {
    //when we go back to table reset all booleans and show table
    this.activeTab = '';
    this.showAddModelForm = false;
    this.showDeleteModelForm = false;
    this.showUpdateModelForm = false;

    this.router.navigate(['/edi/models']);
  }

  ngOnDestroy(): void {
    //destroy subscription
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
