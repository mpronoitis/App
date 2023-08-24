import { TwentyStateModel } from '../Models/TwentyStateModel';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { TwentyDomainService } from '@play.app/services/20i/TwentyDomain.service';
import { TwentyPackageService } from '@play.app/services/20i/TwentyPackage.service';
import {
  CheckMalwareScan,
  GetDomainPeriods,
  GetDomains,
  GetPackage,
  GetPackageLimits,
  GetPackages,
  GetPackagesWebLogs,
  GetPackageTypes,
  GetStackUsers,
  GetStartMalwareScan,
  GetStartMassScan,
  GetTwentyiDomainCount,
  GetTwentyiPackagesCount,
  SearchDomains,
} from '../Actions/twenty.actions';
import { last, tap } from 'rxjs';
import { TwentyResellerService } from '@play.app/services/20i/TwentyReseller.service';

@State<TwentyStateModel>({
  name: 'twenty',
  defaults: {
    domains: null,
    packages: null,
    packageDetails: null,
    packageLimits: null,
    domainSearch: null,
    packageTypes: null,
    stackUsers: null,
    statusMalware: null,
    packageWebLogs: null,
    domainsCount: null,
    packagesCount: null,
  },
})
@Injectable()
export class TwentyState {
  @Selector()
  static domains() {
    return this.domains || [];
  }
  @Selector()
  static packageWebLogs() {
    return this.packageWebLogs || [];
  }

  @Selector()
  static statusMalware() {
    return this.statusMalware || [];
  }

  constructor(
    private TwentyDomainService: TwentyDomainService,
    private TwentyPackageService: TwentyPackageService,
    private TwentyResellerService: TwentyResellerService
  ) {}

  @Action(GetDomains)
  getDomains({ getState, patchState }: StateContext<TwentyStateModel>) {
    return this.TwentyDomainService.getTwentyDomains().pipe(
      tap((result) => {
        const state = getState();
        patchState({
          ...state,
          domains: result,
        });
      })
    );
  }

  @Action(SearchDomains)
  searchDomains(
    { getState, patchState }: StateContext<TwentyStateModel>,
    { payload }: SearchDomains
  ) {
    return this.TwentyDomainService.searchTwentyDomains(payload.query).pipe(
      tap((result) => {
        const state = getState();
        patchState({
          ...state,
          domainSearch: result,
        });
      })
    );
  }

  @Action(GetDomainPeriods)
  getDomainPeriods({ getState, patchState }: StateContext<TwentyStateModel>) {
    return this.TwentyDomainService.getDomainPeriods().pipe(
      tap((result) => {
        const state = getState();
        patchState({
          ...state,
          domains: result,
        });
      })
    );
  }

  @Action(GetPackages)
  getPackages({ getState, patchState }: StateContext<TwentyStateModel>) {
    return this.TwentyPackageService.getTwentyPackages().pipe(
      tap((result) => {
        const state = getState();
        patchState({
          ...state,
          packages: result,
        });
      })
    );
  }

  @Action(GetPackage)
  getPackage(
    { getState, patchState }: StateContext<TwentyStateModel>,
    { payload }: GetPackage
  ) {
    return this.TwentyPackageService.getTwentyPackage(payload.id).pipe(
      tap((result) => {
        const state = getState();
        patchState({
          ...state,
          packageDetails: result,
        });
      })
    );
  }

  @Action(GetPackageLimits)
  getPackageLimits(
    { getState, patchState }: StateContext<TwentyStateModel>,
    { payload }: GetPackageLimits
  ) {
    return this.TwentyPackageService.getTwentyPackageLimits(payload.id).pipe(
      tap((result) => {
        const state = getState();
        patchState({
          ...state,
          packageLimits: result,
        });
      })
    );
  }

  @Action(GetPackageTypes)
  getPackageTypes({ getState, patchState }: StateContext<TwentyStateModel>) {
    return this.TwentyResellerService.getResellerPackageTypes().pipe(
      tap((result) => {
        const state = getState();
        //get last item of result

        patchState({
          ...state,
          packageTypes: result,
        });
      })
    );
  }

  @Action(GetStackUsers)
  getStackUsers({ getState, patchState }: StateContext<TwentyStateModel>) {
    return this.TwentyResellerService.getStackUsers().pipe(
      //from the response we want to get just the contact array
      //contact: { [key: string]: StackUser };
      tap((result) => {
        //loop through the contact array and push the values into an array
        const tempstackUsers = [];
        for (const key in result.contact) {
          tempstackUsers.push(result.contact[key]);
          //add the key to the object
          tempstackUsers[tempstackUsers.length - 1].id = key;
        }

        const state = getState();
        patchState({
          ...state,
          stackUsers: tempstackUsers,
        });
      })
    );
  }

  //action to start malware scan for a package
  @Action(GetStartMalwareScan)
  getStartMalwareScan(
    { getState, patchState }: StateContext<TwentyStateModel>,
    action: GetStartMalwareScan
  ) {
    return this.TwentyPackageService.getStartMalwareScan(
      action.payload.id
    ).pipe(
      tap((result) => {
        console.log(result);
      })
    );
  }

  //action to check status of malware scan
  @Action(CheckMalwareScan)
  checkMalwareScan(
    { getState, patchState }: StateContext<TwentyStateModel>,
    action: CheckMalwareScan
  ) {
    return this.TwentyPackageService.getCheckMalwareScan(
      action.payload.id
    ).pipe(
      tap((result: any) => {
        const state = getState();
        //get last item of result
        const lastItem = result[result.length - 1];
        patchState({
          ...state,
          statusMalware: lastItem,
        });
      })
    );
  }

  @Action(GetPackagesWebLogs)
  getPackagesWebLogs(
    { getState, patchState }: StateContext<TwentyStateModel>,
    action: GetPackagesWebLogs
  ) {
    return this.TwentyPackageService.getTwentyPackageWebLogs(
      action.payload.id
    ).pipe(
      tap((result) => {
        const state = getState();
        patchState({
          ...state,
          packageWebLogs: result,
        });
      })
    );
  }
  @Action(GetStartMassScan)
  getStarMassScan(
    { getState, patchState }: StateContext<TwentyStateModel>,
    action: GetStartMassScan
  ) {
    return this.TwentyPackageService.getStartMassScan(
      action.payload.packageIds
    ).pipe(
      tap((result) => {
        console.log(result);
      })
    );
  }

  /**
   * @summary Get the total count of packages
   */
  @Action(GetTwentyiPackagesCount)
  getPackagesCount(
    { getState, patchState }: StateContext<TwentyStateModel>,
    action: GetTwentyiPackagesCount
  ) {
    return this.TwentyPackageService.getTwentyPackagesCount().pipe(
      tap((result) => {
        const state = getState();
        patchState({
          ...state,
          packagesCount: result.count,
        });
      })
    );
  }

  /**
   * @summary Get the total count of domains
   */
  @Action(GetTwentyiDomainCount)
  getDomainsCount(
    { getState, patchState }: StateContext<TwentyStateModel>,
    action: GetTwentyiDomainCount
  ) {
    return this.TwentyDomainService.getTwentyDomainsCount().pipe(
      tap((result) => {
        const state = getState();
        patchState({
          ...state,
          domainsCount: result.count,
        });
      })
    );
  }
}
