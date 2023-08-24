import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwentyiPackagesTableComponent } from './twentyi-packages-table.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

describe('TwentyiPackagesTableComponent', () => {
  let component: TwentyiPackagesTableComponent;
  let fixture: ComponentFixture<TwentyiPackagesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TwentyiPackagesTableComponent],
      imports: [MatDialogModule],
      providers: [],
    }).compileComponents();

    fixture = TestBed.createComponent(TwentyiPackagesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
