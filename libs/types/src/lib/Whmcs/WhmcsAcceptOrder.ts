export interface WhmcsAcceptOrder {
  orderId: number;
  serverId: number | null;
  username: string;
  password: string;
  registrar: string;
  sendRegistrar: boolean | null;
  sendModule: boolean | null;
  sendEmail: boolean | null;
}
