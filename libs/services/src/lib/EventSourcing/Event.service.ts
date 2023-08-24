import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_ENV } from '@play.app/app-env';
import { Observable, timeout } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(
    private http: HttpClient,
    @Inject(APP_ENV) private environment: any
  ) {}

  /**
   * @summary Get all stored events with pagination
   * @param page
   * @param pageSize
   */
  getEvents(page: number, pageSize: number): Observable<any> {
    const req = this.http.get(
      this.environment.API_URL + 'events/get-all/' + page + '/' + pageSize
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe();
  }

  /**
   * @summary Get all stored events by customerId with pagination
   * @param customerId
   * @param page
   * @param pageSize
   */

  getEventsByCustomerId(
    customerId: string,
    page: number,
    pageSize: number
  ): Observable<any> {
    const req = this.http.get(
      this.environment.API_URL +
        'events/get-all-by-customer/' +
        customerId +
        '/' +
        page +
        '/' +
        pageSize
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe();
  }

  /**
   * @summary Get all stored events by messageType with pagination
   * @param messageType
   * @param page
   * @param pageSize
   */

  getEventsByMessageType(
    messageType: string,
    page: number,
    pageSize: number
  ): Observable<any> {
    const req = this.http.get(
      this.environment.API_URL +
        'events/get-all/' +
        messageType +
        '/' +
        page +
        '/' +
        pageSize
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe();
  }

  /**
   * @summary Get Count of Events
   */
  getEventCount(): Observable<any> {
    const req = this.http.get(this.environment.API_URL + 'events/count');
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe();
  }

  /**
   * @summary Get Count of Events by CustomerId
   */
  getEventCountByCustomerId(customerId: string): Observable<any> {
    const req = this.http.get(
      this.environment.API_URL + 'events/count-by-customer/' + customerId
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe();
  }

  /**
   * @summary Get Count of Events by MessageType
   */
  getEventCountByMessageType(messageType: string): Observable<any> {
    const req = this.http.get(
      this.environment.API_URL + 'events/count-by-type/' + messageType
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe();
  }
}
