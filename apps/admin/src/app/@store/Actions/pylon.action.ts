export class GetPylonVersion {
  static readonly type = '[Pylon] Get Pylon Version';
}

export class GetPylonSerial {
  static readonly type = '[Pylon] Get Pylon Serial';
}

export class GetPylonApplicationName {
  static readonly type = '[Pylon] Get Pylon Application Name';
}

export class GetPylonSessions {
  static readonly type = '[Pylon] Get Pylon Sessions';
}

export class GetPylonContacts {
  static readonly type = '[Pylon] Get Pylon Contacts';

  constructor(public payload: { page: number; pageSize: number }) {}
}

/**
 * @summary Search for PylonContacts
 * @param query {string} Query to search
 * @param name {boolean} If we want to search by name
 * @param phone {boolean} If we want to search by phone
 * @param email {boolean} If we want to search by email
 * @param address {boolean} If we want to search by address
 *
 */
export class SearchPylonContacts {
  static readonly type = '[Pylon] Search Pylon Contacts';

  constructor(
    public payload: {
      query: string;
      name: boolean;
      phone: boolean;
      email: boolean;
      address: boolean;
    }
  ) {}
}

export class GetPylonItems {
  static readonly type = '[Pylon] Get Pylon Items';

  constructor(public payload: { page: number; pageSize: number }) {}
}

export class GetPylonItemByName {
  static readonly type = '[Pylon] Get Pylon Item By Name';

  constructor(public payload: { name: string }) {}
}

export class GetPylonItemsCount {
  static readonly type = '[Pylon] Get Pylon Items Count';
}

/**
 * @summary Get total count of items created in a given date range
 * @param startDate
 * @param endDate
 */
export class GetPylonItemsCountByDateRange {
  static readonly type = '[Pylon] Get Pylon Items Count By Date Range';

  constructor(public payload: { startDate: string; endDate: string }) {}
}

/**
 * @summary Get count of doc entries for a given date range
 * @param startDate
 * @param endDate
 */
export class GetPylonDocEntriesCountByDateRange {
  static readonly type = '[Pylon] Get Pylon Doc Entries Count By Date Range';

  constructor(public payload: { startDate: string; endDate: string }) {}
}

/**
 * @summary Get count of contacts created in a given date range
 * @param from {string} From date
 * @param to {string} To date
 */
export class GetPylonContactsCountByDateRange {
  static readonly type = '[Pylon] Get Pylon Contacts Count By Date Range';

  constructor(public payload: { startDate: string; endDate: string }) {}
}
