import { Component } from '@angular/core';
import {
  faTag,
  faBoxesAlt,
  faHandshake,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngxs/store';
import { TwentyDomain } from '@play.app/types/20i/TwentyDomain';
import { TwentyPackage } from '@play.app/types/20i/TwentyPackage';
import {
  GetDomains,
  GetPackages,
  GetPackageTypes,
  GetStackUsers,
  GetStartMassScan,
} from '../../../@store/Actions/twenty.actions';
import { ToastrService } from 'ngx-toastr';
import { TwentyResellerPackageTypes } from '@play.app/types/20i/TwentyResellerPackageTypes';
import { TwentyStackUser } from '@play.app/types/20i/TwentyStackUser';

@Component({
  selector: 'play-app-twentyi-dashboard',
  templateUrl: './twentyi-dashoard.component.html',
  styleUrls: ['./twentyi-dashoard.component.scss'],
})
export class TwentyiDashoardComponent {
  //icons
  faTag = faTag;
  faBoxesAlt = faBoxesAlt;
  faHandshake = faHandshake;
  faUsers = faUsers;
  activeTable = '';
  loading = false; //loading flag
  expanded = false; //if the expansion panel is expanded

  //table flags
  show_domains_table = false;
  show_packages_table = false;
  show_package_types_table = false;
  show_users_table = false;

  //data
  domains: TwentyDomain[] = [];
  packages: TwentyPackage[] = [];
  packageTypes: TwentyResellerPackageTypes[] = [];
  stackUsers: TwentyStackUser[] = [];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private store: Store, private toastr: ToastrService) {
    this.getPackages();
  }

  /**
   * @summary Fetch domains from store
   */
  getDomains(): void {
    console.log('getting domains');
    this.loading = true;
    this.store.dispatch(new GetDomains()).subscribe({
      next: (res) => {
        try {
          this.domains = res.twenty.domains;
        } catch (err) {
          this.toastr.error();
          console.log(err);
        }
        this.loading = false;
        this.toastr.success('Fetched ' + this.domains.length + ' domains');
        this.show_domains_table = true;
        this.show_packages_table = false;
        this.show_package_types_table = false;
        this.show_users_table = false;
        this.expanded = true;
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('Error');
      },
    });
  }

  /**
   * @summary Fetch packages from store
   */
  getPackages(): void {
    this.loading = true;
    this.store.dispatch(new GetPackages()).subscribe({
      next: (res) => {
        try {
          this.packages = res.twenty.packages;
        } catch (err) {
          this.toastr.error();
          console.log(err);
        }
        this.loading = false;
        this.toastr.success('Fetched ' + this.packages.length + ' packages');
        this.show_packages_table = true;
        this.show_domains_table = false;
        this.show_package_types_table = false;
        this.show_users_table = false;
        this.expanded = true;
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('Error');
      },
    });
  }

  /**
   * @summary Fetch package types from store
   */
  getPackageTypes(): void {
    this.loading = true;
    this.store.dispatch(new GetPackageTypes()).subscribe({
      next: (res) => {
        try {
          this.packageTypes = res.twenty.packageTypes;
        } catch (err) {
          this.toastr.error();
          console.log(err);
        }
        this.loading = false;
        this.toastr.success(
          'Fetched ' + this.packageTypes.length + ' package types'
        );
        this.show_packages_table = false;
        this.show_domains_table = false;
        this.show_package_types_table = true;
        this.show_users_table = false;
        this.expanded = true;
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('Error');
      },
    });
  }

  /**
   * @summary Fetch stack users from store
   */
  getStackUsers(): void {
    this.loading = true;
    this.store.dispatch(new GetStackUsers()).subscribe({
      next: (res) => {
        try {
          this.stackUsers = res.twenty.stackUsers;
        } catch (err) {
          this.toastr.error();
          console.log(err);
        }
        this.loading = false;
        this.toastr.success(
          'Fetched ' + this.stackUsers.length + ' stack users'
        );
        this.show_packages_table = false;
        this.show_domains_table = false;
        this.show_package_types_table = false;
        this.show_users_table = true;
        this.expanded = true;
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('Error');
      },
    });
  }
  startMalwareScan(packageIds: string[]) {
    if (packageIds.length > 0) {
      this.loading = true;
      this.store
        .dispatch(new GetStartMassScan({ packageIds: packageIds }))
        .subscribe({
          next: (res) => {
            this.toastr.success(
              'Started Malware scan for ' + packageIds.length + ' packages'
            );
          },
          error: (err) => {
            console.log(err);
          },
          complete: () => {
            this.loading = false;
          },
        });
    } else {
      this.toastr.error();
    }
  }
}
