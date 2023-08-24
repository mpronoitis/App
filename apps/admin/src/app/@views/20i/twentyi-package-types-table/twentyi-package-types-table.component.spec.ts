import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwentyiPackageTypesTableComponent } from './twentyi-package-types-table.component';

describe('TwentyiPackageTypesTableComponent', () => {
  let component: TwentyiPackageTypesTableComponent;
  let fixture: ComponentFixture<TwentyiPackageTypesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TwentyiPackageTypesTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TwentyiPackageTypesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
