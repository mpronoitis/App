import { Component, OnInit } from '@angular/core';
import { KumaNotification } from '@play.app/types/Kuma/KumaNotification';
import { KumaNotificationService } from '@play.app/services/Kuma/KumaNotification.service';
import {
  faCheckCircle,
  faExclamationCircle,
  faEllipsisH,
} from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { KumaDetailsDialogComponent } from '../../../@dialogs/Kuma/kuma-details-dialog/kuma-details-dialog.component';

@Component({
  selector: 'play-app-kuma-notification',
  templateUrl: './kuma-notification.component.html',
  styleUrls: ['./kuma-notification.component.scss'],
})
export class KumaNotificationComponent implements OnInit {
  refreshInterval = 60000;
  showRefreshIntervalDropdown = false;
  notifications: KumaNotification[] = [];
  loading = false;
  //array of domains we want to fetch the last notification for
  domains = [
    'www.playsystems.io',
    'support.playsystems.io',
    'cp.playcloudservices.com',
    'playsystems.gr',
    'wiki.playsystems.io',
    'traefik.playsystems.io',
  ];

  //icons
  faCheckCircle = faCheckCircle;
  faExclamationCircle = faExclamationCircle;
  faEllipsisH = faEllipsisH;

  //eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(
    private notificationService: KumaNotificationService,
    private Dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getNotifications();
    //get notifications every refreshInterval
    setInterval(() => {
      this.getNotifications();
    }, this.refreshInterval);
  }

  getNotifications() {
    //get notifications for each domain, after all is done, set loading to false
    this.loading = true;
    //clear notifications array
    this.notifications = [];
    this.domains.forEach((domain) => {
      this.loading = true;
      const sub = this.notificationService
        .getLatestEntryForUrl(domain)
        .subscribe((data) => {
          if (data) {
            //strip http,https and trailing slash from monitor.url
            data.monitor.url = data.monitor.url
              .replace(/(^\w+:|^)\/\//, '')
              .replace(/\/$/, '');
            //strip www
            data.monitor.url = data.monitor.url.replace('www.', '');
            //add notification to array
            this.notifications.push(data);

            sub.unsubscribe();
          }
          this.loading = false;
        });
    });
  }

  /**
   * @summary Display a dialog for a given url
   * @param url
   */
  showIncidents(url: string) {
    this.Dialog.open(KumaDetailsDialogComponent, {
      data: url,
      width: '80%',
    });
  }
}
