export interface WhmcsDomain {
  id: number;
  userid: number;
  orderid: number;
  regtype: string;
  domainname: string;
  registrar: string;
  regperiod: number;
  firstpaymentamount: string;
  recurringamount: string;
  paymentmethod: string;
  paymentmethodname: string;
  regdate: string;
  expirydate: string;
  nextduedate: string;
  status: string;
  subscriptionid: string;
  promoid: number;
  dnsmanagement: number;
  emailforwarding: number;
  idprotection: number;
  donotrenew: number;
  notes: string;
}
