import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, shareReplay, timeout } from 'rxjs';
import { APP_ENV } from '@play.app/app-env';
import { WhmcsAddOrder } from '@play.app/types/Whmcs/WhmcsAddOrder';
import { WhmcsAcceptOrder } from '@play.app/types/Whmcs/WhmcsAcceptOrder';

@Injectable({
  providedIn: 'root',
})
export class WhmcsOrderService {
  constructor(
    private http: HttpClient,
    @Inject(APP_ENV) private environment: any
  ) {}

  /**
   * @summary - This method is used to get Whmcs system stats
   * @param limitstart - The offset for the returned client data (default: 0).Optional
   * @param limitnum - The number of records to return (default: 25).Optional
   * @param id - Find orders for a specific id. Optional
   * @param userid - Find orders for a specific userid. Optional
   * @param requestorId - Find orders for a specific requestor_id. Optional
   * @param status_order - Find orders for a specific status. Optional
   * @returns Observable<any>
   */
  getOrders(
    limitstart?: number,
    limitnum?: number,
    id?: number,
    userid?: number,
    requestorId?: number,
    status_order?: string
  ): Observable<any> {
    //build query string
    let queryString = `whmcs/orders/getorders/${limitstart}/${limitnum}/${id}/${userid}/${requestorId}/${status_order}`;
    //delete all undefined params
    queryString = queryString.replace(/undefined/g, '');
    //replace double slashes with single slash
    queryString = queryString.replace(/\/\//g, '/');
    //check that in the end we have only one slash
    if (queryString.charAt(queryString.length - 1) === '/') {
      queryString = queryString.substring(0, queryString.length - 1);
    }
    const req = this.http.get(this.environment.API_URL + queryString);
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  /**
   * @summary - This method is used to get Whmcs products
   * @param pid - The product ID to retrieve. Obtain a specific product id configuration. Can be a list of ids comma separated.Optional
   * @param gid - Retrieve products in a specific group id.Optional
   * @param module - Retrieve products utilising a specific module.Optional
   */
  getProducts(pid?: number, gid?: number, module?: string): Observable<any> {
    //build query string
    let queryString = `whmcs/orders/getproducts/${pid}/${gid}/${module}`;
    //delete all undefined params
    queryString = queryString.replace(/undefined/g, '');
    //replace double slashes with single slash
    queryString = queryString.replace(/\/\//g, '/');
    //check that in the end we have only one slash
    if (queryString.charAt(queryString.length - 1) === '/') {
      queryString = queryString.substring(0, queryString.length - 1);
    }
    const req = this.http.get(this.environment.API_URL + queryString);
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  /**
   * @summary - This method is used to add a new order
   * @param order - Order <see cref="WhmcsAddOrder" />
   * @returns Observable<any>
   */
  addOrder(order: WhmcsAddOrder): Observable<any> {
    const req = this.http.post(
      this.environment.API_URL + 'whmcs/orders/addorder',
      order
    );
    return req.pipe(timeout(20000)).pipe(shareReplay(1));
  }

  /**
   * @summary - This method is used to accept an order
   * @param acceptOrderModel - The order to accept <see cref="WhmcsAcceptOrder" />
   */
  acceptOrder(acceptOrderModel: WhmcsAcceptOrder): Observable<any> {
    const req = this.http.post(
      this.environment.API_URL + 'whmcs/orders/acceptorder',
      acceptOrderModel
    );
    return req.pipe(timeout(20000)).pipe(shareReplay(1));
  }
}
