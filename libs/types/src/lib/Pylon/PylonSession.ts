export interface PylonSession {
  poid: string;
  posessionid: string;
  pousername: string;
  poservercomputername: string;
  poserverusername: string;
  poclientcomputername: string;
  poclientusername: string;
  pocreated: Date;
  poupdated: Date;
  poactive: number;
  powrldupdated?: any;
}
