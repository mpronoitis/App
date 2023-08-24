import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Observable, startWith, Subscription } from 'rxjs';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { AddEdiCredit } from '../../../../@store/Actions/edi.actions';
import { EdiCredit } from '@play.app/types/Edi/EdiCredit';
import { BadRequestResponse } from '@play.app/types/Response/BadRequestResponse';
@Component({
  selector: 'play-app-edi-credit-add',
  templateUrl: './edi-credit-add.component.html',
  styleUrls: ['./edi-credit-add.component.scss'],
})
export class EdiCreditAddComponent implements OnInit, OnDestroy {
  //Form to add connection
  addForm = new FormGroup({
    //amount of credit
    amount: new FormControl('', [Validators.required]),
  });
  //Controlls of foreign keys to display
  customerControl = new FormControl('');
  //Filtering to available options when user clicks to autocomplete
  customerFilteredOptions: Observable<string[]> | undefined;

  loading = false;
  faAdd = faAdd;
  subscription: Subscription | undefined; //to destroy subscription after request

  //Available options for foreign keys passing from parent component(edi-credit-dashboard
  @Input() customerOptions: string[] = [];
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
  //function to addEdiCredit
  addEdiCredit(customerControl: FormControl) {
    try {
      this.loading = true;
      if (this.addForm.invalid || customerControl.value === '') {
        this.toastr.error('Please fill all fields');
        this.loading = false;
        return;
      }
      //if form is valid and we have selected customer
      //we can add new edi credit
      //make object EdiCredit

      //find customerId by customer name
      const customer_Id = this.store
        .selectSnapshot((state) => state.users.users)
        .find((user: any) => user.username === customerControl.value).id;

      //create ediCredit
      const ediCredit: EdiCredit = {
        id: '00000000-0000-0000-0000-000000000000',
        amount: this.addForm.value.amount || '',
        customerId: customer_Id,
      };

      //dispatch action to add new edi credit
      this.subscription = this.store
        .dispatch(new AddEdiCredit({ ediCredit }))
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
            this.addForm.reset(); //reset form
            this.customerControl.patchValue(''); //reset customerControl
          }
        );
    } catch (error) {
      this.toastr.error();
      this.loading = false;
    }
  }

  ngOnDestroy(): void {
    //destroy subscription
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
