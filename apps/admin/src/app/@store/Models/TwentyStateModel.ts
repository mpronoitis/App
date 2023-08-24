import { TwentyDomain } from '@play.app/types/20i/TwentyDomain';
import { TwentyPackage } from '@play.app/types/20i/TwentyPackage';
import { TwentyPackageDetails } from '@play.app/types/20i/TwentyPackageDetails';
import { TwentyPackageLimits } from '@play.app/types/20i/TwentyPackageLimits';
import { TwentyDomainSearch } from '@play.app/types/20i/TwentyDomainSearch';
import { TwentyResellerPackageTypes } from '@play.app/types/20i/TwentyResellerPackageTypes';
import { TwentyStackUser } from '@play.app/types/20i/TwentyStackUser';
import { TwentyMalwareStatus } from '@play.app/types/20i/TwentyMalwareStatus';
import { TwentyPackageWebLogs } from '@play.app/types/20i/TwentyPackageWebLogs';

export interface TwentyStateModel {
  domains: TwentyDomain[] | null;
  packages: TwentyPackage[] | null;
  packageDetails: TwentyPackageDetails[] | null;
  packageLimits: TwentyPackageLimits[] | null;
  domainSearch: TwentyDomainSearch[] | null;
  packageTypes: TwentyResellerPackageTypes[] | null;
  stackUsers: TwentyStackUser[] | null;
  statusMalware: TwentyMalwareStatus[] | null;
  packageWebLogs: TwentyPackageWebLogs[] | null;
  domainsCount: number | null;
  packagesCount: number | null;
}
