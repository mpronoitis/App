import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { APP_ENV } from '@play.app/app-env';
import { ComponentsModule } from '@play.app/components';
import { EdiState } from 'apps/admin/src/app/@store/States/edi.state';
import { environment } from 'apps/admin/src/environments/environment';
import { ToastrModule } from 'ngx-toastr';

import { EdiSegmentUpdateComponent } from './edi-segment-update.component';

describe('EdiSegmentUpdateComponent', () => {
  let component: EdiSegmentUpdateComponent;
  let fixture: ComponentFixture<EdiSegmentUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EdiSegmentUpdateComponent],
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

    fixture = TestBed.createComponent(EdiSegmentUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
