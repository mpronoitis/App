import { PylonInvoice } from '@play.app/types/Pylon/PylonInvoice';

export interface PylonStateModel {
  pylonInvoices: PylonInvoice[] | null;
  pylonInvoicesCount: number;
}
