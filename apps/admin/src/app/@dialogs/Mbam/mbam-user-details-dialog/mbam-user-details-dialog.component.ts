import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MbamOneViewUser } from '@play.app/types/Mbam/MbamOneViewUser';

@Component({
  template: `
    <h1 mat-dialog-title>User Details - {{ data.name }}</h1>
    <div class="border-t border-gray-200"></div>
    <div
      *ngIf="loading"
      class="text-center pt-5 mt-5"
      cdkFocusInitial
      mat-dialog-content
    >
      <play-components-simple-spinner
        *ngIf="loading"
        class="grow"
        mainColor="blue"
        id="spinner"
      ></play-components-simple-spinner>
    </div>
    <div *ngIf="!loading" cdkFocusInitial mat-dialog-content>
      <!-- using tailwind we want to create a grid with 2 columns - neuomorphic card -->
      <div class="grid grid-cols-2 gap-4 mb-4">
        <div class="bg-white rounded-lg shadow-lg p-4">
          <h3 class="text-lg font-semibold text-gray-700">Account id</h3>
          <p class="text-sm text-gray-500">{{ data.accountid }}</p>
        </div>
        <div class="bg-white rounded-lg shadow-lg p-4">
          <h3 class="text-lg font-semibold text-gray-700">Auth Roles</h3>
          <!-- loop authRoles array and display them as tailwind badges -->
          <ng-container *ngFor="let authRole of data.authRoles">
            <span
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2"
              >{{ authRole }}</span
            >
          </ng-container>
        </div>
        <div class="bg-white rounded-lg shadow-lg p-4">
          <h3 class="text-lg font-semibold text-gray-700">Sites</h3>
          <!-- loop through customers array and display them as tailwind badges each badge should have a random color and a tooltip with the customer email -->
          <ng-container *ngFor="let site of data.customers; let i = index">
            <span
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs text-white font-medium mr-2"
              [matTooltip]="site.email"
              [ngClass]="colors[i % colors.length]"
              >{{ site.companyName }}</span
            >
          </ng-container>
        </div>
        <div class="bg-white rounded-lg shadow-lg p-4">
          <h3 class="text-lg font-semibold text-gray-700">Statuses</h3>
          <!-- mfaEnabled, isActive using red or green tailwind badge -->
          <span
            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mr-2"
            [ngClass]="
              data.mfaEnabled
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            "
            >MFA Enabled</span
          >
          <span
            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mr-2"
            [ngClass]="
              data.isactive
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            "
            >Active</span
          >
          <!-- isVendor  using red or green tailwind badge -->
          <span
            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mr-2"
            [ngClass]="
              data.isVendor
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            "
            >Vendor</span
          >

          <!-- isSuspended using red or green tailwind badge -->
          <span
            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mr-2"
            [ngClass]="
              data.isSuspended
                ? 'bg-red-100 text-red-800'
                : 'bg-green-100 text-green-800'
            "
            >Suspended</span
          >
        </div>
      </div>
    </div>
    <mat-dialog-actions align="end">
      <button
        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        mat-dialog-close
        [mat-dialog-close]="false"
      >
        Close
      </button>
    </mat-dialog-actions>
    <ng-container> </ng-container>
  `,
  styles: [``],
})
export class MbamUserDetailsDialogComponent {
  loading = false;
  //random colors for the badges , all should be light colors
  colors = [
    'bg-blue-400',
    'bg-cyan-400',
    'bg-emerald-400',
    'bg-indigo-400',
    'bg-violet-400',
  ];

  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(@Inject(MAT_DIALOG_DATA) public data: MbamOneViewUser) {}
}
