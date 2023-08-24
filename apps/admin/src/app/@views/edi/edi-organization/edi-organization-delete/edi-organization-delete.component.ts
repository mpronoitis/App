import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngxs/store';
import { BadRequestResponse } from '@play.app/types/Response/BadRequestResponse';
import { DeleteEdiOrganization } from 'apps/admin/src/app/@store/Actions/edi.actions';
import { ToastrService } from 'ngx-toastr';
import { map, Observable, startWith, Subscription } from 'rxjs';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'play-app-admin-edi-organization-delete',
  templateUrl: './edi-organization-delete.component.html',
  styleUrls: ['./edi-organization-delete.component.scss'],
})
export class EdiOrganizationDeleteComponent implements OnInit, OnDestroy {
  myControl = new FormControl('');
  filteredOptions: Observable<string[]> | undefined;
  faTrash = faTrash;
  loading = false;
  @Input() organizationNames: string[] = [];
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

  deleteOrg(control: FormControl) {
    try {
      this.loading = true; //set loading to true
      if (control.value === '') {
        this.toastr.error();
        return;
      }
      //find id of org that we want to delete
      const id = this.store.selectSnapshot((state) =>
        state.edi.ediOrganizations.find(
          (org: any) => org.name === control.value
        )
      ).id;
      //dispatch action to delete ediOrganization
      this.subscription = this.store
        .dispatch(new DeleteEdiOrganization({ id: id }))
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
            this.toastr.success('Organization deleted successfully');
            this.myControl.patchValue('');
            this.refreshData();
            //get all edi organizations
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
