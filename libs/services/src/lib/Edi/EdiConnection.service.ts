import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, shareReplay, timeout } from 'rxjs';
import { APP_ENV } from '@play.app/app-env';
import { EdiConnection } from '@play.app/types/Edi/EdiConnection';

@Injectable({
  providedIn: 'root',
})
export class EdiConnectionService {
  constructor(
    private http: HttpClient,
    @Inject(APP_ENV) private environment: any
  ) {}

  /**
   * @summary Function to fetch all available connections for a given customer id with paging
   * @param customer_Id {string} - Customer Id
   * @param page {number} - Page number
   * @param pageSize {number} - Page size
   * @param id {number} - GetOnlyOneConnection
   * @param EdiConnection {EdiConnection} - The connection object
   * @returns {Observable<Any>}
   */
  getEdiConnections(
    //Get All Conections For a Customer
    customer_Id: string,
    page: number,
    pageSize: number
  ): Observable<any> {
    const req = this.http.get(
      this.environment.API_URL +
        'edi/connections/all/byCustomer/' +
        customer_Id +
        '/' +
        page +
        '/' +
        pageSize
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  getEdiConnection(id: number): Observable<any> {
    //Get A Single Connection
    const req = this.http.get(
      this.environment.API_URL + 'edi/connections/' + id
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  deleteConnection(id: number): Observable<any> {
    //Delete A Single Connection Only For Admin
    const req = this.http.delete(
      this.environment.API_URL + 'edi/connections/' + id
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  getAllEdiConntections(page: number, pageSize: number): Observable<any> {
    //Get All Connections
    const req = this.http.get(
      this.environment.API_URL + 'edi/connections/all/' + page + '/' + pageSize
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  getConnectionByCustomserById(id: number): Observable<any> {
    //Get All Connections For a Customer
    const req = this.http.get(
      this.environment.API_URL + 'edi/connections/ByCustomerId/' + id
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  createConnection(connection: EdiConnection): Observable<any> {
    //Make A Connection

    const req = this.http.post(
      this.environment.API_URL + 'edi/connections',
      connection
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  updateConnection(connection: EdiConnection): Observable<any> {
    //Update A Connection
    const req = this.http.put(
      this.environment.API_URL + 'edi/connections',
      connection
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  /**
   * @summary Get total number of connections
   */
  getTotalConnections(): Observable<any> {
    const req = this.http.get(
      this.environment.API_URL + 'edi/connections/count'
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }
}
