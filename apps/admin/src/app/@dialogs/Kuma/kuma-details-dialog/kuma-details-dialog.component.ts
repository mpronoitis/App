import { Component, Inject } from '@angular/core';
import { KumaNotificationService } from '@play.app/services/Kuma/KumaNotification.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { KumaNotification } from '@play.app/types/Kuma/KumaNotification';
import {
  faCheckCircle,
  faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  template: `
    <h1 mat-dialog-title>Incidents for the last month</h1>
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
      <!-- grid for displaying the notifications -->
      <ng-container *ngFor="let notification of notifications; let i = index">
        <div
          class="flex flex-col md:flex-row md:items-center md:justify-between p-4 bg-white rounded-lg shadow-lg mb-4"
        >
          <!-- left side -->
          <div class="flex flex-col md:flex-row md:items-center">
            <!-- icon -->
            <div
              class="flex items center justify-center w-12 h-12 rounded-full mr-4"
              [ngClass]="
                notification.msg.includes('200')
                  ? 'bg-green-100 text-green-500'
                  : 'bg-red-100 text-red-500'
              "
            >
              <fa-icon
                *ngIf="notification.msg.includes('200')"
                class="text-2xl mt-2"
                [icon]="faCheckCircle"
              ></fa-icon>
              <fa-icon
                *ngIf="!notification.msg.includes('200')"
                class="text-2xl mt-2"
                [icon]="faExclamationCircle"
              ></fa-icon>
            </div>
            <!-- title -->
            <div class="flex flex-col">
              <h3 class="text-lg font-semibold text-gray-700">
                {{ notification.monitor.url }}
              </h3>
              <p class="text-sm text-gray-500">
                {{ notification.msg.replace('?', '') }}
              </p>
            </div>
          </div>
          <!-- right side -->
          <div class="flex flex-col md:flex-row md:items-center mt-4 md:mt-0">
            <!-- date -->
            <p class="text-sm text-gray-500 mr-4">
              {{ notification.receivedAt | date: 'medium' }}
            </p>
          </div>
        </div>
      </ng-container>
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
  styles: [],
})
export class KumaDetailsDialogComponent {
  notifications: KumaNotification[] = [];
  //icons
  faCheckCircle = faCheckCircle;
  faExclamationCircle = faExclamationCircle;

  //loading flag
  loading = false;

  constructor(
    private NotificationService: KumaNotificationService,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {
    this.loading = true;
    //get all incidents for the last month for the url provided
    //get date 30 days ago and today in ISO format
    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const todayISO = today.toISOString();
    const thirtyDaysAgoISO = thirtyDaysAgo.toISOString();
    const sub = this.NotificationService.getIncidentsForUrlAndTimeRange(
      this.data,
      thirtyDaysAgoISO,
      todayISO
    ).subscribe((data) => {
      if (data) {
        this.notifications = data;
        //loop through notifications and strip http,https and trailing slash from monitor.url
        this.notifications.forEach((notification) => {
          notification.monitor.url = notification.monitor.url
            .replace(/(^\w+:|^)\/\//, '')
            .replace(/\/$/, '');
          //strip www
          notification.monitor.url = notification.monitor.url.replace(
            'www.',
            ''
          );
        });
      }
      sub.unsubscribe();
      this.loading = false;
    });
  }
}
