import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxsModule } from '@ngxs/store';
import { ComponentsModule } from '@play.app/components';
import { EdiDocumentsTableComponent } from './edi-documents-table.component';
import { getTranslocoModule } from '../../../../transloco-testing.module';
import { EdiState } from '../../../../@store/States/edi.state';
import { GetEdiDocuments } from '../../../../@store/Actions/edi.actions';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { APP_ENV } from '@play.app/app-env';
import { environment } from '../../../../../environments/environment';
import { ToastrModule, ToastrService } from 'ngx-toastr';

describe('EdiDocumentsTableComponent', () => {
  let component: EdiDocumentsTableComponent;
  let fixture: ComponentFixture<EdiDocumentsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EdiDocumentsTableComponent],
      imports: [
        NgxsModule.forRoot([EdiState]),
        BrowserAnimationsModule,
        HttpClientTestingModule,
        getTranslocoModule(),
        MatDialogModule,
        MatTableModule,
        FontAwesomeModule,
        ComponentsModule,
        ToastrModule.forRoot({
          positionClass: 'toast-bottom-right',
        }),
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return '';
            },
          },
        }),
      ],
      providers: [
        JwtHelperService,
        {
          provide: APP_ENV,
          useValue: environment,
        },
        ToastrService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EdiDocumentsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display play-components-simple-spinner if loading', () => {
    component.loading = true;
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector('play-components-simple-spinner')
    ).toBeTruthy();
  });

  // it('should render play-components-toast-message if show_message', () => {
  //   component.show_toast_message = true;
  //   fixture.detectChanges();
  //   expect(
  //     fixture.nativeElement.querySelector('play-components-toast-message')
  //   ).toBeTruthy();
  // });

  it('should have a play-components-simple-button with text "Refresh"', () => {
    component.loading = false;
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector('play-components-simple-button')
        .textContent
    ).toContain('Refresh');
  });

  it('should have a second play-components-simple-button with text "Upload"', () => {
    component.loading = false;
    //set unSentDocuments to something other than 0
    component.unSentDocuments = 1;
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelectorAll('play-components-simple-button')[1]
        .textContent
    ).toContain('Upload');
  });

  it('should have a table with 4 columns', () => {
    component.loading = false;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('table th').length).toEqual(
      4
    );
  });

  it('should have mat-paginator', () => {
    component.loading = false;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('mat-paginator')).toBeTruthy();
  });

  it('should dispatch GetEdiDocuments on load', () => {
    const spy = jest.spyOn(component.store, 'dispatch');
    component.getDocuments(1, 10);
    //expect the dispatch to have been called with the GetEdiDocuments action
    expect(spy).toHaveBeenCalled();
  });

  it('should dispatch GetEdiDocuments on refresh button click', () => {
    const spy = jest.spyOn(component.store, 'dispatch');
    component.loading = false;
    fixture.detectChanges();
    fixture.nativeElement
      .querySelector('play-components-simple-button')
      .click();
    expect(spy).toHaveBeenCalled();
  });
});
