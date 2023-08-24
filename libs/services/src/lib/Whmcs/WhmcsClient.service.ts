import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, shareReplay, timeout } from 'rxjs';
import { APP_ENV } from '@play.app/app-env';
import { WhmcsAddClient } from '@play.app/types/Whmcs/WhmcsAddClient';

@Injectable({
  providedIn: 'root',
})
export class WhmcsClientService {
  constructor(
    private http: HttpClient,
    @Inject(APP_ENV) private environment: any
  ) {}

  /**
   * @summary - This method is used to get Whmcs system stats
   * @param limitstart - The offset for the returned client data (default: 0).Optional
   * @param limitnum - The number of records to return (default: 25).Optional
   * @param sorting - The direction to sort the results. ASC or DESC. Default: ASC.Optional
   * @param status - Optional desired Client Status. ‘Active’, ‘Inactive’, or ‘Closed’.Optional
   * @param search - The search term to look for at the start of email, firstname, lastname, fullname or companyname.Optional
   * @param orderby - The column to order by. id, firstname, lastname, companyname, email, groupid, datecreated, status.Optional
   * @returns Observable<any>
   */
  getClients(
    limitstart?: number,
    limitnum?: number,
    sorting?: string,
    status?: string,
    search?: string,
    orderby?: string
  ): Observable<any> {
    //build query string
    let queryString = `whmcs/clients/getclients/${limitstart}/${limitnum}/${sorting}/${status}/${search}/${orderby}`;
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
   * @summary - This method is used to add a new client
   * @param client {WhmcsAddClient} - The client data to add
   */
  addClient(client: WhmcsAddClient): Observable<any> {
    const req = this.http.post(
      this.environment.API_URL + 'whmcs/clients/addclient',
      client
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  /**
   * @summary - This method is used to get client details
   * @param clientid - The client id to obtain the details for. $clientid or $email is required.Optional
   * @param email - The email address of the client to obtain the details for. $clientid or $email is required.Optional
   */
  getClientsDetails(clientid?: number, email?: string): Observable<any> {
    //build query string
    let queryString = `whmcs/clients/getclientsdetails/${clientid}/${email}`;
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
   * @summary - This method is used to get client purchased products
   * @param limitstart - The offset for the returned log data (default: 0).Optional
   * @param limitnum - The number of records to return (default: 25).Optional
   * @param clientid - The client id to obtain the details for. Optional
   * @param serviceid - The specific service id to obtain the details for. Optional
   * @param pid - The specific product id to obtain the details for. Optional
   * @param domain - The specific domain to obtain the service details for. Optional
   * @param username2 - The specific username to obtain the service details for. Optional
   * @returns Observable<any>
   */
  getClientsProducts(
    limitstart?: number,
    limitnum?: number,
    clientid?: number,
    serviceid?: number,
    pid?: number,
    domain?: string,
    username2?: string
  ): Observable<any> {
    //build query string
    let queryString = `whmcs/clients/getclientsproducts/${limitstart}/${limitnum}/${clientid}/${serviceid}/${pid}/${domain}/${username2}`;
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
   * @summary - This method is used to get client purchased domains
   * @param limitstart - The offset for the returned log data (default: 0).Optional
   * @param limitnum - The number of records to return (default: 25).Optional
   * @param clientid - The client id to obtain the details for. Optional
   * @param domainid - The specific domain id to obtain the details for. Optional
   * @param domain - The specific domain name to obtain the details for. Optional
   * @returns Observable<any>
   */
  getClientsDomains(
    limitstart?: number,
    limitnum?: number,
    clientid?: number,
    domainid?: number,
    domain?: string
  ): Observable<any> {
    //build query string
    let queryString = `whmcs/clients/getclientsdomains/${limitstart}/${limitnum}/${clientid}/${domainid}/${domain}`;
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
}
