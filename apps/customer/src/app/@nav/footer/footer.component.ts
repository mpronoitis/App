import { Component } from '@angular/core';

@Component({
  selector: 'play-app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  current_year = new Date().getFullYear();
  //allow empty constructor
  //eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
