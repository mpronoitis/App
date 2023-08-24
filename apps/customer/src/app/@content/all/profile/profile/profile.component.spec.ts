import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxsModule } from '@ngxs/store';
import { ComponentsModule } from '@play.app/components';
import { NavModule } from 'apps/customer/src/app/@nav/nav.module';
import { GravatarModule } from 'ngx-gravatar';
import { ToastrModule } from 'ngx-toastr';

import { ProfileComponent } from './profile.component';
import { getTranslocoModule } from '../../../../transloco-testing.module';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      imports: [
        NavModule,
        NgxsModule.forRoot([]),
        RouterTestingModule,
        FormsModule,
        getTranslocoModule(),
        HttpClientTestingModule,
        ReactiveFormsModule,
        MatNativeDateModule,
        MatDatepickerModule,
        ToastrModule.forRoot({
          positionClass: 'toast-bottom-right',
        }),
        MatDialogModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatInputModule,
        GravatarModule,
        ComponentsModule,
        BrowserAnimationsModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return '';
            },
          },
        }),
      ],
      providers: [],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display play-components-simple-spinner when loading', () => {
    component.loading = true;
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector('play-components-simple-spinner')
    ).toBeTruthy();
  });

  it('should have an img with attribute ngxGravatar', () => {
    component.loading = false;
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector('img[ngxGravatar]')
    ).toBeTruthy();
  });

  it('should have an input with id first-name', () => {
    component.loading = false;
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector('input#first-name')
    ).toBeTruthy();
  });

  it('should have an input with id last-name', () => {
    component.loading = false;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('input#last-name')).toBeTruthy();
  });

  it('should have an input with id company-name', () => {
    component.loading = false;
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector('input#company-name')
    ).toBeTruthy();
  });

  it('should have an input with id afm', () => {
    component.loading = false;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('input#afm')).toBeTruthy();
  });

  it('should have an input with id dateOfBirth', () => {
    component.loading = false;
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector('input#dateOfBirth')
    ).toBeTruthy();
  });

  it('should have a mat-datepicker', () => {
    component.loading = false;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('mat-datepicker')).toBeTruthy();
  });

  it('should have a button id #editButton', () => {
    component.loading = false;
    component.edit = false;
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector('button#editButton')
    ).toBeTruthy();
  });

  it('should have a button with id #cancelButton', () => {
    component.loading = false;
    component.edit = true;
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector('button#cancelButton')
    ).toBeTruthy();
  });

  it('should have a button with id #saveButton', () => {
    component.loading = false;
    component.edit = true;
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector('button#saveButton')
    ).toBeTruthy();
  });
});
