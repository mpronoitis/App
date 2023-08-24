import { Action, Selector, State, StateContext } from '@ngxs/store';
import { PylonStateModel } from '../Models/PylonStateModel';
import { Injectable } from '@angular/core';
import { PylonSessionService } from '@play.app/services/Pylon/PylonSession.service';
import { PylonSysService } from '@play.app/services/Pylon/PylonSys.service';
import { PylonContactService } from '@play.app/services/Pylon/PylonContact.service';
import {
  GetPylonApplicationName,
  GetPylonContacts,
  GetPylonSerial,
  GetPylonSessions,
  GetPylonVersion,
  GetPylonItems,
  GetPylonItemByName,
  GetPylonItemsCount,
  SearchPylonContacts,
  GetPylonItemsCountByDateRange,
  GetPylonDocEntriesCountByDateRange,
  GetPylonContactsCountByDateRange,
} from '../Actions/pylon.action';
import { tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { PylonItemService } from '@play.app/services/Pylon/PylonItem.service';
import { PylonDocEntryService } from '@play.app/services/Pylon/PylonDocEntry.service';

@State<PylonStateModel>({
  name: 'pylon',
  defaults: {
    pylonSessions: null,
    pylonVersion: null,
    pylonSerial: null,
    pylonApplicationName: null,
    pylonContacts: null,
    pylonItems: null,
    pylonItemsCount: null,
    pylonContactsCount: null,
    pylonDocEntriesCount: null,
  },
})
@Injectable()
export class PylonState {
  constructor(
    private PylonSessionService: PylonSessionService,
    private PylonSysService: PylonSysService,
    private PylonContactService: PylonContactService,
    private PylonItemService: PylonItemService,
    private PylonDocEntryService: PylonDocEntryService,
    private toastr: ToastrService
  ) {}

  @Selector()
  static pylonSessions() {
    return this.pylonSessions;
  }

  @Selector()
  static pylonVersion() {
    return this.pylonVersion;
  }

  @Selector()
  static pylonSerial() {
    return this.pylonSerial;
  }

  @Selector()
  static pylonApplicationName() {
    return this.pylonApplicationName;
  }

  @Action(GetPylonVersion)
  getPylonVersion({ patchState }: StateContext<PylonStateModel>) {
    return this.PylonSysService.getSysByKey('Application Version').pipe(
      tap({
        next: (result: any) => {
          patchState({
            pylonVersion: result.value,
          });
        },
        error: (error) => {
          //if response code is 400
          if (error.status === 400) {
            this.toastr.error('Error');
          }
          //if any other error
          else {
            this.toastr.error('Error while getting Pylon Version');
          }
        },
      })
    );
  }

  @Action(GetPylonSerial)
  getPylonSerial({ patchState }: StateContext<PylonStateModel>) {
    return this.PylonSysService.getSysByKey('Installation Serial Number').pipe(
      tap({
        next: (result: any) => {
          patchState({
            pylonSerial: result.value,
          });
        },
        error: (error) => {
          //if response code is 400
          if (error.status === 400) {
            this.toastr.error('Error');
          }
          //if any other error
          else {
            this.toastr.error('Error while getting Pylon Serial');
          }
        },
      })
    );
  }

  @Action(GetPylonApplicationName)
  getPylonApplicationName({ patchState }: StateContext<PylonStateModel>) {
    return this.PylonSysService.getSysByKey('Product Caption').pipe(
      tap({
        next: (result: any) => {
          patchState({
            pylonApplicationName: result.value,
          });
        },
        error: (error) => {
          //if response code is 400
          if (error.status === 400) {
            this.toastr.error('Error');
          }
          //if any other error
          else {
            this.toastr.error('Error while getting Pylon Application Name');
          }
        },
      })
    );
  }

  @Action(GetPylonSessions)
  getPylonSessions({ patchState }: StateContext<PylonStateModel>) {
    return this.PylonSessionService.getSessions().pipe(
      tap({
        next: (result: any) => {
          patchState({
            pylonSessions: result,
          });
        },
        error: (error) => {
          //if response code is 400
          if (error.status === 400) {
            this.toastr.error('Error');
          }
          //if any other error
          else {
            this.toastr.error('Error while getting Pylon Sessions');
          }
        },
      })
    );
  }

  /**
   * @summary Get PylonContacts with pagination
   * @param patchState
   * @param payload contains page number and page size
   */
  @Action(GetPylonContacts)
  getPylonContacts(
    { patchState }: StateContext<PylonStateModel>,
    { payload }: GetPylonContacts
  ) {
    return this.PylonContactService.getAllPylonContacts(
      payload.page,
      payload.pageSize
    ).pipe(
      tap({
        next: (result: any) => {
          patchState({
            pylonContacts: result,
          });
        },
        error: (error) => {
          //if response code is 400
          if (error.status === 400) {
            this.toastr.error('Error');
          }
          //if any other error
          else {
            this.toastr.error('Error while getting Pylon Contacts');
          }
        },
      })
    );
  }

  /**
   * @summary Search for PylonContacts
   * @param query {string} Query to search
   * @param name {boolean} If we want to search by name
   *
   */
  @Action(SearchPylonContacts)
  searchPylonContacts(
    { patchState }: StateContext<PylonStateModel>,
    { payload }: SearchPylonContacts
  ) {
    return this.PylonContactService.searchPylonContacts(
      payload.query,
      payload.name,
      payload.phone,
      payload.email,
      payload.address
    ).pipe(
      tap({
        next: (result: any) => {
          patchState({
            pylonContacts: result,
          });
        },
        error: (error) => {
          //if response code is 400
          if (error.status === 400) {
            this.toastr.error('Error');
          }
          //if any other error
          else {
            this.toastr.error('Error while searching Pylon Contacts');
          }
        },
      })
    );
  }

  /**
   *  @summary Get PylonItems with pagination
   */
  @Action(GetPylonItems)
  getPylonItems(
    { patchState }: StateContext<PylonStateModel>,
    { payload }: GetPylonItems
  ) {
    return this.PylonItemService.getItems(payload.page, payload.pageSize).pipe(
      tap({
        next: (result: any) => {
          patchState({
            pylonItems: result,
          });
        },
        error: (error) => {
          //if response code is 400
          if (error.status === 400) {
            this.toastr.error('Error');
          }
          //if any other error
          else {
            this.toastr.error('Error while getting Pylon Items');
          }
        },
      })
    );
  }

  /**
   * @summary Get PylonItem by name
   */
  @Action(GetPylonItemByName)
  getPylonItemsByName(
    { patchState }: StateContext<PylonStateModel>,
    { payload }: GetPylonItemByName
  ) {
    return this.PylonItemService.getItemsByName(payload.name).pipe(
      tap({
        next: (result: any) => {
          patchState({
            pylonItems: result,
          });
        },
        error: (error) => {
          //if response code is 400
          if (error.status === 400) {
            this.toastr.error('Error');
          }
          //if any other error
          else {
            this.toastr.error('Error while getting Pylon Items');
          }
        },
      })
    );
  }

  /**
   * @summary Get PylonItem count
   */
  @Action(GetPylonItemsCount)
  GetPylonItemsCount({ patchState }: StateContext<PylonStateModel>) {
    return this.PylonItemService.getTotalCount().pipe(
      tap({
        next: (result: any) => {
          patchState({
            pylonItemsCount: result.count,
          });
        },
        error: (error) => {
          //if response code is 400
          if (error.status === 400) {
            this.toastr.error('Error');
          }
          //if any other error
          else {
            this.toastr.error('Error while getting Pylon Items');
          }
        },
      })
    );
  }

  /**
   * @summary Get total count of items created in a given date range
   * @param startDate
   * @param endDate
   */
  @Action(GetPylonItemsCountByDateRange)
  getPylonItemsCountByDateRange(
    { patchState }: StateContext<PylonStateModel>,
    { payload }: GetPylonItemsCountByDateRange
  ) {
    return this.PylonItemService.getTotalCountByDateRange(
      payload.startDate,
      payload.endDate
    ).pipe(
      tap({
        next: (result: any) => {
          patchState({
            pylonItemsCount: result.count,
          });
        },
        error: (error) => {
          //if response code is 400
          if (error.status === 400) {
            this.toastr.error('Error');
          }
          //if any other error
          else {
            this.toastr.error('Error while getting Pylon Items');
          }
        },
      })
    );
  }

  /**
   * @summary Get count of doc entries for a given date range
   * @param startDate
   * @param endDate
   */
  @Action(GetPylonDocEntriesCountByDateRange)
  getPylonDocEntriesCountByDateRange(
    { patchState }: StateContext<PylonStateModel>,
    { payload }: GetPylonDocEntriesCountByDateRange
  ) {
    return this.PylonDocEntryService.getCountByDateRange(
      payload.startDate,
      payload.endDate
    ).pipe(
      tap({
        next: (result: any) => {
          patchState({
            pylonDocEntriesCount: result.count,
          });
        },
        error: (error) => {
          //if response code is 400
          if (error.status === 400) {
            this.toastr.error('Error');
          }
          //if any other error
          else {
            this.toastr.error('Error while getting Pylon Doc Entries');
          }
        },
      })
    );
  }

  /**
   * @summary Get count of contacts created in a given date range
   * @param from {string} From date
   * @param to {string} To date
   */
  @Action(GetPylonContactsCountByDateRange)
  getPylonContactsCountByDateRange(
    { patchState }: StateContext<PylonStateModel>,
    { payload }: GetPylonContactsCountByDateRange
  ) {
    return this.PylonContactService.getCountByDateRange(
      payload.startDate,
      payload.endDate
    ).pipe(
      tap({
        next: (result: any) => {
          patchState({
            pylonContactsCount: result.count,
          });
        },
        error: (error) => {
          //if response code is 400
          if (error.status === 400) {
            this.toastr.error('Error');
          }
          //if any other error
          else {
            this.toastr.error('Error while getting Pylon Contacts');
          }
        },
      })
    );
  }
}
