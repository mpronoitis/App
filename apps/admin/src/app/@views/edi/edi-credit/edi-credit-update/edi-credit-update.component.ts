import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { map, Observable, startWith, Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  GetEdiCredit,
  UpdateEdiCredit,
} from '../../../../@store/Actions/edi.actions';
import { EdiCredit } from '@play.app/types/Edi/EdiCredit';
import { BadRequestResponse } from '@play.app/types/Response/BadRequestResponse';
@Component({
  selector: 'play-app-edi-credit-update',
  templateUrl: './edi-credit-update.component.html',
  styleUrls: ['./edi-credit-update.component.scss'],
})
export class EdiCreditUpdateComponent implements OnInit {
  faSync = faSync;
  loading = false;
  showUpdateForm = false;
  selectedEdiCredit: EdiCredit | undefined;
  subscription: Subscription | undefined; //to destroy subscription after dispatching action
  //Controll of foreign keys to display
  customerControl = new FormControl('');
  //Filtering to available options when user clicks to autocomplete
  customerFilteredOptions: Observable<string[]> | undefined;

  //Form to update ediCredit of a customer
  updateEdiCreditForm = new FormGroup({
    amount: new FormControl('', [Validators.required]),
  });
  @Input() customerOptions: string[] = []; // Available customers to select from
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private store: Store, private toastr: ToastrService) {}

  ngOnInit(): void {
    //filtering to available options when user clicks to autocomplete
    this.customerFilteredOptions = this.customerControl.valueChanges.pipe(
      //filtering to options base what we are typing
      //every type we typing checking for possible options
      startWith(''),
      map((value) => this.customerFilter(value || ''))
    );
  }

  private customerFilter(value: string): any {
    //filter base on what we searching
    const filterValue = value.toLowerCase();
    return this.customerOptions.filter((option) =>
      option.includes(filterValue)
    );
  }

  //function to get EdiCredit of a customer
  getEdiCredit(customerControl: FormControl) {
    //check if customerControl is empty
    if (customerControl.value === '') {
      this.toastr.error('Please select a customer to get credit');
      return;
    }
    //find customerId from state users
    const customerId = this.store
      .selectSnapshot((state) => state.users.users)
      .find((user: any) => user.username === customerControl.value).id;
    //take ediCredit of selected customer
    this.selectedEdiCredit = this.store.selectSnapshot((state) =>
      state.edi.ediCredits.find(
        (ediCredit: any) => ediCredit.customerId === customerId
      )
    );
    //if ediCredit is undefined that means we don't have ediCredit of this customer
    if (this.selectedEdiCredit === undefined) {
      this.toastr.error("This customer doesn't have any credit");
      return;
    }
    //if ediCredit is not undefined that means we have ediCredit of this customer
    //so we want to show update form
    if (this.selectedEdiCredit) {
      this.showUpdateForm = true;
      this.updateEdiCreditForm.patchValue({
        amount: this.selectedEdiCredit.amount,
      });
    }
  }

  //function to update ediCredit of a customer
  updateEdiCredit(customerControl: FormControl) {
    try {
      if (this.updateEdiCreditForm.invalid || customerControl.value === '') {
        this.toastr.error('Please fill all fields');
        return;
      }
      //find customerId from state users
      const customerId = this.store
        .selectSnapshot((state) => state.users.users)
        .find((user: any) => user.username === customerControl.value).id;
      //create updated EdiCredit
      const ediCredit: EdiCredit = {
        id: this.selectedEdiCredit?.id || '',
        customerId: customerId,
        amount: this.updateEdiCreditForm.value.amount || '',
      };

      this.subscription = this.store
        .dispatch(new UpdateEdiCredit({ ediCredit: ediCredit }))
        .subscribe(
          (res) => {
            console.log(res);
          },
          (err) => {
            if (err.status === 400) {
              const badRequestResponse: BadRequestResponse = err.error;
              this.toastr.error();
              this.loading = false;
            } else {
              throw err;
            }
          },
          () => {
            this.loading = false;
            this.updateEdiCreditForm.reset();
            this.customerControl.patchValue('');
            this.showUpdateForm = false;
          }
        );
    } catch (e) {
      console.log(e);
    }
  }

  ngOnDestroy(): void {
    //destroy subscription
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
