export interface WhmcsOrder {
  id: number;
  ordernum: string;
  userid: number;
  contactid: number;
  requestor_id: number;
  admin_requestor_id: number;
  date: string;
  nameservers: string;
  transfersecret: any;
  renewals: string;
  promocode: string;
  promotype: string;
  promovalue: string;
  orderdata: string;
  amount: string;
  paymentmethod: string;
  invoiceid: number;
  status: string;
  ipaddress: string;
  fraudmodule: string;
  fraudoutput: string;
  notes: string;
  paymentmethodname: string;
  paymentstatus: string;
  name: string;
  currencyprefix: string;
  currencysuffix: string;
  frauddata: string;
  validationdata: string;
}