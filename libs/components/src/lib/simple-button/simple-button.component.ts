import { Component, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faSync } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'play-components-simple-button',
  template: `
    <button
      [disabled]="disabled"
      type="{{ action }}"
      class="shadow {{ size }} bg-{{ color }}-500 text-white hover:bg-{{
        color
      }}-700 focus:outline-none focus:ring-4 focus:ring-{{
        color
      }}-300 font-medium {{ type }} text-{{
        size
      }} cursor:pointer px-5 ml-1 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex relative items-center justify-center mr-5 h-auto box-border"
    >
      <div class="w-auto">
        <play-components-simple-spinner
          *ngIf="loading"
          class="grow"
          mainColor="blue"
          width="4"
        >
        </play-components-simple-spinner>
      </div>

      <fa-icon
        *ngIf="!loading"
        class="pr-2 pointer-events-none"
        [icon]="icon!"
      ></fa-icon>
      {{ title }}
      <span
        *ngIf="insideContent"
        class="inline-flex -top-3 -right-4 absolute items-center justify-center px-auto py-auto ml-2 w-6 h-6 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full"
      >
        {{ content }}
      </span>
    </button>
  `,
  styles: [``],
})

/**
 * Simple badge component
 * @param title - title of button
 * @param type - type of button
 * @param color - color of button
 * @param textColor - text color of button
 * @param size - size of button
 * @param icon - Icon object from fontawesome
 * @param action - simple button or submit button
 * @param disabled - disabled button
 * @param insideContent - add content to button
 * @param content - content that we want to button
 */
export class SimpleButtonComponent {
  @Input()
  title!: string;

  @Input()
  color?: string; //color of button

  @Input()
  type?: string; //type of button rouned or not

  @Input()
  textColor?: string;

  @Input()
  size?: string;

  @Input()
  icon?: IconDefinition;

  @Input()
  loading?: boolean;

  @Input()
  action?: string;

  @Input()
  disabled?: boolean;

  @Input()
  insideContent?: boolean;

  @Input()
  content?: number;

  constructor() {
    if (!this.title) {
      this.title = 'Default';
    }

    if (!this.color) {
      this.color = 'blue';
    }

    if (!this.textColor) {
      this.textColor = 'white';
    }

    if (!this.size) {
      this.size = 'w-auto';
    }

    if (!this.type) {
      this.type = 'rounded-lg';
    }

    if (!this.icon) {
      this.icon = faSync;
    }

    if (!this.loading) {
      this.loading = false;
    }
    if (!this.action) {
      this.action = 'button';
    }

    if (!this.disabled) {
      this.disabled = false;
    }

    if (!this.insideContent) {
      this.insideContent = false;
    }
  }
}
