import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { NgxsModule, Store } from '@ngxs/store';
import { appRoutes } from './app.routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from './@utils/jwt.interceptor';
import { SharedModule } from './@utils/shared.module';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { AuthState } from './@store/States/auth.state';
import { UserState } from './@store/States/user.state';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import localeEl from '@angular/common/locales/el';
import { registerLocaleData } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EdiState } from './@store/States/edi.state';
import { TranslocoRootModule } from './transloco-root.module';
import { environment } from '../environments/environment';
import { APP_ENV } from '@play.app/app-env';
import { LogoutDialogComponent } from './@dialogs/auth/logout-dialog/logout-dialog.component';
import { ForgotPasswordDialogComponent } from './@dialogs/auth/forgot-password-dialog/forgot-password-dialog.component';
import { TrialDialogComponent } from './@dialogs/trial/trial-dialog.component';
import { SendEdiDialogComponent } from './@dialogs/Edi/send-edi-dialog/send-edi-dialog.component';
import { InformationEdiDialog } from './@dialogs/Edi/information-edi-dialog/information-edi-dialog.component';
import { ErrorsModule } from './@errors/errors.module';
import { DirectivesModule } from '@play.app/directives';
import { ContentModule } from './@content/content.module';
import { PylonState } from './@store/States/pylon.state';
import { ToastrModule } from 'ngx-toastr';

registerLocaleData(localeEl);

export function tokenGetter() {
  return localStorage.getItem('auth.token');
}

@NgModule({
  declarations: [
    AppComponent,
    LogoutDialogComponent,
    ForgotPasswordDialogComponent,
    TrialDialogComponent,
    SendEdiDialogComponent,
    InformationEdiDialog,
  ],
  imports: [
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-left',
      tapToDismiss: true,
    }),
    BrowserModule,
    ContentModule,
    TranslocoRootModule,
    SharedModule,
    DirectivesModule,
    ErrorsModule,
    RouterModule.forRoot(appRoutes, {
      preloadingStrategy: PreloadAllModules,
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: [],
        disallowedRoutes: [],
      },
    }),
    NgxsStoragePluginModule.forRoot({
      key: [
        'auth.token',
        'auth.email',
        'auth.id',
        'auth.lastLogin',
        'user.userProfile',
      ],
    }),
    NgxsModule.forRoot([AuthState, UserState, EdiState, PylonState], {
      developmentMode: !environment.production,
    }),
    NgxsLoggerPluginModule.forRoot({
      disabled: environment.production,
    }),

    HttpClientModule,
  ],
  providers: [
    //set locale to greek
    { provide: LOCALE_ID, useValue: 'el' },
    //set jwt interceptor to add the token to the request's headers
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
