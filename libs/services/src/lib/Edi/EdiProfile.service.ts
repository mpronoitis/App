import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, shareReplay, timeout } from 'rxjs';
import { APP_ENV } from '@play.app/app-env';
import { EdiProfile } from '@play.app/types/Edi/EdiProfile';

@Injectable({
  providedIn: 'root',
})
export class EdiProfileService {
  constructor(
    private http: HttpClient,
    @Inject(APP_ENV) private environment: any
  ) {}

  /**
   * @summary - Function to get all Edi Profiles for a given customer id
   * @param {string} customer_id - The customer id
   * @param {number} page - The page number
   * @param {number} pageSize - The page size
   * @returns {Observable<any>} - The observable that contains the response
   **/
  getEdiProfiles(
    customer_id: string,
    page: number,
    pageSize: number
  ): Observable<any> {
    const req = this.http.get(
      this.environment.API_URL +
        'edi/profiles/all/byCustomer/' +
        customer_id +
        '/' +
        page +
        '/' +
        pageSize
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  getEdiProfile(id: any): Observable<any> {
    //Get A Single Profile
    const req = this.http.get(
      this.environment.API_URL + 'edi/profiles/id:guid?id=' + id
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  deleteEdiProfile(id: number): Observable<any> {
    //Delete A Single Profile Only For Admin
    const req = this.http.delete(
      this.environment.API_URL + 'edi/profiles/' + id
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  getByModelId(modelId: string): Observable<any> {
    //Get All Profiles By Model Id
    const req = this.http.get(
      this.environment.API_URL + 'edi/profiles/ByModelId/' + modelId
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  getAllEdiProfiles(page: number, pageSize: number): Observable<any> {
    //Get All EdiProfiles
    const req = this.http.get(
      this.environment.API_URL + 'edi/profiles/all/' + page + '/' + pageSize
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  createEdiProfile(ediProfile: EdiProfile): Observable<any> {
    //Create A Single Profile
    const req = this.http.post(
      this.environment.API_URL + 'edi/profiles',
      ediProfile
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  updateEdiProfile(ediProfile: EdiProfile): Observable<any> {
    //Update A Single Profile
    const req = this.http.put(
      this.environment.API_URL + 'edi/profiles',
      ediProfile
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  /**
   * @summary Get total count of edi profiles
   */
  getEdiProfilesCount(): Observable<any> {
    const req = this.http.get(this.environment.API_URL + 'edi/profiles/count');
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }
}
