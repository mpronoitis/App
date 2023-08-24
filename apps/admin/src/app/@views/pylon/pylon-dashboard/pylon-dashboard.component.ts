import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import {
  GetPylonApplicationName,
  GetPylonSerial,
  GetPylonVersion,
} from '../../../@store/Actions/pylon.action';
import { PylonSysService } from '@play.app/services/Pylon/PylonSys.service';
import {
  faContactBook,
  faUsersBetweenLines,
  faBoxesPacking,
  faMoneyCheckDollar,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  templateUrl: './pylon-dashboard.component.html',
  styleUrls: ['./pylon-dashboard.component.scss'],
})
export class PylonDashboardComponent implements OnInit {
  //card data
  cardData = {
    version: '',
    serial: '',
    applicationName: '',
  };

  //icons
  faContactBook = faContactBook;
  faUsersBetweenLines = faUsersBetweenLines;
  faBoxesPacking = faBoxesPacking;
  faMoneyCheckDollar = faMoneyCheckDollar;

  //table variables
  show_sessions_table = false;
  show_contacts_table = false;
  show_items_table = false;
  show_pricing_table = false;
  expanded = false;

  //loading flag
  loading = false;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private store: Store, private PylonSysService: PylonSysService) {}

  ngOnInit(): void {
    //get all promises that need to be resolved
    const promises = [
      this.getPylonSerial(),
      this.getPylonApplicationName(),
      this.getPylonVersion(),
    ];

    //resolve all promises and after that set the loading flag to false
    this.loading = true;
    Promise.all(promises).then(
      () => {
        this.loading = false;
        this.show_contacts_table = true;
        this.expanded = true;
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  /**
   * @summary Get the pylon version
   */
  getPylonVersion(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.store.dispatch(new GetPylonVersion()).subscribe({
        next: (result: any) => {
          this.cardData.version = result.pylon.pylonVersion;
          resolve(true);
        },
        error: (error) => {
          console.log(error);
          reject(false);
        },
      });
    });
  }

  /**
   * @summary Get the pylon serial
   */
  getPylonSerial(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.store.dispatch(new GetPylonSerial()).subscribe({
        next: (result: any) => {
          this.cardData.serial = result.pylon.pylonSerial;
          resolve(true);
        },
        error: (error) => {
          console.log(error);
          reject(false);
        },
      });
    });
  }

  /**
   * @summary Get the pylon application name
   */
  getPylonApplicationName(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.store.dispatch(new GetPylonApplicationName()).subscribe({
        next: (result: any) => {
          this.cardData.applicationName = result.pylon.pylonApplicationName;
          resolve(true);
        },
        error: (error) => {
          console.log(error);
          reject(false);
        },
      });
    });
  }
}
