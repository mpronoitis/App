import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

// eslint-disable-next-line @angular-eslint/directive-selector
@Directive({ selector: '[capsLock]' })
export class TrackCapsDirective {
  // eslint-disable-next-line @angular-eslint/no-output-rename
  @Output('capsLock') capsLock = new EventEmitter<boolean>(); //emit capsLock state on keydown and keyup

  @HostListener('window:keydown', ['$event']) //listening for keydown events
  onKeyDown(event: KeyboardEvent): void {
    const capsOn = event.getModifierState && event.getModifierState('CapsLock');
    this.capsLock.emit(capsOn);
  }

  @HostListener('window:keyup', ['$event']) //listening for keyup events
  onKeyUp(event: KeyboardEvent): void {
    const capsOn = event.getModifierState && event.getModifierState('CapsLock');
    this.capsLock.emit(capsOn);
  }
}
