import { SimpleButtonComponent } from './simple-button.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SimpleSpinnerComponent } from '@play.app/components';

describe('SimpleButtonComponent', () => {
  let component: SimpleButtonComponent;
  let fixture: ComponentFixture<SimpleButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SimpleButtonComponent, SimpleSpinnerComponent],
      imports: [FontAwesomeModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SimpleButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fallback to color blue if no color input is provided', () => {
    expect(component.color).toBe('blue');
  });

  it('should fallback to textColor white if no textColor is provided', () => {
    expect(component.textColor).toBe('white');
  });

  it('should fallback to title Default if no title is provided', () => {
    expect(component.title).toBe('Default');
  });

  it('should fallback to type rounded if no type is provided', () => {
    expect(component.type).toBe('rounded-lg');
  });

  it('should fallback to size w-auto if no size is provided', () => {
    expect(component.size).toBe('w-auto');
  });

  it('should fallback to action button if no action is provided', () => {
    expect(component.action).toBe('button');
  });

  it('should play-components-simple-spinner if loading is true', () => {
    component.loading = true;
    fixture.detectChanges();
    const spinner = fixture.nativeElement.querySelector(
      'play-components-simple-spinner'
    );
    expect(spinner).toBeTruthy();
  });

  it('should not render fa-icon if loading is true', () => {
    component.loading = true;
    fixture.detectChanges();
    const icon = fixture.nativeElement.querySelector('fa-icon');
    expect(icon).toBeFalsy();
  });

  it('button should be disabled if disabled is true', () => {
    component.disabled = true;
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBeTruthy();
  });

  it('should render fa-icon if loading is false', () => {
    component.loading = false;
    fixture.detectChanges();
    const icon = fixture.nativeElement.querySelector('fa-icon');
    expect(icon).toBeTruthy();
  });

  it('should not play-components-simple-spinner if loading is false', () => {
    component.loading = false;
    fixture.detectChanges();
    const spinner = fixture.nativeElement.querySelector(
      'play-components-simple-spinner'
    );
    expect(spinner).toBeFalsy();
  });
});
