import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PylonItemsTableComponent } from './pylon-items-table.component';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';
import { NgxsModule } from '@ngxs/store';
import { ToastrModule } from 'ngx-toastr';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentsModule } from '@play.app/components';
import { JwtHelperService } from '@auth0/angular-jwt';
import { APP_ENV } from '@play.app/app-env';
import { environment } from '../../../../../../customer/src/environments/environment';
import { PylonState } from '../../../@store/States/pylon.state';

describe('PylonItemsTableComponent', () => {
  let component: PylonItemsTableComponent;
  let fixture: ComponentFixture<PylonItemsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PylonItemsTableComponent],
      imports: [
        FontAwesomeTestingModule,
        NgxsModule.forRoot([PylonState]),
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

    fixture = TestBed.createComponent(PylonItemsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
