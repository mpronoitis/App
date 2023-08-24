export interface EdiDocument {
  id: string;
  customer_Id: string;
  title: string;
  ediPayload: string;
  documentPayload: string;
  hedentid: string;
  isProcessed: boolean;
  isSent: boolean;
  created_At: string;
}
