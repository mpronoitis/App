export interface RenewalConstraint {
  gracePeriod: number;
  redemptionPeriod: number;
}

export interface PackageInfo {
  platform: string;
  label: string;
}

export interface TwentyDomain {
  deadDate: Date;
  expiryDate: Date;
  id: number;
  name: string;
  pendingTransfer: boolean;
  renewalConstraint: RenewalConstraint;
  packageInfo: PackageInfo;
  preferredRenewalAction: string;
  preferredRenewalMonths: number;
}
