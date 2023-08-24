import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_ENV } from '@play.app/app-env';
import { Observable, shareReplay, timeout } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PylonContactService {
  constructor(
    private http: HttpClient,
    @Inject(APP_ENV) private environment: any
  ) {}

  /**
   * @summary Get all PylonContacts with pagination
   * @param page {number} Page number
   * @param pageSize {number} Page size
   */
  getAllPylonContacts(page: number, pageSize: number): Observable<any> {
    const req = this.http.get(
      this.environment.API_URL +
        'pylon/contacts/temp/all/' +
        page +
        '/' +
        pageSize
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  /**
   * @summary Search for PylonContacts
   * @param query {string} Query to search
   * @param name {boolean} If we want to search by name
   * @param phone {boolean} If we want to search by phone
   * @param email {boolean} If we want to search by email
   * @param address {boolean} If we want to search by address
   *
   */
  searchPylonContacts(
    query: string,
    name: boolean,
    phone: boolean,
    email: boolean,
    address: boolean
  ): Observable<any> {
    const req = this.http.get(
      this.environment.API_URL +
        'pylon/contacts/temp/search/' +
        query +
        '/' +
        name +
        '/' +
        phone +
        '/' +
        email +
        '/' +
        address
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  /**
   * @summary Get count of contacts created in a given date range
   * @param from {string} From date
   * @param to {string} To date
   */
  getCountByDateRange(from: string, to: string): Observable<any> {
    const req = this.http.get(
      this.environment.API_URL + 'pylon/contacts/count/' + from + '/' + to
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }
}
