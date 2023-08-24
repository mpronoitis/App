// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PylonInvoiceLine {
  itemCode: string;
  itemName: string;
  itemDescription: string;
  quantity: number;
  unitPrice: number;
  vatRate: number;
  totalPrice: number;
  totalVat: number;
  totalPriceWithVat: number;
  measurementUnit: string;
}
