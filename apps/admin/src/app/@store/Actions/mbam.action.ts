/**
 * @summary Action to get all malwarebytes oneview users
 */
export class GetMbamUsers {
  static readonly type = '[Mbam] Get Users';
}

/**
 * @summary Action to get all malwarebytes oneview sites
 */
export class GetMbamSites {
  static readonly type = '[Mbam] Get Sites';
}

/**
 * @summary Get endpoints for a given account id (found in the site object)
 * @param accountId
 */
export class GetMbamEndpoints {
  static readonly type = '[Mbam] Get Endpoints';

  constructor(public payload: { accountId: string }) {}
}

/**
 * @summary get total site count
 */
export class GetMbamSiteCount {
  static readonly type = '[Mbam] Get Site Count';
}

/**
 * @summary get total user count
 */
export class GetMbamUserCount {
  static readonly type = '[Mbam] Get User Count';
}

/**
 * @summary Get detections by account id (found in the site object)
 */
export class GetMbamDetections {
  static readonly type = '[Mbam] Get Detections';

  constructor(public payload: { accountId: string }) {}
}

/**
 * @summary Get all detections
 */
export class GetMbamAllDetections {
  static readonly type = '[Mbam] Get All Detections';
}
