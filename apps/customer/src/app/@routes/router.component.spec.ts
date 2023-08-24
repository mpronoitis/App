import { fakeAsync, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { AuthState } from '../@store/States/auth.state';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { APP_ENV } from '@play.app/app-env';
import { environment } from '../../environments/environment';
import { MatDialogModule } from '@angular/material/dialog';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ComponentsModule } from '@play.app/components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslocoTestingModule } from '@ngneat/transloco';
import { appRoutes } from '../app.routing.module';

describe('Router: App', () => {
  let location: Location;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(appRoutes),
        MatDialogModule,
        ToastrModule,
        ComponentsModule,
        FormsModule,
        ReactiveFormsModule,
        TranslocoTestingModule,
        NgxsModule.forRoot([AuthState]),
        ToastrModule.forRoot({
          positionClass: 'toast-bottom-right',
        }),
        HttpClientTestingModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return '';
            },
          },
        }),
      ],
      declarations: [],
      providers: [
        JwtHelperService,
        {
          provide: APP_ENV,
          useValue: environment,
        },
        ToastrService,
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

    router.initialNavigation();
  });

  it('it should navigate to auth/login', fakeAsync(() => {
    //test navigation to login
    router.navigate(['/auth/login']).then(() => {
      expect(location.path()).toBe('/auth/login');
    });
  }));

  it('it should navigate to auth/register', fakeAsync(() => {
    //test navigation to register
    router.navigate(['/auth/register']).then(() => {
      expect(location.path()).toBe('/auth/register');
    });
  }));

  it('it should navigate to auth/logout', fakeAsync(() => {
    //test navigation to logout
    router.navigate(['/auth/logout']).then(() => {
      expect(location.path()).toBe('/auth/logout');
    });
  }));
});
