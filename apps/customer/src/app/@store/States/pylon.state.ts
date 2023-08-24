import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { PylonInvoice } from '@play.app/types/Pylon/PylonInvoice';
import { PylonStateModel } from '../Models/PylonStateModel';
import { PylonInvoiceService } from '@play.app/services/Pylon/PylonInvoice.service';
import { tap } from 'rxjs';
import {
  GetPylonInvoices,
  GetPylonInvoicesCount,
} from '../Actions/pylon.actions';

@State<PylonStateModel>({
  name: 'pylon',
  defaults: {
    pylonInvoices: null,
    pylonInvoicesCount: 0,
  },
})
@Injectable()
export class PylonState {
  constructor(private PylonInvoiceService: PylonInvoiceService) {}

  @Action(GetPylonInvoices)
  getPylonInvoices(
    ctx: StateContext<PylonStateModel>,
    action: GetPylonInvoices
  ) {
    return this.PylonInvoiceService.getInvoiceById(
      action.payload.customer_Id,
      action.payload.page,
      action.payload.pageSize
    ).pipe(
      tap((result) => {
        ctx.patchState({
          pylonInvoices: result as PylonInvoice[],
        });
      })
    );
  }

  @Action(GetPylonInvoicesCount)
  getPylonInvoicesCount(
    ctx: StateContext<PylonStateModel>,
    action: GetPylonInvoicesCount
  ) {
    return this.PylonInvoiceService.getInvoiceCountById(
      action.payload.customer_Id
    ).pipe(
      tap((result) => {
        ctx.patchState({
          pylonInvoicesCount: result as number,
        });
      })
    );
  }
}
