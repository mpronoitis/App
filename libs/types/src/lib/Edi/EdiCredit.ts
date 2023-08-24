export interface EdiCredit {
  id: string;
  customerId: string;
  amount: string;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  customerName?: string;
}
