///Get all events with pagination

export class GetEvents {
  static readonly type = '[Event] Get Events';

  constructor(public payload: { page: number; pageSize: number }) {}
}

///Get all events by customerId with pagination

export class GetEventsByCustomerId {
  static readonly type = '[Event] GetEventsByCustomerId';
  constructor(
    public payload: { customerId: string; page: number; pageSize: number }
  ) {}
}
