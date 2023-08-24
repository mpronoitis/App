import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_ENV } from '@play.app/app-env';
import { shareReplay, timeout } from 'rxjs';
import { Contact } from '@play.app/types/Contact/Contact';
@Injectable({
  providedIn: 'root',
})
export class ContactService {
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

  makeContactRequest(contactRequest: Contact) {
    //makeContactRequest
    const req = this.http.post(
      this.environment.API_URL + 'contact',
      contactRequest
    );
    return req
      .pipe(timeout(this.environment.PYLON_TIMEOUT))
      .pipe(shareReplay(1));
  }
}
