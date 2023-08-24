import { Action, Selector, State, StateContext } from '@ngxs/store';
import { WhmcsStateModel } from '../Models/WhmcsStateModel';
import { Injectable } from '@angular/core';
import { WhmcsSystemService } from '@play.app/services/Whmcs/WhmcsSystem.service';
import {
  AcceptWhmcsOrder,
  AddWhmcsClient,
  AddWhmcsOrder,
  GetWhmcsClientDetails,
  GetWhmcsClientPurchasedDomains,
  GetWhmcsClientPurchasedProducts,
  GetWhmcsClients,
  GetWhmcsOrders,
  GetWhmcsProducts,
  GetWhmcsSystemStats,
} from '../Actions/whmcs.action';
import { tap } from 'rxjs';
import { WhmcsClient } from '@play.app/types/Whmcs/WhmcsClient';
import { WhmcsClientService } from '@play.app/services/Whmcs/WhmcsClient.service';
import { WhmcsOrder } from '@play.app/types/Whmcs/WhmcsOrder';
import { WhmcsOrderService } from '@play.app/services/Whmcs/WhmcsOrder.service';
import { ToastrService } from 'ngx-toastr';

@State<WhmcsStateModel>({
  name: 'whmcs',
  defaults: {
    stats: null,
    clients: null,
    orders: null,
    clientDomains: null,
    clientProducts: null,
    clientDetails: null,
    products: null,
  },
})
@Injectable()
export class WhmcsState {
  constructor(
    private StatsService: WhmcsSystemService,
    private ClientService: WhmcsClientService,
    private OrderService: WhmcsOrderService,
    private toastr: ToastrService
  ) {}

  /**
   * @summary - This method is used to get Whmcs system stats
   */
  @Action(GetWhmcsSystemStats)
  getWhmcsSystemStats(
    ctx: StateContext<WhmcsStateModel>,
    action: GetWhmcsSystemStats
  ) {
    return this.StatsService.getWhmcsSystemStats().pipe(
      tap((res) => {
        ctx.patchState({
          stats: res.result, //get all stats here
        });
      })
    );
  }

  /**
   * @summary - This action is used to get Whmcs system stats
   * @param ctx - StateContext<WhmcsStateModel>
   * @param action - GetWhmcsClients
   */
  @Action(GetWhmcsClients)
  getClients(ctx: StateContext<WhmcsStateModel>, action: GetWhmcsClients) {
    return this.ClientService.getClients(
      action.payload.limitstart,
      action.payload.limitnum,
      action.payload.sorting,
      action.payload.status,
      action.payload.search,
      action.payload.orderby
    ).pipe(
      tap((res) => {
        //next
        ctx.patchState({
          clients: res, //get all clients here
        });
      })
    );
  }

  /**
   * @param ctx - StateContext<WhmcsStateModel>
   * @param action - GetWhmcsOrders
   */
  @Action(GetWhmcsOrders)
  getOrders(ctx: StateContext<WhmcsStateModel>, action: GetWhmcsOrders) {
    return this.OrderService.getOrders(
      action.payload.limitstart,
      action.payload.limitnum,
      action.payload.id,
      action.payload.userid,
      action.payload.requestorId,
      action.payload.status_order
    ).pipe(
      tap((res) => {
        ctx.patchState({
          orders: res, //get all orders here
        });
      })
    );
  }

  /**
   * @param ctx - StateContext<WhmcsStateModel>
   * @param action - AddWhmcsClient
   */
  @Action(AddWhmcsClient)
  addClient(ctx: StateContext<WhmcsStateModel>, action: AddWhmcsClient) {
    return this.ClientService.addClient(action.payload.client);
  }

