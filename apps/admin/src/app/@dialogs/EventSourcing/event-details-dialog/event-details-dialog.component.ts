import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StoredEvent } from '@play.app/types/EventSourcing/StoredEvent';

@Component({
  template: `
    <div class="container">
      {{ event.data | json }}
    </div>
  `,
  styles: [``],
})
export class EventDetailsDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public event: StoredEvent) {}
}
