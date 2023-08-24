import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwentyiDomainsTableComponent } from './twentyi-domains-table.component';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';
import { MatDialogModule } from '@angular/material/dialog';

describe('TwentyiDomainsTableComponent', () => {
  let component: TwentyiDomainsTableComponent;
  let fixture: ComponentFixture<TwentyiDomainsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TwentyiDomainsTableComponent],
      imports: [FontAwesomeTestingModule, MatDialogModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TwentyiDomainsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
