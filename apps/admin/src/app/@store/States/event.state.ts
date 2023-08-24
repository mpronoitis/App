import { Injectable } from '@angular/core';
import { EventStateModel } from '../Models/EventStateModel';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { GetEvents, GetEventsByCustomerId } from '../Actions/event.actions';
import { EventService } from '@play.app/services/EventSourcing/Event.service';
import { map, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { StoredEvent } from '@play.app/types/EventSourcing/StoredEvent';

@State<EventStateModel>({
  name: 'event',
  defaults: {
    storedEvents: null,
    customerEvents: null,
  },
})
@Injectable()
export class EventState {
  constructor(
    private store: Store,
    private eventService: EventService,
    private toastr: ToastrService
  ) {}

  @Action(GetEvents)
  getEvents(
    { patchState }: StateContext<EventStateModel>,
    { payload }: GetEvents
  ) {
    return this.eventService.getEvents(payload.page, payload.pageSize).pipe(
      tap({
        next: (result: StoredEvent[]) => {
          patchState({
            //Before patch state, parse the data to JSON
            storedEvents: result.map((event) => ({
              ...event,
              data: JSON.parse(event.data),
            })),
          });
        },
        error: (error) => {
          //if response code is 400
          if (error.status === 400) {
            this.toastr.error('Error');
          }
          //if any other error
          else {
            this.toastr.error(
              'Error while getting stored events, please try again later'
            );
          }
        },
      })
    );
  }

  @Action(GetEventsByCustomerId)
  getEventsByCustomerId(
    { patchState }: StateContext<EventStateModel>,
    { payload }: GetEventsByCustomerId
  ) {
    return this.eventService
      .getEventsByCustomerId(payload.customerId, payload.page, payload.pageSize)
      .pipe(
        tap({
          next: (result: any) => {
            patchState({
              customerEvents: result,
            });
          },
          error: (error) => {
            //if response code is 400
            if (error.status === 400) {
              this.toastr.error('Error');
            }
            //if any other error
            else {
              this.toastr.error(
                'Error while getting stored events, please try again later'
              );
            }
          },
        })
      );
  }
}
