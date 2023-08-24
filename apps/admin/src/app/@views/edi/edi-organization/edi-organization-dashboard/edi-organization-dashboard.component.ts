import { Component, OnDestroy } from '@angular/core';
import {
  faAdd,
  faReceipt,
  faSync,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngxs/store';
import { EdiOrganization } from '@play.app/types/Edi/EdiOrganization';
import { BadRequestResponse } from '@play.app/types/Response/BadRequestResponse';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { GetEdiOrganizations } from '../../../../@store/Actions/edi.actions';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
@Component({
  selector: 'play-app-admin-edi-organization-dashboard',
  templateUrl: './edi-organization-dashboard.component.html',
  styleUrls: ['./edi-organization-dashboard.component.scss'],
})
export class EdiOrganizationDashboardComponent implements OnDestroy {
  //Icons FontAwesome
  faReceipt = faReceipt;
  faAdd = faAdd;
  faTrash = faTrash;
  faSync = faSync;
  faArrowLeft = faArrowLeft;

  ediOrganizations: EdiOrganization[] = []; //all ediOrganizations
  options: string[] = []; // Names of Organizations
  showAddEdiOrganizationForm = false; //show/hide add ediOrganization form
  showEditOrganizationForm = false; //show/hide add ediOrganization form
  showDeleteOrganizationForm = false; //show/hide ediOrganization form
  activeTab = ''; //current active tab
  showForm = false;
  loading = false; //to display loading state

  subscription: Subscription | undefined; //to manage subscription

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(
    private store: Store,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.getEdiOrganizations(1, 1000); //get all edi organizations when page loads
  }

  getEdiOrganizations(page: number, pageSize: number) {
    //function to load all ediOrganizations
    try {
      this.loading = true; //set loading to true
      this.subscription = this.store //dispatch action to get all ediOrganizations
        .dispatch(new GetEdiOrganizations({ page: page, pageSize: pageSize }))
        .subscribe({
          next: (response) => {
            //if data load sucessfully, initialize table with data
            this.ediOrganizations = response.edi.ediOrganizations;

            this.options = response.edi.ediOrganizations.map(
              (org: any) => org.name
            ); // all names of organizations
          },

          error: (err) => {
            //if error occurs, display error message
            if (err.status === 400) {
              const badRequestResponse: BadRequestResponse = err.error;
              this.toastr.error();
              this.loading = false;
            } else {
              throw err; //if error is not 400, throw error
            }
          },
          complete: () => {
            //if all good show toast message and set loading to false
            this.loading = false;
            this.toastr.success('Edi Organizations fetched successfully');
          },
        });
    } catch (err) {
      console.log(err);
      this.loading = false;
    }
  }

  showAddForm() {
    //show add ediOrganization form
    this.showAddEdiOrganizationForm = true;
    this.showDeleteOrganizationForm = false;
    this.showEditOrganizationForm = false;
    this.activeTab = 'create-org';
  }

  showEditForm() {
    this.showAddEdiOrganizationForm = false;
    this.showDeleteOrganizationForm = false;
    this.activeTab = 'edit-org';
    this.showEditOrganizationForm = true;
  }

  showDeleteForm() {
    this.showAddEdiOrganizationForm = false;
    this.showEditOrganizationForm = false;
    this.activeTab = 'delete-org';
    this.showDeleteOrganizationForm = true;
  }

  goBack() {
    this.activeTab = '';
    this.showAddEdiOrganizationForm = false;
    this.showDeleteOrganizationForm = false;
    this.showEditOrganizationForm = false;
    this.router.navigate(['/edi/organizations']);

    this.showForm = false;
  }
  ngOnDestroy(): void {
    //destroy subscription
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
