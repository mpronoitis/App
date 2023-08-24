import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdiCreditTableComponent } from './edi-credit-table.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { ComponentsModule } from '@play.app/components';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { NgxsModule } from '@ngxs/store';
import { EdiState } from '../../../../@store/States/edi.state';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { APP_ENV } from '@play.app/app-env';
import { environment } from '../../../../../environments/environment';
import { ToastrModule } from 'ngx-toastr';

describe('EdiCreditTableComponent', () => {
  let component: EdiCreditTableComponent;
  let fixture: ComponentFixture<EdiCreditTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EdiCreditTableComponent],
      imports: [
        MatFormFieldModule,
        BrowserAnimationsModule,
        NgxsModule.forRoot([EdiState]),
        ToastrModule.forRoot({
          positionClass: 'toast-bottom-right',
        }),
        HttpClientTestingModule,
        MatInputModule,
        ComponentsModule,
        MatPaginatorModule,
        MatTableModule,
      ],
      providers: [
        {
          provide: APP_ENV,
          useValue: environment,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EdiCreditTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
