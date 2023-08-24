import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PylonContactsTableComponent } from './pylon-contacts-table.component';
import { NgxsModule } from '@ngxs/store';
import { PylonState } from '../../../@store/States/pylon.state';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { APP_ENV } from '@play.app/app-env';
import { environment } from '../../../../../../customer/src/environments/environment';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';
import { ComponentsModule } from '@play.app/components';

describe('PylonContactsTableComponent', () => {
  let component: PylonContactsTableComponent;
  let fixture: ComponentFixture<PylonContactsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PylonContactsTableComponent],
      imports: [
        NgxsModule.forRoot([PylonState]),
        HttpClientTestingModule,
        FontAwesomeTestingModule,
        ToastrModule.forRoot({
          positionClass: 'toast-bottom-left',
          tapToDismiss: true,
          timeOut: 3000,
        }),
        ComponentsModule,
      ],
      providers: [
        {
          provide: APP_ENV,
          useValue: environment,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PylonContactsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
