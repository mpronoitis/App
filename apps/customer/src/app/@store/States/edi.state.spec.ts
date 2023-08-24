/**
 * Test suite for edi state
 */
import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { EdiState } from './edi.state';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { APP_ENV } from '@play.app/app-env';
import { environment } from '../../../environments/environment';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';

describe('EdiState', () => {
  let store: Store;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([EdiState]),
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
    const state = store.selectSnapshot(EdiState);
    expect(state).toEqual({
      ediDocuments: null,
      ediProfiles: null,
      ediConnections: null,
      ediDocumentCountReport: null,
      ediDocumentsNoPayload: null,
      ediDocument: null,
      ediCredit: null,
      ediModels: null,
    });
  });
});
