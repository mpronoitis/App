import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxsModule } from '@ngxs/store';
import { ComponentsModule } from '@play.app/components';

import { EdiConnectionsTableComponent } from './edi-connections-table.component';
import { getTranslocoModule } from '../../../../transloco-testing.module';
import { ToastrModule } from 'ngx-toastr';

describe('EdiConnectionsTableComponent', () => {
  let component: EdiConnectionsTableComponent;
  let fixture: ComponentFixture<EdiConnectionsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EdiConnectionsTableComponent],
      imports: [
        NgxsModule.forRoot([]),
        BrowserAnimationsModule,
        HttpClientTestingModule,
        getTranslocoModule(),
        FontAwesomeModule,
        MatTableModule,
        ToastrModule.forRoot({
          positionClass: 'toast-bottom-right',
        }),
        ComponentsModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EdiConnectionsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render play-components-simple-spinner if loading', () => {
    component.loading = true;
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector('play-components-simple-spinner')
    ).toBeTruthy();
  });

  it('should render play-components-simple-alert if show_message', () => {
    component.show_message = true;
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector('play-components-simple-alert')
    ).toBeTruthy();
  });

  it('should render a table with 2 columns', () => {
    component.loading = false;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('table th').length).toEqual(
      2
    );
  });

  it('should have a mat-paginator', () => {
    component.loading = false;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('mat-paginator')).toBeTruthy();
  });
});
