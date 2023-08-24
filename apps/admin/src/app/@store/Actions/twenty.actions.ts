export class GetDomains {
  static readonly type = '[20i] Get Domains';
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}

export class SearchDomains {
  static readonly type = '[20i] Search Domains';
  constructor(public payload: { query: string }) {}
}

export class GetDomainPeriods {
  static readonly type = '[20i] Get Domain Periods';
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}

export class GetPackages {
  static readonly type = '[20i] Get Packages';
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}

export class GetPackage {
  static readonly type = '[20i] Get Package';
  constructor(public payload: { id: string }) {}
}

export class GetPackageLimits {
  static readonly type = '[20i] Get Package Limits';
  constructor(public payload: { id: string }) {}
}

export class GetPackageTypes {
  static readonly type = '[20i] Get Package Types';
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}

export class GetStackUsers {
  static readonly type = '[20i] Get Stack Users';
}

export class GetStartMalwareScan {
  static readonly type = '[20i] Get Start Malware Scan';
  constructor(public payload: { id: string }) {}
}

export class CheckMalwareScan {
  static readonly type = '[20i] Check Malware Scan';
  constructor(public payload: { id: string }) {}
}

export class GetPackagesWebLogs {
  static readonly type = '[20i] Get Packages Web Logs';
  constructor(public payload: { id: string }) {}
}

export class GetStartMassScan {
  static readonly type = '[20i] Get Start Mass Scan';
  constructor(public payload: { packageIds: string[] }) {}
}

/**
 * @summary Get total count of domains
 */
export class GetTwentyiDomainCount {
  static readonly type = '[20i] Get Domains Count';
}

/**
 * @summary Get total count of packages
 */
export class GetTwentyiPackagesCount {
  static readonly type = '[20i] Get Packages Count';
}
