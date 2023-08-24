import { Inject, Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable, shareReplay, timeout } from 'rxjs';

import { APP_ENV } from '@play.app/app-env';

import { EdiOrganization } from '@play.app/types/Edi/EdiOrganization';

@Injectable({
  providedIn: 'root',
})
export class EdiOrganizationService {
  constructor(
    private http: HttpClient,
    @Inject(APP_ENV) private environment: any
  ) {}

  /**
   * @param id {number} - GetOnlyOneOrganization
   * @param page {number} - Page number
   * @param pageSize {number} - Page size
   * @param EdiOrganization {EdiOrganization} - The organization object
   * @returns {Observable<Any>
   * */

  getEdiOrganizationById(id: number): Observable<any> {
    //Get A Single Organization
    const req = this.http.get(
      this.environment.API_URL + 'edi/organization/' + id
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  deleteEdiOrganizationById(id: number): Observable<any> {
    //Delete A Single Organization
    const req = this.http.delete(
      this.environment.API_URL + 'edi/organization/' + id
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  getAllEdiOrganizations(page: number, pageSize: number): Observable<any> {
    //Get All Organizations
    const req = this.http.get(
      this.environment.API_URL + 'edi/organization/all/' + page + '/' + pageSize
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  createEdiOrganization(EdiOrganization: EdiOrganization): Observable<any> {
    //Create A EdiOrganization
    const req = this.http.post(
      this.environment.API_URL + 'edi/organization',
      EdiOrganization
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  updateEdiOrganization(EdiOrganization: EdiOrganization): Observable<any> {
    //Update A Organization
    const req = this.http.put(
      this.environment.API_URL + 'edi/organization',
      EdiOrganization
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }
}
