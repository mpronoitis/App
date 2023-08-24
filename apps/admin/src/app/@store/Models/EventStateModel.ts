import { StoredEvent } from '@play.app/types/EventSourcing/StoredEvent';

export interface EventStateModel {
  storedEvents: StoredEvent[] | null;
  customerEvents: StoredEvent[] | null;
}
