export interface A {
  host: string;
  ip: string;
}

export interface AAAA {
  host: string;
  ipv6: string;
}

export interface CNAME {
  host: string;
  target: string;
}

export interface MX {
  pri: number;
  target: string;
  host: string;
}

export interface TXT {
  host: string;
  txt: string;
}

export interface DefaultDns {
  A: A[];
  AAAA: AAAA[];
  CNAME: CNAME[];
  MX: MX[];
  TXT: TXT[];
}

export interface Apps {
  abantecart: boolean;
  agoracart: boolean;
  b2evolution: boolean;
  backdrop: boolean;
  bamboo: boolean;
  buddypress: boolean;
  cachet: boolean;
  cakephp: boolean;
  cmsmadesimple: boolean;
  concrete5: boolean;
  coppermine: boolean;
  craftcms: boolean;
  cubecart: boolean;
  dolphin: boolean;
  dotproject: boolean;
  dolibarr: boolean;
  drupal: boolean;
  e107: boolean;
  elgg: boolean;
  expressionengine: boolean;
  fengoffice: boolean;
  flarum: boolean;
  fluxbb: boolean;
  formalms: boolean;
  formtools: boolean;
  freshrss: boolean;
  geeklog: boolean;
  gibbon: boolean;
  gnusocial: boolean;
  helpcenterlive: boolean;
  invoiceninja: boolean;
  invoiceplane: boolean;
  joomla: boolean;
  kanboard: boolean;
  laravel: boolean;
  limesurvey: boolean;
  magento: boolean;
  mambocms: boolean;
  mantisbt: boolean;
  matomo: boolean;
  mediawiki: boolean;
  modx: boolean;
  moodle: boolean;
  mybb: boolean;
  nucleus: boolean;
  opencart: boolean;
  openwebanalytics: boolean;
  oscommerce: boolean;
  oscomphoenix: boolean;
  osticket: boolean;
  phpbb: boolean;
  phpcoin: boolean;
  phpformgenerator: boolean;
  phpfreechat: boolean;
  phpfusion: boolean;
  phplist: boolean;
  phpmailer: boolean;
  phpmyfaq: boolean;
  phpnuke: boolean;
  phproject: boolean;
  phprojekt: boolean;
  piwigo: boolean;
  prestashop: boolean;
  processwire: boolean;
  reviveadserver: boolean;
  roundcube: boolean;
  serendipity: boolean;
  silverstripecms: boolean;
  simplemachinesforum: boolean;
  slim: boolean;
  squirrelmail: boolean;
  suitecrm: boolean;
  tcexam: boolean;
  textpattern: boolean;
  troubleticketexpress: boolean;
  typo3: boolean;
  vtiger: boolean;
  webcalendar: boolean;
  wordpress: boolean;
  xerte: boolean;
  zencart: boolean;
  zenphoto: boolean;
}

export interface Limits {
  mssqlDatabases: number;
  timelineBackups: boolean;
  domainContacts: boolean;
  dns: boolean;
  domainPrivacy: boolean;
  dnsSec: boolean;
  nameservers: boolean;
  pushTransfer: boolean;
  whois: boolean;
  canSetQuotaNotification: boolean;
  dkimSignatures: boolean;
  highEmailNotification: number;
  imapSync: boolean;
  lowEmailNotification: number;
  mailAutoresponders: string;
  mailboxes: string;
  mailCatchAllForwarders: boolean;
  mailForwarders: string;
  mailJunkFilterLogs: boolean;
  mailJunkFilters: boolean;
  maxMailboxSize: number;
  webmail: boolean;
  accessErrorLogs: boolean;
  accountSummary: boolean;
  additionalFtpUsers: string;
  allowExternalSsl: boolean;
  apps: Apps;
  appManager: boolean;
  allFutureOneClick: boolean;
  autoDiagnostics: boolean;
  autoFreeSsl: boolean;
  awstats: boolean;
  backups: boolean;
  bandwidth: string;
  blockVisitors: boolean;
  cdnCaching: boolean;
  cdnOptimisation: boolean;
  cdnStatistics: boolean;
  cdnSecurityHeaders: boolean;
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
  mailDistributionLists: string;
  maintenanceMode: boolean;
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
  mysqlDatabases: string;
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
  usageInformation: boolean;
  webBuilder: boolean;
  webRedirect: boolean;
  webalizer: boolean;
  webspace: string;
  wpAdmin: boolean;
  domains: string;
  subdomains: string;
  canSetEmailQuota: boolean;
  changeParent: boolean;
  addFreeWeb: boolean;
  contacts: boolean;
  lock: boolean;
  webForward: boolean;
  email: boolean;
  gitVersionControl: boolean;
  stackUsers: boolean;
}

export interface DefaultPages {
  IndexPageHtml: string;
  DeactivatedPageHtml: string;
  ServiceUnavailablePageHtml: string;
  MaintenancePageHtml: string;
  MaintenanceLoginPageHtml: string;
}

export interface DefaultHtml {
  IndexPageHtml: string;
  DeactivatedPageHtml: string;
  ServiceUnavailablePageHtml: string;
  MaintenancePageHtml: string;
  MaintenanceLoginPageHtml: string;
  defaultPages: DefaultPages;
}

