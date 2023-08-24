import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { EdiVariable } from '@play.app/types/Edi/EdiVariable';
import { BadRequestResponse } from '@play.app/types/Response/BadRequestResponse';
import { AddEdiVariable } from 'apps/admin/src/app/@store/Actions/edi.actions';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'play-app-admin-edi-variable-add',
  templateUrl: './edi-variable-add.component.html',
  styleUrls: ['./edi-variable-add.component.scss'],
})
export class EdiVariableAddComponent implements OnDestroy {
  //Form to add variable
  addForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    placeholder: new FormControl('', [Validators.required]),
  });
  faAdd = faAdd;
  subscription: Subscription | undefined; //to manage subscription
  loading = false;
  @Output() refresh = new EventEmitter<void>(); //emit when we press refresh button
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private store: Store, private toastr: ToastrService) {}

  addEdiVariable() {
    try {
      this.loading = true;
      if (this.addForm.invalid) {
        this.toastr.error();
        this.loading = false;
        return;
      }
      //if all fields are completed

      //make object edivariable from form fields
      const ediVariable: EdiVariable = {
        id: '00000000-0000-0000-0000-000000000000',
        title: this.addForm.value.title || '',
        description: this.addForm.value.description || '',
        placeholder: this.addForm.value.placeholder || '',
      };
      this.subscription = this.store
        .dispatch(new AddEdiVariable({ ediVariable: ediVariable }))
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
            this.toastr.success('Edi Variable added successfully');
            this.addForm.reset(); //reset form
            this.refreshData(); //refresh edivariables
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
