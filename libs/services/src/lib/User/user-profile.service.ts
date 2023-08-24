import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, shareReplay, timeout } from 'rxjs';
import { APP_ENV } from '@play.app/app-env';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  constructor(
    private http: HttpClient,
    @Inject(APP_ENV) private environment: any
  ) {}

  /**
   * @description - This method is used to get the user profile based on the user id
   * @param {string} userId - The user id
   * @returns {Observable<any>} - The observable that contains the response
   */
  getUserProfile(userId: string): Observable<any> {
    const req = this.http.get(
      this.environment.API_URL + 'auth/user-profile/byUser/' + userId
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  /**
   * @description - This method is used to update the user profile
   * @param {any} userProfile - The user profile
   * @returns {Observable<any>} - The observable that contains the response
   */
  updateUserProfile(userProfile: any): Observable<any> {
    const req = this.http.put(
      this.environment.API_URL + 'auth/user-profile/update',
      userProfile
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }
}
