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

import { EdiSegmentAddComponent } from './edi-segment-add.component';

describe('EdiSegmentAddComponent', () => {
  let component: EdiSegmentAddComponent;
  let fixture: ComponentFixture<EdiSegmentAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EdiSegmentAddComponent],
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

    fixture = TestBed.createComponent(EdiSegmentAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