  /**
   * @summary - This action is used to get client details
   * @param ctx - StateContext<WhmcsStateModel>
   * @param action - GetWhmcsClientDetails
   */
  @Action(GetWhmcsClientDetails)
  getClientDetails(
    ctx: StateContext<WhmcsStateModel>,
    action: GetWhmcsClientDetails
  ) {
    return this.ClientService.getClientsDetails(
      action.payload.clientid,
      action.payload.email
    ).pipe(
      tap(
        (res) => {
          ctx.patchState({
            clientDetails: res.result, //get all client details here
          });
        },
        (error) => {
          this.toastr.error('Error while getting client details');
        }
      )
    );
  }

  /**
   * @summary - This action is used to get client purchased products
   * @returns Observable<any>
   * @param ctx - StateContext<WhmcsStateModel>
   * @param action - GetWhmcsClientPurchasedProducts
   */
  @Action(GetWhmcsClientPurchasedProducts)
  getClientProducts(
    ctx: StateContext<WhmcsStateModel>,
    action: GetWhmcsClientPurchasedProducts
  ) {
    return this.ClientService.getClientsProducts(
      action.payload.limitstart,
      action.payload.limitnum,
      action.payload.clientid,
      action.payload.serviceid,
      action.payload.pid,
      action.payload.domain,
      action.payload.username2
    ).pipe(
      tap({
        next: (res) => {
          ctx.patchState({
            clientProducts: res, //get all client products here
          });
        },
        error: (error) => {
          //if response code is 400
          if (error.status === 400) {
            this.toastr.error('Error');
          }
          //if any other error
          else {
            this.toastr.error(
              'Error while getting client products, please try again later'
            );
          }
        },
      })
    );
  }

  /**
   * @summary - This method is used to get client purchased domains
   * @returns Observable<any>
   * @param ctx - StateContext<WhmcsStateModel>
   * @param action - GetWhmcsClientPurchasedDomains
   */
  @Action(GetWhmcsClientPurchasedDomains)
  getClientDomains(
    ctx: StateContext<WhmcsStateModel>,
    action: GetWhmcsClientPurchasedDomains
  ) {
    return this.ClientService.getClientsDomains(
      action.payload.limitstart,
      action.payload.limitnum,
      action.payload.clientid,
      action.payload.domainid,
      action.payload.domain
    ).pipe(
      tap({
        next: (res) => {
          ctx.patchState({
            clientDomains: res, //get all client domains here
          });
        },
        error: (error) => {
          //if response code is 400
          if (error.status === 400) {
            this.toastr.error('Error');
          }
          //if any other error
          else {
            this.toastr.error(
              'Error while getting client domains, please try again later'
            );
          }
        },
      })
    );
  }

  /**
   * @summary - This action is used to get Whmcs products
   * @param ctx - StateContext<WhmcsStateModel>
   * @param action - GetWhmcsProducts
   */
  @Action(GetWhmcsProducts)
  getProducts(ctx: StateContext<WhmcsStateModel>, action: GetWhmcsProducts) {
    return this.OrderService.getProducts(
      action.payload.pid,
      action.payload.gid,
      action.payload.module
    ).pipe(
      tap({
        next: (res) => {
          ctx.patchState({
            products: res, //get all products here
          });
        },
        error: (error) => {
          //if response code is 400
          if (error.status === 400) {
            this.toastr.error('Error');
          }
          //if any other error
          else {
            this.toastr.error(
              'Error while getting products, please try again later'
            );
          }
        },
      })
    );
  }

  /**
   * @summary - This method is used to add a new order
   * @returns Observable<any>
   * @param ctx
   * @param action
   */
  @Action(AddWhmcsOrder)
  addOrder(ctx: StateContext<WhmcsStateModel>, action: AddWhmcsOrder) {
    return this.OrderService.addOrder(action.payload.order);
  }

  /**
   * @summary - This action is used to accept an order
   * @param ctx
   * @param action
   */
  @Action(AcceptWhmcsOrder)
  acceptOrder(ctx: StateContext<WhmcsStateModel>, action: AcceptWhmcsOrder) {
    return this.OrderService.acceptOrder(action.payload.acceptOrderModel);
  }
}
