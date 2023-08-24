import { Component, Input } from '@angular/core';

@Component({
  selector: 'play-components-simple-badge',
  template: `
    <span
      class="bg-{{ backgroundColor }}-100 text-{{ textColor }}-800 text-{{
        size
      }} font-semibold ml-2.5 md:ml-0 rounded dark:bg-blue-200 dark:text-blue-800"
      >{{ title }}</span
    >
  `,
  styles: [``],
})

/**
 * Simple badge component
 * @param title - title to display
 * @param backgroundColor - background color
 * @param textColor - text color
 * @param size - textsize of the badge
 */
export class SimpleBadgeComponent {
  //title input can be any string
  @Input()
  title!: string;

  //background color input can be any string
  @Input()
  backgroundColor!: string;

  //textColor
  @Input()
  textColor!: string;

  //textSize
  @Input()
  size?: string;

  constructor() {
    //if title is not set
    if (!this.title) {
      this.title = 'Deffault';
    }

    if (!this.backgroundColor) {
      this.backgroundColor = 'blue';
    }

    if (!this.textColor) {
      this.textColor = 'blue';
    }

    if (!this.size) {
      this.size = 'lg';
    }
  }
}
