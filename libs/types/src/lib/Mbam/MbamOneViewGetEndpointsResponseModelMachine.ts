class MbamOneViewGetEndpointsResponseModelAccount {}

class MbamOneViewGetEndpointsResponseModelJob {}

export interface MbamOneViewGetEndpointsResponseModelMachine {
  suspiciousActivityCount: number;
  scan_age_days: number;
  lastDaySeen: string;
  isolated: boolean;
  infectionCount: number;
  rebootRequired: number;
  lastScannedAt: string;
  isDeleted: boolean;
  reboot_required_reason: any[];
  group_id: string;
  id: string;
  created_at: string;
  root_group_id: string;
  account_id: string;
  account: MbamOneViewGetEndpointsResponseModelAccount;
  group_name: string;
  policy_name: string;
  policy_id: string;
  job: MbamOneViewGetEndpointsResponseModelJob;
  online: boolean;
}
