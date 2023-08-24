import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsDashboardComponent } from './events-dashboard.component';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxsModule } from '@ngxs/store';
import { ComponentsModule } from '@play.app/components';
import { MatDialogModule } from '@angular/material/dialog';

describe('EventsDashboardComponent', () => {
  let component: EventsDashboardComponent;
  let fixture: ComponentFixture<EventsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventsDashboardComponent],
      imports: [
        FontAwesomeTestingModule,
        HttpClientTestingModule,
        NgxsModule.forRoot([]),
        ComponentsModule,
        MatDialogModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EventsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
