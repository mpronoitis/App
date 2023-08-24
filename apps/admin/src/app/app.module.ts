import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { SharedModule } from './@utils/shared.module';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule, Store } from '@ngxs/store';
import { AuthState } from './@store/States/auth.state';
import { environment } from '../environments/environment';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import { JwtInterceptor } from './@utils/jwt.interceptor';
import localeEl from '@angular/common/locales/el';
import { APP_ENV } from '@play.app/app-env';
import { ViewModule } from './@views/view.module';
import { UsersState } from './@store/States/users.state';
import { ToastrModule } from 'ngx-toastr';
import { AdminForgotPasswordDialogComponent } from './@dialogs/Auth/forgot-password-dialog/forgot-password-dialog.component';
import { AdminLogoutDialogComponent } from './@dialogs/Auth/logout-dialog/logout-dialog.component';
import { EdiState } from './@store/States/edi.state';
import { TwentyState } from './@store/States/twenty.state';
import { SendEdiDialogComponent } from './@dialogs/Edi/send-edi-dialog/send-edi-dialog.component';
import { PylonState } from './@store/States/pylon.state';
import { WhmcsState } from './@store/States/whmcs.state';
import { MbamState } from './@store/States/mbam.state';
import { EventState } from './@store/States/event.state';

registerLocaleData(localeEl);

export function tokenGetter() {
  return localStorage.getItem('auth.token');
}

@NgModule({
  declarations: [
    AppComponent,
    AdminForgotPasswordDialogComponent,
    AdminLogoutDialogComponent,
    SendEdiDialogComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    SharedModule,
    ViewModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-left',
      tapToDismiss: true,
      timeOut: 3000,
    }),
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: [],
        disallowedRoutes: [],
      },
    }),

    NgxsModule.forRoot(
      [
        AuthState,
        UsersState,
        EdiState,
        TwentyState,
        PylonState,
        WhmcsState,
        MbamState,
        EventState,
      ],
      {
        developmentMode: !environment.production,
      }
    ),
    NgxsLoggerPluginModule.forRoot({
      disabled: environment.production,
    }),
    NgxsStoragePluginModule.forRoot({
      key: ['auth.token', 'auth.id', 'auth.email'],
    }),
    HttpClientModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'el' },

    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
      deps: [JwtHelperService, Store],
    },
    {
      provide: APP_ENV,
      useValue: environment,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
