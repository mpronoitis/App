import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { EdiOrganization } from '@play.app/types/Edi/EdiOrganization';
import { BadRequestResponse } from '@play.app/types/Response/BadRequestResponse';
import { UpdateEdiOrganization } from 'apps/admin/src/app/@store/Actions/edi.actions';
import { ToastrService } from 'ngx-toastr';
import { map, Observable, startWith, Subscription } from 'rxjs';
import { faSync } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'play-app-admin-edi-organization-update',
  templateUrl: './edi-organization-update.component.html',
  styleUrls: ['./edi-organization-update.component.scss'],
})
export class EdiOrganizationUpdateComponent implements OnInit, OnDestroy {
  myControl = new FormControl('');
  faSync = faSync;
  filteredOptions: Observable<string[]> | undefined;
  updateForm = new FormGroup({
    name: new FormControl('', [Validators.required]),

    email: new FormControl('', [Validators.required, Validators.email]),
  });
  @Input() organizationNames: string[] = [];
  showForm = false;
  loading = false;
  subscription: Subscription | undefined; //to destroy subscription after request
  @Output() refresh = new EventEmitter<void>(); //emit when we press refresh button
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private store: Store, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      //filtering to options base what we are typing
      //every type we typing checking for possible options
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: string): any {
    //filter base on what we searching
    const filterValue = value.toLowerCase();
    return this.organizationNames.filter((option) =>
      option.includes(filterValue)
    );
  }

  getOrg(control: FormControl) {
    //get an ediOrganization
    if (control.value === '') {
      this.toastr.error();
      return;
    }

    const ediOrganization = this.store.selectSnapshot((state) =>
      state.edi.ediOrganizations.find((org: any) => org.name === control.value)
    ); //patch form with org that we want to edit
    this.updateForm.patchValue({
      name: ediOrganization.name,
      email: ediOrganization.email,
    });
    this.showForm = true;
  }

  updateOrg(control: FormControl) {
    try {
      this.loading = true; //set loading to true
      if (this.updateForm.invalid) {
        this.toastr.error();
        return;
      }

      if (control.value === '') {
        this.toastr.error();
        this.loading = false;
        return;
      }
      //find if of org that we want to update
      const id = this.store.selectSnapshot((state) =>
        state.edi.ediOrganizations.find(
          (org: any) => org.name === control.value
        )
      ).id;

      const ediOrganization: EdiOrganization = {
        //make ediObject from values of form
        name: this.updateForm.value.name || '',
        email: this.updateForm.value.email || '',
        id: id,
      };
      //dispatch action to update ediOrganization
      this.subscription = this.store
        .dispatch(
          new UpdateEdiOrganization({ ediOrganization: ediOrganization })
        )
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
            this.toastr.success('Organization updated successfully');
            this.updateForm.reset(); //reset form
            this.myControl.patchValue(''); //reset form
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
