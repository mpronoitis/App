import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_ENV } from '@play.app/app-env';
import { shareReplay, timeout } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PylonInvoiceService {
  constructor(
    private http: HttpClient,
    @Inject(APP_ENV) private environment: any
  ) {}

  /**
   *
   * @param id Pylon Invoice Id
   * @param page
   * @param pageSize
   * @returns
   */

  getInvoiceById(id: string, page: number, pageSize: number) {
    //getInvoiceById
    const req = this.http.get(
      this.environment.API_URL +
        'pylon/invoices/' +
        id +
        '/' +
        page +
        '/' +
        pageSize
    );
    return req
      .pipe(timeout(this.environment.PYLON_TIMEOUT))
      .pipe(shareReplay(1));
  }

  getInvoiceCountById(id: string) {
    //getInvoiceCountById
    const req = this.http.get(
      this.environment.API_URL + 'api/pylon/invoices/count/' + id
    );
    return req
      .pipe(timeout(this.environment.PYLON_TIMEOUT))
      .pipe(shareReplay(1));
  }
}
