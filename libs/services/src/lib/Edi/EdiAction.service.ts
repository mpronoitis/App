import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { shareReplay, timeout } from 'rxjs';
import { APP_ENV } from '@play.app/app-env';

@Injectable({
  providedIn: 'root',
})
export class EdiActionService {
  constructor(
    private http: HttpClient,
    @Inject(APP_ENV) private environment: any
  ) {}

  /**
   * @summary Function to build all un built documents for a given customer id
   * @param customerId {string} - customer id
   * @returns {Observable<any>}
   */
  buildAllUnBuiltDocuments(customerId: string) {
    console.log('Customer Iddd - service -', customerId);
    const req = this.http.get(
      this.environment.API_URL + 'edi/actions/build/' + customerId
    );
    return req.pipe(timeout(20000)).pipe(shareReplay(1));
  }

  /**
   * @summary Function to send all un sent documents for a given customer id
   * @param customerId {string} - customer id
   * @returns {Observable<any>}
   */
  sendAllUnSentDocuments(customerId: string) {
    const req = this.http.get(
      this.environment.API_URL + 'edi/actions/send/' + customerId
    );
    return req.pipe(timeout(20000)).pipe(shareReplay(1));
  }
}
