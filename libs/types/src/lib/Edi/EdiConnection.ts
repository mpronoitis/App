export interface EdiConnection {
  id: string;
  customer_Id: string;
  model_Id: string;
  org_Id: string;
  profile_Id: string;
  ftp_Hostname: string;
  ftp_Username: string;
  ftp_Password: string;
  ftp_Port: number;
  file_Type: string;
}
