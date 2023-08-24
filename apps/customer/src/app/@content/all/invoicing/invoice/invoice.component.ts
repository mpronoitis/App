import { Component, Input } from '@angular/core';
import { PylonInvoice } from '@play.app/types/Pylon/PylonInvoice';
import { faCubes, faEuroSign } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'play-app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
})
export class InvoiceComponent {
  @Input()
  invoice!: PylonInvoice;
  faEuroSign = faEuroSign;
  faCubes = faCubes;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
