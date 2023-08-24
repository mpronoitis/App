import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdiCreditDeleteComponent } from './edi-credit-delete.component';
import { NgxsModule } from '@ngxs/store';
import { EdiState } from '../../../../@store/States/edi.state';
import { ComponentsModule } from '@play.app/components';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { APP_ENV } from '@play.app/app-env';
import { environment } from '../../../../../environments/environment';

describe('EdiCreditDeleteComponent', () => {
  let component: EdiCreditDeleteComponent;
  let fixture: ComponentFixture<EdiCreditDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EdiCreditDeleteComponent],
      imports: [
        NgxsModule.forRoot([EdiState]),
        ComponentsModule,
        HttpClientTestingModule,
        NoopAnimationsModule,
        ToastrModule.forRoot({
          positionClass: 'toast-bottom-right',
        }),
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
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

    fixture = TestBed.createComponent(EdiCreditDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
