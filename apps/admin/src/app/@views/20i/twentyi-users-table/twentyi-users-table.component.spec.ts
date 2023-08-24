import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwentyiUsersTableComponent } from './twentyi-users-table.component';

describe('TwentyiUsersTableComponent', () => {
  let component: TwentyiUsersTableComponent;
  let fixture: ComponentFixture<TwentyiUsersTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TwentyiUsersTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TwentyiUsersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
