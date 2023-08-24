export interface Heartbeat {
  monitorID: number;
  status: number;
  time: string;
  msg: string;
  important: boolean;
  duration: number;
  id: string;
}

export interface Monitor {
  name: string;
  url: string;
  hostname: string;
  port: string;
  maxretries: number;
  weight: number;
  active: number;
  type: string;
  interval: number;
  keyword: string;
  id: string;
}

export interface KumaNotification {
  heartbeat: Heartbeat;
  monitor: Monitor;
  msg: string;
  receivedAt: Date;
  id: string;
}
