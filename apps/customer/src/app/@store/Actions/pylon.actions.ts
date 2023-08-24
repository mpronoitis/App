export class GetPylonInvoices {
  static readonly type = '[Pylon] Get Invoices';

  constructor(
    public payload: { page: number; pageSize: number; customer_Id: string }
  ) {}
}

export class GetPylonInvoicesCount {
  static readonly type = '[Pylon] Get Invoices Count';

  constructor(public payload: { customer_Id: string }) {}
}
