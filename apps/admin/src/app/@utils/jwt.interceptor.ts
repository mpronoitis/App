/**
 * The JWT Interceptor intercepts HTTP requests from the application to add a JWT auth token to the HTTP Authorization header
 * if the user is logged in and the request is to the Angular app's API URL
 */
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //fetch auth.token from localstorage
    let token = localStorage.getItem('auth.token');
    //if its null, we return the request as is
    if (!token) {
      return next.handle(request);
    }
    //if token is null or "null" return the request as is
    if (token === 'null') {
      return next.handle(request);
    }

    //strip the first and last character from the token because the token is surrounded by quotes (stored as a "string")
    token = token.substring(1, token.length - 1);
    //check that request goes to our API
    const isApiUrl = request.url.startsWith(environment.API_URL);
    //if the request is to the api url and the user is logged in, we add the token to the request's headers
    if (isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token,
        },
      });
    }
    //we return the request as is
    return next.handle(request);
  }
}
