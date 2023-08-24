/**
 * @summary Test suite to test the auth state
 */
import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { AuthState } from './auth.state';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { APP_ENV } from '@play.app/app-env';
import { environment } from '../../../environments/environment';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { Login } from '../Actions/auth.actions';

describe('AuthState', () => {
  let store: Store;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([AuthState]),
        HttpClientTestingModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return '';
            },
          },
        }),
      ],
      providers: [
        {
          provide: APP_ENV,
          useValue: environment,
        },
        JwtHelperService,
      ],
    });
    store = TestBed.inject(Store);
  });
  it('should create an instance', () => {
    expect(store).toBeTruthy();
  });

  it('should have an initial state', () => {
    const state = store.selectSnapshot(AuthState);
    expect(state).toEqual({
      id: null,
      token: null,
      email: null,
      lastLogin: null,
    });
  });
});
