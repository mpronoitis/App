import { MbamStateModel } from '../Models/MbamStateModel';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { MbamUserService } from '@play.app/services/Mbam/MbamUser.service';
import { ToastrService } from 'ngx-toastr';
import {
  GetMbamAllDetections,
  GetMbamDetections,
  GetMbamEndpoints,
  GetMbamSiteCount,
  GetMbamSites,
  GetMbamUserCount,
  GetMbamUsers,
} from '../Actions/mbam.action';
import { tap } from 'rxjs';
import { MbamSiteService } from '@play.app/services/Mbam/MbamSite.service';
import { MbamDetectionService } from '@play.app/services/Mbam/MbamDetection.service';

@State<MbamStateModel>({
  name: 'mbam',
  defaults: {
    users: null,
    sites: null,
    endpoints: null,
    siteCount: null,
    userCount: null,
    detections: null,
  },
})
@Injectable()
export class MbamState {
  constructor(
    private UserService: MbamUserService,
    private SiteService: MbamSiteService,
    private toastr: ToastrService,
    private DetectionService: MbamDetectionService
  ) {}

  @Action(GetMbamUsers)
  getUsers({ patchState }: StateContext<MbamStateModel>) {
    return this.UserService.getAllUsers().pipe(
      tap({
        next: (result: any) => {
          patchState({
            users: result,
          });
        },
        error: (error) => {
          //if response code is 400
          if (error.status === 400) {
            this.toastr.error('Error');
          }
          //if any other error
          else {
            this.toastr.error(
              'Error while getting client domains, please try again later'
            );
          }
        },
      })
    );
  }

  @Action(GetMbamSites)
  getSites({ patchState }: StateContext<MbamStateModel>) {
    return this.SiteService.getAllSites().pipe(
      tap({
        next: (result: any) => {
          patchState({
            sites: result,
          });
        },
        error: (error) => {
          //if response code is 400
          if (error.status === 400) {
            this.toastr.error('Error');
          }
          //if any other error
          else {
            this.toastr.error(
              'Error while getting client domains, please try again later'
            );
          }
        },
      })
    );
  }

  @Action(GetMbamEndpoints)
  getEndpoints(
    { patchState }: StateContext<MbamStateModel>,
    { payload }: GetMbamEndpoints
  ) {
    return this.SiteService.getEndpoints(payload.accountId).pipe(
      tap({
        next: (result: any) => {
          patchState({
            endpoints: result,
          });
        },
        error: (error) => {
          //if response code is 400
          if (error.status === 400) {
            this.toastr.error('Error');
          }
          //if any other error
          else {
            this.toastr.error(
              'Error while getting client domains, please try again later'
            );
          }
        },
      })
    );
  }

  @Action(GetMbamSiteCount)
  getSiteCount({ patchState }: StateContext<MbamStateModel>) {
    return this.SiteService.getSiteCount().pipe(
      tap({
        next: (result: any) => {
          patchState({
            siteCount: result.count,
          });
        },
        error: (error) => {
          //if response code is 400
          if (error.status === 400) {
            this.toastr.error('Error');
          }
          //if any other error
          else {
            this.toastr.error(
              'Error while getting client domains, please try again later'
            );
          }
        },
      })
    );
  }

  @Action(GetMbamUserCount)
  getUserCount({ patchState }: StateContext<MbamStateModel>) {
    return this.UserService.getUserCount().pipe(
      tap({
        next: (result: any) => {
          patchState({
            userCount: result.count,
          });
        },
        error: (error) => {
          //if response code is 400
          if (error.status === 400) {
            this.toastr.error('Error');
          }
          //if any other error
          else {
            this.toastr.error(
              'Error while getting client domains, please try again later'
            );
          }
        },
      })
    );
  }

  @Action(GetMbamDetections)
  getDetections({ patchState }: StateContext<MbamStateModel>) {
    return this.DetectionService.getAllDetections().pipe(
      tap({
        next: (result: any) => {
          patchState({
            detections: result,
          });
        },
        error: (error) => {
          //if response code is 400
          if (error.status === 400) {
            this.toastr.error('Error');
          }
          //if any other error
          else {
            this.toastr.error(
              'Error while getting client domains, please try again later'
            );
          }
        },
      })
    );
  }

  @Action(GetMbamAllDetections)
  getAllDetections({ patchState }: StateContext<MbamStateModel>) {
    return this.DetectionService.getAllDetections().pipe(
      tap({
        next: (result: any) => {
          patchState({
            detections: result,
          });
        },
        error: (error) => {
          //if response code is 400
          if (error.status === 400) {
            this.toastr.error('Error');
          }
          //if any other error
          else {
            this.toastr.error(
              'Error while getting client domains, please try again later'
            );
          }
        },
      })
    );
  }
}
