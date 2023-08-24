export interface WhmcsPurchasedProduct {
  id: number;
  clientid: number;
  orderid: number;
  ordernumber: string;
  pid: number;
  regdate: string;
  name: string;
  translated_name: string;
  groupname: string;
  translated_groupname: string;
  domain: string;
  dedicatedip: string;
  serverid: number;
  servername: string;
  serverip: string;
  serverhostname: string;
  suspensionreason: string;
  firstpaymentamount: string;
  recurringamount: string;
  paymentmethod: string;
  paymentmethodname: string;
  billingcycle: string;
  nextduedate: string;
  status: string;
  username: string;
  password: string;
  subscriptionid: string;
  promoid: number;
  overideautosuspend: number;
  overidesuspenduntil: string;
  ns1: string;
  ns2: string;
  assignedips: string;
  notes: string;
  diskusage: number;
  disklimit: number;
  bwusage: number;
  bwlimit: number;
  lastupdate: string;
}
