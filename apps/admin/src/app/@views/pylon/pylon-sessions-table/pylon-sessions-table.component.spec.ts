import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PylonSessionsTableComponent } from './pylon-sessions-table.component';
import { NgxsModule } from '@ngxs/store';
import { PylonState } from '../../../@store/States/pylon.state';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { APP_ENV } from '@play.app/app-env';
import { environment } from '../../../../../../customer/src/environments/environment';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';
import { ComponentsModule } from '@play.app/components';

describe('PylonSessionsTableComponent', () => {
  let component: PylonSessionsTableComponent;
  let fixture: ComponentFixture<PylonSessionsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PylonSessionsTableComponent],
      imports: [
        NgxsModule.forRoot([PylonState]),
        HttpClientTestingModule,
        ComponentsModule,
        FontAwesomeTestingModule,
        ToastrModule.forRoot({
          positionClass: 'toast-bottom-left',
          tapToDismiss: true,
          timeOut: 3000,
        }),
      ],
      providers: [
        {
          provide: APP_ENV,
          useValue: environment,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PylonSessionsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