export interface Apps2 {
  abantecart: boolean;
  agoracart: boolean;
  b2evolution: boolean;
  backdrop: boolean;
  bamboo: boolean;
  buddypress: boolean;
  cachet: boolean;
  cakephp: boolean;
  cmsmadesimple: boolean;
  concrete5: boolean;
  coppermine: boolean;
  craftcms: boolean;
  cubecart: boolean;
  dolphin: boolean;
  dotproject: boolean;
  dolibarr: boolean;
  drupal: boolean;
  e107: boolean;
  elgg: boolean;
  expressionengine: boolean;
  fengoffice: boolean;
  flarum: boolean;
  fluxbb: boolean;
  formalms: boolean;
  formtools: boolean;
  freshrss: boolean;
  geeklog: boolean;
  gibbon: boolean;
  gnusocial: boolean;
  helpcenterlive: boolean;
  invoiceninja: boolean;
  invoiceplane: boolean;
  joomla: boolean;
  kanboard: boolean;
  laravel: boolean;
  limesurvey: boolean;
  magento: boolean;
  mambocms: boolean;
  mantisbt: boolean;
  matomo: boolean;
  mediawiki: boolean;
  modx: boolean;
  moodle: boolean;
  mybb: boolean;
  nucleus: boolean;
  opencart: boolean;
  openwebanalytics: boolean;
  oscommerce: boolean;
  oscomphoenix: boolean;
  osticket: boolean;
  phpbb: boolean;
  phpcoin: boolean;
  phpformgenerator: boolean;
  phpfreechat: boolean;
  phpfusion: boolean;
  phplist: boolean;
  phpmailer: boolean;
  phpmyfaq: boolean;
  phpnuke: boolean;
  phproject: boolean;
  phprojekt: boolean;
  piwigo: boolean;
  prestashop: boolean;
  processwire: boolean;
  reviveadserver: boolean;
  roundcube: boolean;
  salessyntax: boolean;
  serendipity: boolean;
  silverstripecms: boolean;
  simplemachinesforum: boolean;
  slim: boolean;
  squirrelmail: boolean;
  suitecrm: boolean;
  tcexam: boolean;
  textpattern: boolean;
  troubleticketexpress: boolean;
  typo3: boolean;
  vtiger: boolean;
  webcalendar: boolean;
  wordpress: boolean;
  xerte: boolean;
  zencart: boolean;
  zenphoto: boolean;
}

export interface Sessionlimits {
  mssqlDatabases: number;
  timelineBackups: boolean;
  accessErrorLogs: boolean;
  accountSummary: boolean;
  additionalFtpUsers: string;
  allowExternalSsl: boolean;
  apps: Apps2;
  appManager: boolean;
  allFutureOneClick: boolean;
  autoDiagnostics: boolean;
  autoFreeSsl: boolean;
  awstats: boolean;
  backups: boolean;
  bandwidth: string;
  blockVisitors: boolean;
  cdnCaching: boolean;
  cdnOptimisation: boolean;
  cdnStatistics: boolean;
  cdnSecurityHeaders: boolean;
  customDocRoot: boolean;
  customPrimaryDocRoot: boolean;
  directoryIndexing: boolean;
  dns: boolean;
  domainContacts: boolean;
  emailSummary: boolean;
  fileManager: boolean;
  filePermissions: boolean;
  freeSsl: boolean;
  ftp: boolean;
  gitVersionControl: boolean;
  googleTranslate: boolean;
  hotlinkProtection: boolean;
  htaccessErrors: boolean;
  imapSync: boolean;
  mailAutoresponders: string;
  mailCatchAllForwarders: boolean;
  mailDistributionLists: string;
  mailForwarders: string;
  mailJunkFilterLogs: boolean;
  mailJunkFilters: boolean;
  mailboxes: string;
  maintenanceMode: boolean;
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
  maxMailboxSize: number;
  mysqlDatabases: string;
  names: boolean;
  nameserverCheck: boolean;
  nameservers: boolean;
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
  usageInformation: boolean;
  webBuilder: boolean;
  webRedirect: boolean;
  webalizer: boolean;
  webspace: string;
  whois: boolean;
  wpAdmin: boolean;
  addFreeWeb: boolean;
  contacts: boolean;
  domainPrivacy: boolean;
  dnsSec: boolean;
  lock: boolean;
  pushTransfer: boolean;
  webForward: boolean;
  canSetEmailQuota: boolean;
  canSetQuotaNotification: boolean;
  dkimSignatures: boolean;
  email: boolean;
  highEmailNotification: string;
  lowEmailNotification: string;
  webmail: boolean;
  changeParent: boolean;
  domains: string;
  stackUsers: boolean;
  subdomains: string;
}

export interface FtpUser {
  Id: number;
  Username: string;
}

export interface StatsUrls {
  AWStats: string;
  Webalizer: string;
  LogFiles: string;
}

export interface Usage {
  MySqlDatabases: number;
  ServerAliases: number;
  VirtualHostNames: number;
}

export interface Info {
  flags: string[];
  ftpserver: string;
  ip4Address: string;
  ip6Address: string;
  statsUrls: StatsUrls;
  usage: Usage;
  webserver: string;
  zone: string;
}

export interface Usage2 {
  MySqlDatabases: number;
  ServerAliases: number;
  VirtualHostNames: number;
}

export interface FtpCredential {
  username: string;
  password: string;
}

export interface Web {
  ftpUsers: FtpUser[];
  hasBackups: boolean;
  hasParent: boolean;
  id: number;
  info: Info;
  label: string;
  name: string;
  names: string[];
  overrideLimits: any[];
  packageTypeName: string;
  platform: string;
  setupComplete: boolean;
  typeRef: number;
  usage: Usage2;
  ftp_credentials: FtpCredential[];
}

export interface TwentyPackageDetails {
  canClaimName: any[];
  canInternallyTransfer: boolean;
  defaultDns: DefaultDns;
  domain: any[];
  enabled: boolean;
  created: Date;
  dns: object;
  id: number;
  isDemo: boolean;
  limits: Limits;
  names: string[];
  defaultHtml: DefaultHtml;
  sessionlimits: Sessionlimits;
  stackBilling?: any;
  status: boolean;
  typeRef: number;
  web: Web;
  stackUsers: string[];
}
