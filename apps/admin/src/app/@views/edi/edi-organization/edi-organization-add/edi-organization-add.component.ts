import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { EdiOrganization } from '@play.app/types/Edi/EdiOrganization';
import { BadRequestResponse } from '@play.app/types/Response/BadRequestResponse';
import { AddEdiOrganization } from 'apps/admin/src/app/@store/Actions/edi.actions';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { faAdd } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'play-app-admin-edi-organization-add',
  templateUrl: './edi-organization-add.component.html',
  styleUrls: ['./edi-organization-add.component.scss'],
})
export class EdiOrganizationAddComponent implements OnDestroy {
  subscription: Subscription | undefined; //to destroy subscription after request
  faAdd = faAdd;
  @Output() refresh = new EventEmitter<void>(); //emit when we press refresh button
  loading = false;
  addForm = new FormGroup({
    name: new FormControl('', [Validators.required]),

    email: new FormControl('', [Validators.required, Validators.email]),
  });
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private store: Store, private toastr: ToastrService) {}

  addOrg() {
    //ad
    try {
      this.loading = true; //set loading to true
      if (this.addForm.invalid) {
        this.toastr.error();
        this.loading = false;
        return;
      }

      const ediOrganization: EdiOrganization = {
        name: this.addForm.value.name || '',
        email: this.addForm.value.email || '',
        id: '00000000-0000-0000-0000-000000000000',
      };
      this.subscription = this.store
        .dispatch(new AddEdiOrganization({ ediOrganization: ediOrganization }))
        .subscribe({
          next: (response) => {
            console.log(response);
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
            this.toastr.success('Organization added successfully');
            this.addForm.reset(); //reset form
            this.refreshData(); //get all edi organizations
          },
        });
    } catch (err) {
      console.log(err);
      this.loading = false;
    }
  }

  refreshData() {
    this.refresh.emit();
  }

  ngOnDestroy(): void {
    //destroy subscription
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
