import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdiCreditAddComponent } from './edi-credit-add.component';
import { NgxsModule } from '@ngxs/store';
import { EdiState } from '../../../../@store/States/edi.state';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ComponentsModule } from '@play.app/components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { APP_ENV } from '@play.app/app-env';
import { environment } from '../../../../../environments/environment';

describe('EdiCreditAddComponent', () => {
  let component: EdiCreditAddComponent;
  let fixture: ComponentFixture<EdiCreditAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EdiCreditAddComponent],
      imports: [
        NgxsModule.forRoot([EdiState]),
        HttpClientTestingModule,
        NoopAnimationsModule,
        ToastrModule.forRoot({
          positionClass: 'toast-bottom-right',
        }),
        MatFormFieldModule,
        MatInputModule,
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

    fixture = TestBed.createComponent(EdiCreditAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
