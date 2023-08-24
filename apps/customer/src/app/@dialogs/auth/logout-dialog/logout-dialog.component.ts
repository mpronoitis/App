import { Component, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  faCheck,
  faQuestionCircle,
  faSignOut,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'play-app-logout-dialog',
  template: `
    <ng-container *transloco="let t; read: 'profile-dashboard'">
      <h1 mat-dialog-titile>
        {{ t('logout-dialog.title') }} <fa-icon [icon]="faSignOut"></fa-icon>
      </h1>
      <div mat-dialog-content>
        <p>
          {{ t('logout-dialog.desc') }}
        </p>
      </div>

      <div class="flex flex space-x-4 justify-center">
        <button
          type="button"
          (click)="onNoClick()"
          class="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          {{ t('logout-dialog.cancel') }}
        </button>
        <button
          type="button"
          (click)="onYesClick()"
          class="inline-block px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out"
        >
          {{ t('logout-dialog.confirm') }}
        </button>
      </div>
    </ng-container>
  `,
  styles: [],
})
export class LogoutDialogComponent implements OnDestroy {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  faSignOut = faSignOut;
  faQuestionCircle = faQuestionCircle;
  faCheck = faCheck;
  faXmark = faXmark;

  constructor(
    public dialogRef: MatDialogRef<LogoutDialogComponent>,
    private router: Router
  ) {}

  sub: Subscription | undefined;

  onYesClick(): void {
    this.router.navigate(['/auth/logout']);
    this.dialogRef.close(false);
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
