import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackCapsDirective } from './caps-look/caps-look.drective';
import { MarkAsteriskDirective } from './markasteriskdirective/markasteriskdirective.directive';

@NgModule({
  declarations: [TrackCapsDirective, MarkAsteriskDirective],
  imports: [CommonModule],
  exports: [TrackCapsDirective, MarkAsteriskDirective],
})
export class DirectivesModule {}
