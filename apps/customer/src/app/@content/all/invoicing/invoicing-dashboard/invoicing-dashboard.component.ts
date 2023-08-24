import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { PylonInvoice } from '@play.app/types/Pylon/PylonInvoice';
import { GetPylonInvoices } from 'apps/customer/src/app/@store/Actions/pylon.actions';
import { Subscription } from 'rxjs';
import { faEuroSign, faPercentage } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'play-app-invoicing-dashboard',
  templateUrl: './invoicing-dashboard.component.html',
  styleUrls: ['./invoicing-dashboard.component.scss'],
})
export class InvoicingDashboardComponent implements OnInit {
  invoices: PylonInvoice[] | undefined = undefined;
  loading = false;
  faEuroSign = faEuroSign;
  faPercentage = faPercentage;
  invoiceSubscription: Subscription | undefined;
  showInvoice = false;
  invoice: PylonInvoice | undefined;
  show_invoices_table = false;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(
    private store: Store,
    private cdr: ChangeDetectorRef,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.getPylonInvoices(); //get all PylonInvoices
  }

  getPylonInvoices() {
    //function to refresh data to table
    //get auth.Id from store\
    this.showInvoice = false;
    const id = localStorage.getItem('auth.id')?.replace(/['"]+/g, '');
    this.loading = true;
    //get invoices from store
    this.invoiceSubscription = this.store
      .dispatch(
        new GetPylonInvoices({
          page: 1,
          pageSize: 100,
          customer_Id: id ?? '',
        })
      )
      .subscribe({
        next: (response) => {
          this.invoices = response.pylon.pylonInvoices;
        },
        error: (error) => {
          console.log(error);
          this.toaster.error('Error while getting invoices');
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
          this.show_invoices_table = true;
        },
      });
  }

  viewInvoice(invoice: PylonInvoice) {
    this.showInvoice = true;
    this.invoice = invoice;
  }

  refresh() {
    //chind component emit this function
    this.getPylonInvoices();
  }
}
