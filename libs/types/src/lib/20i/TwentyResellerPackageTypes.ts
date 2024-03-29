export interface TwentyResellerPackageTypes {
  extraData: ExtraData;
  id: number;
  label: string;
  limits: Limits;
  platform: string;
  installApps: string[];
  welcomeEmail?: string;
  passwordResetEmail: any;
}

export interface ExtraData {
  temporaryUrlDomain: string;
  welcomeEmailRef?: number;
  phpVersion: any;
  sshPublicKey: any;
}

export interface Limits {
  domainContacts: boolean;
  dns: boolean;
  domainPrivacy: boolean;
  dnsSec?: boolean;
  nameservers: boolean;
  pushTransfer: boolean;
  whois: boolean;
  canSetQuotaNotification: boolean;
  dkimSignatures: boolean;
  highEmailNotification: any;
  imapSync: boolean;
  lowEmailNotification: any;
  mailAutoresponders: string;
  mailboxes: any;
  mailCatchAllForwarders: boolean;
  mailForwarders: string;
  mailJunkFilterLogs: boolean;
  mailJunkFilters: boolean;
  maxMailboxSize: number;
  webmail: boolean;
  accessErrorLogs: boolean;
  accountSummary: boolean;
  additionalFtpUsers: any;
  allowExternalSsl: boolean;
  apps: any;
  appManager: boolean;
  allFutureOneClick: boolean;
  autoDiagnostics?: boolean;
  autoFreeSsl: boolean;
  awstats: boolean;
  backups: boolean;
  bandwidth: any;
  blockVisitors: boolean;
  cdnCaching: boolean;
  cdnOptimisation: boolean;
  cdnStatistics: boolean;
  cdnSecurityHeaders?: boolean;
  customDocRoot: boolean;
  customPrimaryDocRoot: boolean;
  directoryIndexing: boolean;
  emailSummary: boolean;
  fileManager: boolean;
  filePermissions: boolean;
  freeSsl: boolean;
  ftp: boolean;
  googleTranslate: boolean;
  hotlinkProtection: boolean;
  htaccessErrors: boolean;
  mailDistributionLists: any;
  maintenanceMode?: boolean;
  malwareScan: boolean;
  malwareReport: boolean;
  manageAppPool: boolean;
  manageWpAdminUsers: boolean;
  manageWpChecksumReport: boolean;
  manageWpDatabase: boolean;
  manageWpPlugins: boolean;
  manageWpSearchReplace: boolean;
  manageWpSiteSettings: boolean;
  manageWpStaging: boolean;
  manageWpThemes: boolean;
  manageWpUpdates: boolean;
  manageWpUsers: boolean;
  mysqlDatabases: any;
  names: boolean;
  nameserverCheck: boolean;
  passwordProtectedDirectories: boolean;
  phpConfig: boolean;
  phpMyAdmin: boolean;
  platformReinstall: boolean;
  primaryFtpUnlock: boolean;
  remoteMysql: boolean;
  scheduledTasks: boolean;
  sitemapGenerator: boolean;
  ssh: boolean;
  statsBandwidth: boolean;
  statsDisk: boolean;
  switchPhpVersion: boolean;
  temporaryURL: boolean;
  timelineBackups: boolean;
  usageInformation: boolean;
  webBuilder: boolean;
  webRedirect: boolean;
  webalizer: boolean;
  webspace: any;
  wpAdmin: boolean;
  domains: any;
  subdomains: any;
  mssqlDatabases: number;
}
