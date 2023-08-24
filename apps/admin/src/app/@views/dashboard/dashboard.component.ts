import { Component } from '@angular/core';
import {
  faArrowTrendUp,
  faFileLines,
  faUsers,
  faRefresh,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngxs/store';
import { GetUsers } from '../../@store/Actions/users.action';
import { User } from '@play.app/types/User/User';
import {
  GetEdiConnectionCount,
  GetEdiDocumentCount,
  GetEdiModelCount,
  GetEdiProfileCount,
  GetEdiSegmentCount,
  GetEdiVariableCount,
} from '../../@store/Actions/edi.actions';
import {
  GetTwentyiDomainCount,
  GetTwentyiPackagesCount,
} from '../../@store/Actions/twenty.actions';
import { GetWhmcsSystemStats } from '../../@store/Actions/whmcs.action';
import { MatDialog } from '@angular/material/dialog';
import { AddUserDialogComponent } from '../../@dialogs/User/add-user-dialog/add-user-dialog.component';
import {
  GetPylonContactsCountByDateRange,
  GetPylonDocEntriesCountByDateRange,
  GetPylonItemsCountByDateRange,
} from '../../@store/Actions/pylon.action';
import {
  GetMbamSiteCount,
  GetMbamUserCount,
} from '../../@store/Actions/mbam.action';

@Component({
  selector: 'play-app-admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  //icons
  faArrowTrendUp = faArrowTrendUp;
  faUsers = faUsers;
  faFileLines = faFileLines;
  faRefresh = faRefresh;
  faPlus = faPlus;

  //user chart data
  userChartData = [
    {
      name: 'Users',
      value: 0,
    },
  ];
  //edi chart data
  totalEdiDocuments = 0;
  ediChartData = [
    {
      name: 'Connections',
      value: 0,
    },
    {
      name: 'Models',
      value: 0,
    },
    {
      name: 'Profiles',
      value: 0,
    },
    {
      name: 'Segments',
      value: 0,
    },
    {
      name: 'Variables',
      value: 0,
    },
  ];
  //20i chart data
  twentyiChartData = [
    {
      name: 'Domains',
      value: 0,
    },
    {
      name: 'Packages',
      value: 0,
    },
  ];

  //whmcs stats
  totalWhmcsRevenue = 0;
  whmcsChartData = [
    {
      name: 'Orders Today',
      value: 0,
    },
    {
      name: 'Staff Online',
      value: 0,
    },
  ];

  //pylon stats
  pylonChartData = [
    {
      name: 'Items',
      value: 0,
    },
    {
      name: 'Contacts',
      value: 0,
    },
    {
      name: 'Invoices',
      value: 0,
    },
  ];

  //mbam stats
  mbamChartData = [
    {
      name: 'Clients',
      value: 0,
    },
    {
      name: 'Sites',
      value: 0,
    },
  ];

  //loading flags
  pylonChartLoading = false;
  userChartLoading = false;
  ediChartLoading = false;
  twentyiChartLoading = false;
  whmcsChartLoading = false;
  mbamChartLoading = false;
  showUserCreateModal = false;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private store: Store, private dialog: MatDialog) {
    //create list of promises to run
    const promises = [
      this.buildUserChartData(),
      this.getEdiData(),
      this.getTwentyiData(),
      this.getWhmcsData(),
      this.getPylonData(),
      this.getMbamData(),
    ];

    //run promises
    Promise.all(promises).then(() => {
      console.log('done');
    });
    this.refresh(); //refresh Dashboard
  }

  /**
   * @summary Promise that gets the users from the store and builds the chart data
   * @returns Promise<void>
   *
   */
  async buildUserChartData(): Promise<void> {
    //empty array of users
    let users: User[] = [];
    //set loading flag
    this.userChartLoading = true;
    //dispatch action to get users
    const sub = this.store
      .dispatch(new GetUsers({ page: 1, pageSize: 1000 }))
      .subscribe({
        next: (result) => {
          users = result.users.users;
          //set the user chart data
          this.userChartData = [
            {
              name: 'Users',
              value: users.length,
            },
            {
              name: 'Admins',
              value: users.filter((user) => user.role === 'PlayAdmin').length,
            },
            {
              name: 'Customers',
              value: users.filter((user) => user.role === 'Customer').length,
            },
          ];
          this.userChartLoading = false;
          sub.unsubscribe();
          return;
        },
        error: (error) => {
          this.userChartLoading = false;
          console.log(error);
          sub.unsubscribe();
          return;
        },
      });
  }
  /**
   * @summary Function to toggle the user create modal when button is clicked
   * @returns void
   *
   */
  openUserCreateModal() {
    this.dialog.open(AddUserDialogComponent);
  }

  /**
   * @summary Refresh All Data to Dashboard
   * @returns Promise<void>
   *
   */

  refresh() {
    //create list of promises to run
    const promises = [
      this.buildUserChartData(),
      this.getEdiData(),
      this.getTwentyiData(),
      this.getWhmcsData(),
    ];

    //run promises
    Promise.all(promises).then(() => {
      console.log('done');
    });
  }

  /**
   * @summary Function that gets the edi data required for the chart
   * We will need to dispatch the following actions:
   * 1. GetEdiDocumentCount
   * 2. GetEdiVariableCount
   * 3. GetEdiModelCount
   * 4. GetEdiConnectionCount
   * 5. GetEdiProfileCount
   * 6. GetEdiSegmentCount
   * After we have the data we will need to update the ediChartData array
   */
  async getEdiData(): Promise<void> {
    //set loading flag
    this.ediChartLoading = true;
    //start dsipatching actions
    //dispatch action to get document count
    const sub = this.store.dispatch(new GetEdiDocumentCount()).subscribe({
      next: (result) => {
        this.totalEdiDocuments = result.edi.ediDocumentCount;
        sub.unsubscribe();
        //dispatch action to get variable count
        const sub2 = this.store.dispatch(new GetEdiVariableCount()).subscribe({
          next: (result) => {
            this.ediChartData[4].value = result.edi.ediVariablesCount;
            sub2.unsubscribe();
            //dispatch action to get model count
            const sub3 = this.store.dispatch(new GetEdiModelCount()).subscribe({
              next: (result) => {
                this.ediChartData[1].value = result.edi.ediModelsCount;
                sub3.unsubscribe();
                //dispatch action to get connection count
                const sub4 = this.store
                  .dispatch(new GetEdiConnectionCount())
                  .subscribe({
                    next: (result) => {
                      this.ediChartData[0].value =
                        result.edi.ediConnectionsCount;
                      sub4.unsubscribe();
                      //dispatch action to get profile count
                      const sub5 = this.store
                        .dispatch(new GetEdiProfileCount())
                        .subscribe({
                          next: (result) => {
                            this.ediChartData[2].value =
                              result.edi.ediProfilesCount;
                            sub5.unsubscribe();
                            //dispatch action to get segment count
                            const sub6 = this.store
                              .dispatch(new GetEdiSegmentCount())
                              .subscribe({
                                next: (result) => {
                                  this.ediChartData[3].value =
                                    result.edi.ediSegmentsCount;
                                  sub6.unsubscribe();
                                  this.ediChartLoading = false;
                                  return;
                                },
                                error: (error) => {
                                  console.log(error);
                                  sub6.unsubscribe();
                                  return;
                                },
                              });
                            return;
                          },
                        });
                    },
                    error: (error) => {
                      console.log(error);
                      sub4.unsubscribe();
                      return;
                    },
                  });
              },
              error: (error) => {
                console.log(error);
                sub3.unsubscribe();
                return;
              },
            });
          },
          error: (error) => {
            console.log(error);
            sub2.unsubscribe();
          },
        });
      },
      error: (error) => {
        sub.unsubscribe();
        console.log(error);

        return;
      },
    });
  }

  /**
   * @summary Function that gets the 20i data required for the chart
   * We will need to dispatch the following actions:
   * 1. GetTwentyiDomainCount
   * 2. GetTwentyiPackageCount
   */
  async getTwentyiData(): Promise<void> {
    //set loading flag
    this.twentyiChartLoading = true;
    //start dsipatching actions
    //dispatch action to get domain count
    const sub = this.store.dispatch(new GetTwentyiDomainCount()).subscribe({
      next: (result) => {
        this.twentyiChartData[0].value = result.twenty.domainsCount;
        sub.unsubscribe();
        //dispatch action to get package count
        const sub2 = this.store
          .dispatch(new GetTwentyiPackagesCount())
          .subscribe({
            next: (result) => {
              this.twentyiChartData[1].value = result.twenty.packagesCount;
              sub2.unsubscribe();
              this.twentyiChartLoading = false;
              return;
            },
            error: (error) => {
              console.log(error);
              sub2.unsubscribe();
              return;
            },
          });
      },
      error: (error) => {
        sub.unsubscribe();
        console.log(error);
        return;
      },
    });
  }

  /**
   * @summary Get whmcs stats
   */
  async getWhmcsData(): Promise<void> {
    //set loading flag
    this.whmcsChartLoading = true;
    //start dsipatching actions
    //dispatch action to get domain count
    const sub = this.store.dispatch(new GetWhmcsSystemStats()).subscribe({
      next: (result) => {
        //sample of stats response
        //result=success;income_today=€0,00 EUR;income_thismonth=€223,11 EUR;income_thisyear=€812,92 EUR;income_alltime=€812,92 EUR;orders_pending=0;orders_today_cancelled=0;orders_today_pending=0;orders_today_fraud=0;orders_today_active=0;orders_today_total=0;orders_yesterday_cancelled=0;orders_yesterday_pending=0;orders_yesterday_fraud=0;orders_yesterday_active=0;orders_yesterday_total=0;orders_thismonth_total=7;orders_thisyear_total=75;tickets_allactive=0;tickets_awaitingreply=0;tickets_flaggedtickets=0;tickets_open=0;tickets_answered=0;tickets_customerreply=0;tickets_closed=0;tickets_onhold=0;tickets_inprogress=0;cancellations_pending=4;todoitems_due=0;networkissues_open=0;billableitems_uninvoiced=0;quotes_valid=0;staff_online=3;timeline_data=Array

        //get income this month by finding the string between ; with text income_thismonth
        let incomeThisMonth = result.whmcs.stats
          .split('income_thismonth=')[1]
          .split(';')[0];
        //keep only the number before the comma
        incomeThisMonth = incomeThisMonth.split(',')[0];
        //drop euro sign
        incomeThisMonth = incomeThisMonth.replace('€', '');
        //add to chart data
        this.totalWhmcsRevenue = incomeThisMonth;

        //get orders today total by finding the string between ; with text orders_today_total
        //add to chart data
        this.whmcsChartData[0].value = result.whmcs.stats
          .split('orders_today_total=')[1]
          .split(';')[0];

        //get staff online by finding the string between ; with text staff_online
        //add to chart data
        this.whmcsChartData[1].value = result.whmcs.stats
          .split('staff_online=')[1]
          .split(';')[0];
        sub.unsubscribe();
        this.whmcsChartLoading = false;
        return;
      },
      error: (error) => {
        sub.unsubscribe();
        console.log(error);
        return;
      },
    });
  }

  /**
   * @summary Get pylon chart data
   */
  async getPylonData(): Promise<void> {
    //get a month ago and convert to iso string
    const monthAgo = new Date();
    monthAgo.setMonth(monthAgo.getMonth() - 1);
    const monthAgoIso = monthAgo.toISOString();
    //get today and convert to iso string
    const today = new Date();
    const todayIso = today.toISOString();
    //set loading flag
    this.pylonChartLoading = true;
    //start dsipatching actions
    //dispatch action to get items count for the last month
    const sub = this.store
      .dispatch(
        new GetPylonItemsCountByDateRange({
          startDate: monthAgoIso,
          endDate: todayIso,
        })
      )
      .subscribe({
        next: (result) => {
          //get result.pylon.pylonItemsCount
          this.pylonChartData[0].value = result.pylon.pylonItemsCount;
          sub.unsubscribe();
          //get contacts count for the last month
          const sub2 = this.store
            .dispatch(
              new GetPylonContactsCountByDateRange({
                startDate: monthAgoIso,
                endDate: todayIso,
              })
            )
            .subscribe({
              next: (result) => {
                //get result.pylon.pylonContactsCount
                this.pylonChartData[1].value = result.pylon.pylonContactsCount;
                sub2.unsubscribe();
                //get invoices
                const sub3 = this.store
                  .dispatch(
                    new GetPylonDocEntriesCountByDateRange({
                      startDate: monthAgoIso,
                      endDate: todayIso,
                    })
                  )
                  .subscribe({
                    next: (result) => {
                      //get result.pylon.pylonDocEntriesCount
                      this.pylonChartData[2].value =
                        result.pylon.pylonDocEntriesCount;
                      sub3.unsubscribe();
                      this.pylonChartLoading = false;
                      return;
                    },
                    error: (error) => {
                      console.log(error);
                      sub3.unsubscribe();
                      return;
                    },
                  });
              },
              error: (error) => {
                sub2.unsubscribe();
                console.log(error);
                return;
              },
            });
        },
        error: (error) => {
          console.log(error);
          sub.unsubscribe();
          return;
        },
      });
  }

  /**
   * @summary Get mbam chart data
   */
  async getMbamData(): Promise<void> {
    //first user count then site count
    //set loading flag
    this.mbamChartLoading = true;
    //start dsipatching actions
    //dispatch action to get user count
    const sub = this.store.dispatch(new GetMbamUserCount()).subscribe({
      next: (result) => {
        //get result.mbam.userCount
        this.mbamChartData[0].value = result.mbam.userCount;
        sub.unsubscribe();
        //get site count
        const sub2 = this.store.dispatch(new GetMbamSiteCount()).subscribe({
          next: (result) => {
            //get result.mbam.siteCount
            this.mbamChartData[1].value = result.mbam.siteCount;
            sub2.unsubscribe();
            this.mbamChartLoading = false;
            return;
          },
          error: (error) => {
            sub2.unsubscribe();
            console.log(error);
            return;
          },
        });
      },
    });
  }
}
