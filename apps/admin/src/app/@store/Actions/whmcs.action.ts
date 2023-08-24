/**
 * @summary Function to get whmcs system stats
 */
import { WhmcsAddClient } from '@play.app/types/Whmcs/WhmcsAddClient';
import { WhmcsAddOrder } from '@play.app/types/Whmcs/WhmcsAddOrder';
import { WhmcsAcceptOrder } from '@play.app/types/Whmcs/WhmcsAcceptOrder';

export class GetWhmcsSystemStats {
  static readonly type = '[Whmcs] Get Whmcs System Stats';
}

/**
 * @summary - This action is used to get Whmcs system stats
 * @param limitstart - The offset for the returned client data (default: 0).Optional
 * @param limitnum - The number of records to return (default: 25).Optional
 * @param sorting - The direction to sort the results. ASC or DESC. Default: ASC.Optional
 * @param status - Optional desired Client Status. ‘Active’, ‘Inactive’, or ‘Closed’.Optional
 * @param search - The search term to look for at the start of email, firstname, lastname, fullname or companyname.Optional
 * @param orderby - The column to order by. id, firstname, lastname, companyname, email, groupid, datecreated, status.Optional
 */
export class GetWhmcsClients {
  static readonly type = '[Whmcs] Get Whmcs Clients';
  constructor(
    public payload: {
      limitstart?: number;
      limitnum?: number;
      sorting?: string;
      status?: string;
      search?: string;
      orderby?: string;
    }
  ) {}
}

/**
 * @summary - This action is used to get Whmcs system stats
 * @param limitstart - The offset for the returned client data (default: 0).Optional
 * @param limitnum - The number of records to return (default: 25).Optional
 * @param id - Find orders for a specific id. Optional
 * @param userid - Find orders for a specific userid. Optional
 * @param requestorId - Find orders for a specific requestor_id. Optional
 * @param status_order - Find orders for a specific status. Optional
 */
export class GetWhmcsOrders {
  static readonly type = '[Whmcs] Get Whmcs Orders';
  constructor(
    public payload: {
      limitstart?: number;
      limitnum?: number;
      id?: number;
      userid?: number;
      requestorId?: number;
      status_order?: string;
    }
  ) {}
}

/**
 * @summary Add a new client
 * @param client {WhmcsAddClient} - The client data to add
 */
export class AddWhmcsClient {
  static readonly type = '[Whmcs] Add Whmcs Client';
  constructor(public payload: { client: WhmcsAddClient }) {}
}

/**
 * @summary - This action is used to get client details
 * @param clientid - The client id to obtain the details for. $clientid or $email is required.Optional
 * @param email - The email address of the client to obtain the details for. $clientid or $email is required.Optional
 */
export class GetWhmcsClientDetails {
  static readonly type = '[Whmcs] Get Whmcs Client Details';
  constructor(
    public payload: {
      clientid?: number;
      email?: string;
    }
  ) {}
}

/**
 * @summary - This action is used to get client purchased products
 * @param limitstart - The offset for the returned log data (default: 0).Optional
 * @param limitnum - The number of records to return (default: 25).Optional
 * @param clientid - The client id to obtain the details for. Optional
 * @param serviceid - The specific service id to obtain the details for. Optional
 * @param pid - The specific product id to obtain the details for. Optional
 * @param domain - The specific domain to obtain the service details for. Optional
 * @param username2 - The specific username to obtain the service details for. Optional
 * @returns Observable<any>
 */
export class GetWhmcsClientPurchasedProducts {
  static readonly type = '[Whmcs] Get Whmcs Client Purchased Products';
  constructor(
    public payload: {
      limitstart?: number;
      limitnum?: number;
      clientid?: number;
      serviceid?: number;
      pid?: number;
      domain?: string;
      username2?: string;
    }
  ) {}
}

/**
 * @summary - This method is used to get client purchased domains
 * @param limitstart - The offset for the returned log data (default: 0).Optional
 * @param limitnum - The number of records to return (default: 25).Optional
 * @param clientid - The client id to obtain the details for. Optional
 * @param domainid - The specific domain id to obtain the details for. Optional
 * @param domain - The specific domain name to obtain the details for. Optional
 * @returns Observable<any>
 */
export class GetWhmcsClientPurchasedDomains {
  static readonly type = '[Whmcs] Get Whmcs Client Purchased Domains';
  constructor(
    public payload: {
      limitstart?: number;
      limitnum?: number;
      clientid?: number;
      domainid?: number;
      domain?: string;
    }
  ) {}
}

/**
 * @summary - This action is used to get Whmcs products
 * @param pid - The product ID to retrieve. Obtain a specific product id configuration. Can be a list of ids comma separated.Optional
 * @param gid - Retrieve products in a specific group id.Optional
 * @param module - Retrieve products utilising a specific module.Optional
 */
export class GetWhmcsProducts {
  static readonly type = '[Whmcs] Get Whmcs Products';
  constructor(
    public payload: {
      pid?: number;
      gid?: number;
      module?: string;
    }
  ) {}
}

/**
 * @summary - This action is used to add a new order
 * @param order - Order <see cref="WhmcsAddOrder" />
 * @returns Observable<any>
 */
export class AddWhmcsOrder {
  static readonly type = '[Whmcs] Add Whmcs Order';
  constructor(public payload: { order: WhmcsAddOrder }) {}
}

/**
 * @summary - This action is used to accept an order
 * @param acceptOrderModel - The order to accept <see cref="WhmcsAcceptOrder" />
 */
export class AcceptWhmcsOrder {
  static readonly type = '[Whmcs] Accept Whmcs Order';
  constructor(public payload: { acceptOrderModel: WhmcsAcceptOrder }) {}
}
