import { MbamOneViewGetSitesResponseModelAccountOwner } from '@play.app/types/Mbam/MbamOneViewGetSitesResponseModelAccountOwner';
import { MbamOneViewGetSitesResponseModelSubscription } from '@play.app/types/Mbam/MbamOneViewGetSitesResponseModelSubscription';

export interface MbamOneViewSite {
  id: string;
  accountId: string;
  companyName: string;
  accountOwner: MbamOneViewGetSitesResponseModelAccountOwner[];
  firstname: string;
  lastname: string;
  email: string;
  is_removed: boolean;
  createddate: string;
  createdbyid: string;
  lastmodifiedbyid: string;
  lastmodifieddate: string;
  nebula_account_status: string;
  nebula_account_id: string;
  nebula_account_token: string;
  no_subscription: boolean;
  cloud_evaluation: boolean;
  utility: boolean;
  nfr: boolean;
  billing_date: number;
  subscriptions: MbamOneViewGetSitesResponseModelSubscription[];
  migration_audit_log: any[];
  workstation_installed: boolean;
  server_installed: boolean;
  mdr_enabled: boolean;
  account_id: string;
  account_status: string;
  site_end_date: string | null;
}
