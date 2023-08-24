import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdiCreditUpdateComponent } from './edi-credit-update.component';
import { NgxsModule } from '@ngxs/store';
import { EdiState } from '../../../../@store/States/edi.state';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ComponentsModule } from '@play.app/components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { APP_ENV } from '@play.app/app-env';
import { environment } from '../../../../../environments/environment';

describe('EdiCreditUpdateComponent', () => {
  let component: EdiCreditUpdateComponent;
  let fixture: ComponentFixture<EdiCreditUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EdiCreditUpdateComponent],
      imports: [
        NgxsModule.forRoot([EdiState]),
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
        ToastrModule.forRoot({
          positionClass: 'toast-bottom-right',
        }),
        MatAutocompleteModule,
        ComponentsModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [
        {
          provide: APP_ENV,
          useValue: environment,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EdiCreditUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
