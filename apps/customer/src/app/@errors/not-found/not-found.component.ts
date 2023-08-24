import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'play-app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent {
  faArrowLeft = faArrowLeft;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/user/dashboard']);
  }
}
