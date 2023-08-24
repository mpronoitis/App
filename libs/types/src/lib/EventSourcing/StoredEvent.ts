export interface StoredEvent {
  id: string;
  data: any;
  aggregateId: string;
  messageType: string;
  timestamp: Date;
}
