import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import {
  faAddressCard,
  faReceipt,
  faTowerCell,
} from '@fortawesome/free-solid-svg-icons';
import { GetEdiDocumentCountReport } from 'apps/customer/src/app/@store/Actions/edi.actions';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'play-app-edi-dashboard',
  templateUrl: './edi-dashboard.component.html',
  styleUrls: ['./edi-dashboard.component.scss'],
})
export class EdiDashboardComponent {
  faReceipt = faReceipt;
  faTowerCell = faTowerCell;
  faAddressCard = faAddressCard;
  loading = false;
  message_text = '';
  activeTable = 'ediDocuments';
  single = [{ name: '', value: 0 }]; //data of chart edi
  ediDocumentReport: any;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(public store: Store, private toastr: ToastrService) {
    this.getDocumentCount();
  }

  /**
   * @summary Function to get document count for charting
   */
  getDocumentCount() {
    try {
      this.loading = true;
      //get auth.id from store
      const authId = this.store.selectSnapshot((state) => state.auth.id);
      this.store
        .dispatch(
          new GetEdiDocumentCountReport({
            startDate: '2023-01-01',
            endDate: '2023-12-31',
            customerId: authId,
            period: 'monthly',
          })
        )
        .subscribe({
          next: (result) => {
            this.ediDocumentReport = result.edi.ediDocumentCountReport;
            this.buildChartData();
            this.loading = false;
          },
          error: () => {
            this.toastr.error('Error getting document count');
          },
        });
    } catch {
      this.toastr.error();

      this.loading = false;
    }
  }

  /**
   * @summary Function to build the chart data
   */
  buildChartData() {
    //loop through the ediDocumentReport array
    this.ediDocumentReport.forEach(
      //push all months
      (element: { month: string; count: number }) => {
        this.single.push({ name: element.month, value: element.count }); //push data to chart edi
      }
    );
    //remove last element of single
    this.single.shift(); //remove first element of array
    //this.single.reverse(); //remove the first element of the array
  }
}
