import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhmcsClientsTableComponent } from './whmcs-clients-table.component';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';
import { NgxsModule } from '@ngxs/store';
import { WhmcsState } from '../../../@store/States/whmcs.state';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { JwtHelperService } from '@auth0/angular-jwt';
import { APP_ENV } from '@play.app/app-env';
import { environment } from '../../../../../../customer/src/environments/environment';
import { ToastrModule } from 'ngx-toastr';
import { MatDialogModule } from '@angular/material/dialog';
import { ComponentsModule } from '@play.app/components';

describe('WhmcsClientsTableComponent', () => {
  let component: WhmcsClientsTableComponent;
  let fixture: ComponentFixture<WhmcsClientsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WhmcsClientsTableComponent],
      imports: [
        FontAwesomeTestingModule,
        NgxsModule.forRoot([WhmcsState]),
        ToastrModule.forRoot({
          positionClass: 'toast-bottom-left',
          tapToDismiss: true,
        }),
        MatDialogModule,
        HttpClientTestingModule,
        ComponentsModule,
      ],
      providers: [
        JwtHelperService,
        {
          provide: APP_ENV,
          useValue: environment,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WhmcsClientsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
