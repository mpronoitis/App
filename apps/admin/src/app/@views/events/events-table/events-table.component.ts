import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { StoredEvent } from '@play.app/types/EventSourcing/StoredEvent';
import { Store } from '@ngxs/store';
import { MatDialog } from '@angular/material/dialog';
import { GetEvents } from '../../../@store/Actions/event.actions';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import { EdiCredit } from '@play.app/types/Edi/EdiCredit';
import { User } from '@play.app/types/User/User';
import { EventDetailsDialogComponent } from '../../../@dialogs/EventSourcing/event-details-dialog/event-details-dialog.component';

@Component({
  selector: 'play-app-events-table',
  templateUrl: './events-table.component.html',
  styleUrls: ['./events-table.component.scss'],
})
export class EventsTableComponent implements OnInit {
  //booleans
  loading = false;

  //icons
  faSync = faSync;

  events: StoredEvent[] = [];

  //table variables
  displayedColumns: string[] = ['issuer', 'messageType', 'timestamp'];
  dataSource!: MatTableDataSource<StoredEvent>;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;
  @Input() allCustomers: User[] = []; // Available customers to take customerName base of customerId
  constructor(private store: Store, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchEvents(1, 1000);
  }

  /**
   * @summary fetches events from the store
   */
  fetchEvents(page: number, pageSize: number) {
    this.loading = true;
    this.store.dispatch(new GetEvents({ page, pageSize })).subscribe((res) => {
      this.events = res.event.storedEvents;
      this.events = this.initSelect(); //add issuer to events

      setTimeout(() => (this.dataSource = new MatTableDataSource(this.events)));
      setTimeout(() => (this.dataSource.paginator = this.paginator));
      setTimeout(() => (this.dataSource.sort = this.sort));
      this.loading = false;
    });
  }

  /**
   * @summary Filter table
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  initSelect() {
    return this.events?.map((item) => ({
      ...item,
      //check if data of event has CustomerId property and if it does, find the customer and add email to message
      issuer:
        'CustomerId' in item.data
          ? this.allCustomers?.find((user) => user.id === item.data.CustomerId)
              ?.email
          : this.allCustomers?.find((user) => user.id === item.data.Customer_Id)
              ?.email,
    }));
  }

  /**
   * @summary display data of event
   * @param event
   */

  displayData(event: StoredEvent) {
    this.dialog.open(EventDetailsDialogComponent, {
      data: event,
      width: '70%',
    });
  }
}
