import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentsModule } from '@play.app/components';

import { EdiSegmentTableComponent } from './edi-segment-table.component';

describe('EdiSegmentTableComponent', () => {
  let component: EdiSegmentTableComponent;
  let fixture: ComponentFixture<EdiSegmentTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EdiSegmentTableComponent],
      imports: [
        MatFormFieldModule,
        BrowserAnimationsModule,
        MatInputModule,
        ComponentsModule,
        MatPaginatorModule,
        MatTableModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EdiSegmentTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
