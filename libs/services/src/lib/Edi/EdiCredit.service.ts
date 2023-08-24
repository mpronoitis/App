import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, shareReplay, timeout } from 'rxjs';
import { APP_ENV } from '@play.app/app-env';
import { EdiCredit } from '@play.app/types/Edi/EdiCredit';

@Injectable({
  providedIn: 'root',
})
export class EdiCreditService {
  constructor(
    private http: HttpClient,
    @Inject(APP_ENV) private environment: any
  ) {}

  /**
   * @summary - This method is used for fetching Edi Credit by id
   * @param {string} id - The  id of EdiCredit
   * @returns {Observable<any>} - The observable that contains the response
   */
  getEdiCreditById(id: number): Observable<any> {
    const req = this.http.get(this.environment.API_URL + 'edi/credit/' + id);
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  /**
   * @summary - Delete a EdiCredit by id
   * @param id - The EdiCredit id
   * @returns {Observable<any>} - The observable that contains the response
   */
  deleteEdiCreditById(id: number): Observable<any> {
    const req = this.http.delete(this.environment.API_URL + 'edi/credit/' + id);
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  /**
   * @summary - This method is used to get EdiCredit by customerId
   * @param customerId - The customerId
   * @returns {Observable<any>} - The observable that contains the response
   */
  getEdiCreditByCustomerId(customerId: string): Observable<any> {
    const req = this.http.get(
      this.environment.API_URL + 'edi/credit/customer/' + customerId
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  /**
   * @summary - This method is used fetch EdiCredits with paging
   * @param {number} page - The page number
   * @param {number} pageSize - The page size
   * @returns {Observable<any>} - The observable that contains the response
   */
  getEdiCredits(page: number, pageSize: number): Observable<any> {
    const req = this.http.get(
      this.environment.API_URL + 'edi/credit/all/' + page + '/' + pageSize
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  /**
   * @summary - This method is used to create a new EdiCredit
   * @param {EdiCredit} EdiCredit - The EdiCredit object
   * @returns {Observable<any>} - The observable that contains the response
   */
  createEdiCredit(ediCredit: EdiCredit): Observable<any> {
    const req = this.http.post(this.environment.API_URL + 'edi/credit', {
      customerId: ediCredit.customerId,
      amount: ediCredit.amount,
    });
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  /**
   * @summary - This method is used to update an existing EdiCredit
   * @param {EdiCredit} EdiCredit - The EdiCredit object
   * @returns {Observable<any>} - The observable that contains the response
   */
  updateEdiCredit(ediCredit: EdiCredit): Observable<any> {
    const req = this.http.put(this.environment.API_URL + 'edi/credit', {
      id: ediCredit.id,
      customerId: ediCredit.customerId,
      creditAmount: ediCredit.amount,
    });
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }
}
