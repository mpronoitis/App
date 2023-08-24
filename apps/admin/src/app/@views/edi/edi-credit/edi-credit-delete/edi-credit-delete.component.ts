import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith, Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngxs/store';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { EdiCredit } from '@play.app/types/Edi/EdiCredit';
import { DeleteEdiCredit } from '../../../../@store/Actions/edi.actions';
import { BadRequestResponse } from '@play.app/types/Response/BadRequestResponse';

@Component({
  selector: 'play-app-edi-credit-delete',
  templateUrl: './edi-credit-delete.component.html',
  styleUrls: ['./edi-credit-delete.component.scss'],
})
export class EdiCreditDeleteComponent implements OnInit, OnDestroy {
  loading = false;
  faTrash = faTrash;
  // formControl of customer names
  customerControl = new FormControl('');
  // available customers options
  customerFilteredOptions: Observable<string[]> | undefined;

  subscription: Subscription | undefined; //to destroy subscription after request

  @Input() customerOptions: string[] = []; //available customers that own credits
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

  deleteEdiCredit(customerControl: FormControl) {
    try {
      this.loading = true;
      //find customerId
      const customerId = this.store
        .selectSnapshot((state) => state.users.users)
        .find((user: any) => user.username === customerControl.value).id;
      //if all ok  find id of ediCredit
      const ediCreditId = this.store
        .selectSnapshot((state) => state.edi.ediCredits)
        .find((ediCredit: any) => ediCredit.customerId === customerId)?.id;

      if (customerControl.value === '') {
        this.toastr.error('Please select a customer');
        this.loading = false;
        return;
      }
      if (!ediCreditId || !customerId) {
        this.toastr.error('Selected customer does not have a credit');
        this.loading = false;
        return;
      }

      this.subscription = this.store
        .dispatch(new DeleteEdiCredit({ id: ediCreditId }))
        .subscribe(
          (res: any) => {
            console.log(res);
          },
          (err: any) => {
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
            this.customerControl.patchValue('');
          }
        );
    } catch (e) {
      this.loading = false;
      this.toastr.error();
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
