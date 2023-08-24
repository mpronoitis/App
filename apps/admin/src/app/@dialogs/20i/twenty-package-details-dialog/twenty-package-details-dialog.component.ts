import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { TwentyPackageDetails } from '@play.app/types/20i/TwentyPackageDetails';
import {
  CheckMalwareScan,
  GetPackage,
  GetPackagesWebLogs,
  GetStartMalwareScan,
} from '../../../@store/Actions/twenty.actions';
import { FormControl, FormGroup } from '@angular/forms';
import {
  faChartArea,
  faChartBar,
  faDownload,
  faVirus,
  faCheck,
  faHistory,
} from '@fortawesome/free-solid-svg-icons';
import { formatDate } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { TwentyPackageWebLogs } from '@play.app/types/20i/TwentyPackageWebLogs';

@Component({
  selector: 'play-app-twenty-package-details-dialog',
  templateUrl: './twenty-package-details-dialog.component.html',
  styles: [],
})
export class TwentyPackageDetailsDialogComponent implements OnInit {
  loading = false;
  showAccordion = false; //show accordion section when data is loaded
  packageDetails: TwentyPackageDetails | undefined;
  packageWebLogs: TwentyPackageWebLogs | undefined;
  //icons
  faChartArea = faChartArea;
  faDownload = faDownload;
  faChartBar = faChartBar;
  faVirus = faVirus;
  faCheck = faCheck;
  faHistory = faHistory;

  //form group
  form = new FormGroup({
    ftpUsername: new FormControl(''),
    ftpPassword: new FormControl(''),
    ipv4: new FormControl(''),
    ipv6: new FormControl(''),
    names: new FormControl(''),
    stackusers: new FormControl(''),
    usage: new FormControl(''),
    createdAt: new FormControl(''),
    expiresAt: new FormControl(''),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    private store: Store,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.store.dispatch(new GetPackage({ id: this.data })).subscribe({
      next: (res) => {
        this.packageDetails = res.twenty.packageDetails;
        //build form
        this.form.patchValue({
          ftpUsername:
            this.packageDetails?.web.ftp_credentials[0]?.username || 'N/A',
          ftpPassword:
            this.packageDetails?.web.ftp_credentials[0]?.password || 'N/A',
          ipv4: this.packageDetails?.web.info.ip4Address || 'N/A',
          ipv6: this.packageDetails?.web.info.ip6Address || 'N/A',
          names: this.packageDetails?.names.join('\n') || 'N/A',
          stackusers: this.packageDetails?.stackUsers.join('\n') || 'N/A',
          usage: this.usageToString() || 'N/A',
          createdAt: this.packageDetails?.created
            ? formatDate(this.packageDetails?.created, 'dd/MM/yyyy', 'en')
            : 'N/A',
          expiresAt: this.packageDetails?.stackBilling?.expiresAt || 'N/A',
        });
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  awsStats() {
    //open url in new tab
    window.open(this.packageDetails?.web.info.statsUrls.AWStats, '_blank');
  }

  //get log files
  getLogFiles() {
    //open url in new tab
    window.open(this.packageDetails?.web.info.statsUrls.LogFiles, '_blank');
  }

  //webalizer stats
  webalizerStats() {
    //open url in new tab
    window.open(this.packageDetails?.web.info.statsUrls.Webalizer, '_blank');
  }

  startMalwareScan() {
    //start Malware Scan

    try {
      this.loading = true;
      this.store
        .dispatch(new GetStartMalwareScan({ id: this.data }))
        .subscribe({
          next: (res) => {
            console.log(res);
          },
          error: (err) => {
            console.log(err);
          },
          complete: () => {
            this.loading = false;
            this.toastr.success('Malware Scan Started');
          },
        });
    } catch (err) {
      console.log(err);
    }
  }

  checkMalwareScan() {
    //check Malware Scan

    try {
      this.loading = true;
      this.store.dispatch(new CheckMalwareScan({ id: this.data })).subscribe({
        //get all malware scans
        next: (res) => {
          console.log('CHECK MALWARE SCAN', res.twenty);
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          this.loading = false;

          const statusMalware = this.store.selectSnapshot(
            (state) => state.twenty.statusMalware //take only last malware scan for this package
          );

          if (statusMalware.status === 'completed') {
            //if completed
            this.toastr.success('Malware Scan Completed');
          } else {
            this.toastr.info('Malware Scan InProgress'); //else in progress
          }
        },
      });
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * @summary convert usage object to multiline string
   */
  usageToString() {
    let usageString = '';
    //get MySqlDatabases
    usageString += `MySqlDatabases: ${this.packageDetails?.web.info.usage.MySqlDatabases} \n`;
    //get ServerAliases
    usageString += `ServerAliases: ${this.packageDetails?.web.info.usage.ServerAliases} \n`;
    //get virtual host names
    usageString += `VirtualHostNames: ${this.packageDetails?.web.info.usage.VirtualHostNames} \n`;
    return usageString;
  }

  packagesWebLogs() {
    try {
      this.loading = true;
      this.store.dispatch(new GetPackagesWebLogs({ id: this.data })).subscribe({
        next: (res) => {
          this.packageWebLogs = res.twenty.packageWebLogs;
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          this.loading = false;
          this.showAccordion = true; //show accordion area
          this.toastr.success('Web Logs Fetched');
        },
      });
    } catch (err) {
      console.log(err);
    }
  }
}
