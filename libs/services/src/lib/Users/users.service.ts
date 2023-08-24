import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, shareReplay, timeout } from 'rxjs';
import { APP_ENV } from '@play.app/app-env';
import { RegisterUser } from '@play.app/types/Auth/RegisterUser';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(
    private http: HttpClient,
    @Inject(APP_ENV) private environment: any
  ) {}

  /**
   * @description - This method is used to get the user profile based on the user id
   * @param {string} userId - The user id
   * @returns {Observable<any>} - The observable that contains the response
   */
  getAllUsers(page: number, pageSize: number): Observable<any> {
    const req = this.http.get(
      this.environment.API_URL + 'auth/user/get-all/' + page + '/' + pageSize
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  /**
   * @summary - This method is used to register a new user
   * @param registerUser - The user to register
   */
  registerUser(registerUser: RegisterUser): Observable<any> {
    const req = this.http.post(
      this.environment.API_URL + 'auth/user/register',
      registerUser
    );

    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  /**
   * @summary - This method is used to get the user profile based on the user id
   * @param userId - The user id
   */
  getUserProfile(userId: string): Observable<any> {
    const req = this.http.get(
      this.environment.API_URL + 'auth/user-profile/byUser/' + userId
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  /**
   * @summary - This method is used to delete a user
   * @param userId - The user id
   */
  deleteUser(userId: string): Observable<any> {
    const req = this.http.delete(
      this.environment.API_URL + 'auth/user/remove/' + userId
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  /**
   * @summary - This method is used to update the user profile based on the user id
   * @param userProfile - The user profile
   */
  updateUserProfile(userProfile: any): Observable<any> {
    const req = this.http.put(
      this.environment.API_URL + 'auth/user-profile/update',
      userProfile
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  /**
   * @summary - This method is used to update the user password based on the user id
   * @param userId - The user id
   * @param email   - The user email
   * @param password - The user password
   */
  updatePassword(
    userId: string,
    email: string,
    password: string
  ): Observable<any> {
    const req = this.http.put(this.environment.API_URL + 'auth/user/update', {
      id: userId,
      email: email,
      password: password,
    });
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  /**
   * @summary - This method is used to update the user role based on the user id
   * @param userId - The user id
   * @param email  - The user email
   * @param role  - The user role
   */
  updateRole(userId: string, email: string, role: string): Observable<any> {
    const req = this.http.put(
      this.environment.API_URL + 'auth/user/update-role',
      {
        id: userId,
        email: email,
        role: role,
      }
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  /**
   * @summary - This method is used to get the count of users created within a given time range
   * @param startDateTime - The start date time
   * @param endDateTime - The end date time
   */
  getCountByDate(startDateTime: string, endDateTime: string): Observable<any> {
    const req = this.http.get(
      this.environment.API_URL +
        'auth/user/count-by-date/' +
        startDateTime +
        '/' +
        endDateTime
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }
}
