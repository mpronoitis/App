import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { faCheck, faSignOut, faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'play-app-admin-logout-diaog',
  template: `
    <div mat-dialog-content>
      <p>Are you sure you want to logout?</p>
    </div>
    <div mat-dialog-actions>
      <div class="flex justify-center">
        <button
          (click)="onYesClick()"
          class="bg-green-500 mr-2 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
        >
          <fa-icon [icon]="faCheck"></fa-icon>
          Yes
        </button>

        <button
          (click)="onNoClick()"
          class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          <fa-icon [icon]="faXmark"></fa-icon>
          No
        </button>
      </div>
    </div>
  `,
  styles: [``],
})
export class AdminLogoutDialogComponent {
  faSignOut = faSignOut;
  faXmark = faXmark;
  faCheck = faCheck;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(
    public dialogRef: MatDialogRef<AdminLogoutDialogComponent>,
    private router: Router
  ) {}

  onNoClick(): void {
    this.dialogRef.close(true);
  }

  onYesClick(): void {
    this.router
      .navigate(['/auth/logout'])
      .then(() => this.dialogRef.close(true));
  }
}
