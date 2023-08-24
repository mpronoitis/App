import { PylonInvoiceLine } from './PylonInvoiceLine';

export interface PylonInvoice {
  invoiceNumber: string;
  invoiceCode: string;
  invoiceDate: Date;
  paymentMethod: string;
  totalAmountNoTax: number;
  eipUrl: string;
  totalAmountWithTax: number;
  totalVat: number;
  customerTin: string;
  customerName: string;
  vatRegime: string;
  invoiceLines: PylonInvoiceLine[];
}
