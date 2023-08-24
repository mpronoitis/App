import { Component, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngxs/store';
import { EdiDocument } from '@play.app/types/Edi/EdiDocument';
import { faCloudUpload, faSync } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { InformationEdiDialog } from 'apps/customer/src/app/@dialogs/Edi/information-edi-dialog/information-edi-dialog.component';
import { SendEdiDialogComponent } from 'apps/customer/src/app/@dialogs/Edi/send-edi-dialog/send-edi-dialog.component';
import {
  GetEdiDocuments,
  GetEdiDocumentsNoPayload,
} from 'apps/customer/src/app/@store/Actions/edi.actions';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'play-app-edi-documents-table',
  templateUrl: './edi-documents-table.component.html',
  styleUrls: ['./edi-documents-table.component.scss'],
})
export class EdiDocumentsTableComponent implements OnDestroy {
  faSync = faSync;
  faCloudUpload = faCloudUpload;
  message_text = '';

  unSentDocuments = 0;
  loading = false;
  subscription: Subscription | undefined;
  dialog_subscription: Subscription | undefined;
  id = localStorage.getItem('auth.id')?.replace(/['"]+/g, '');

  //table variables
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;
  displayedColumns: string[] = ['title', 'isProcessed', 'isSent', 'created_At'];
  dataSource!: MatTableDataSource<EdiDocument>;

  constructor(
    public store: Store,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {
    this.getDocuments(1, 1000);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openInformationDialog(row: EdiDocument) {
    this.dialog.open(InformationEdiDialog, {
      width: '80%',
      data: row,
    });
  }

  openSendDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog_subscription = this.dialog
      .open(SendEdiDialogComponent, {
        width: '400px',
        data: this.unSentDocuments,
        enterAnimationDuration,
        exitAnimationDuration,
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (result === true) {
            this.getDocuments(1, 1000);
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  /**
   * @summary Function to fetch documents via the store
   */
  getDocuments(page: number, pageSize: number) {
    try {
      this.loading = true;
      this.subscription = this.store
        .dispatch(
          new GetEdiDocumentsNoPayload({
            page: page,
            pageSize: pageSize,
            customer_Id: this.id ?? '',
          })
        )
        .subscribe({
          next: (res) => {
            this.dataSource = new MatTableDataSource(
              res.edi.ediDocumentsNoPayload
            );
            setTimeout(() => {
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            });
            // this.dataSource.paginator = this.paginator;
            // this.dataSource.sort = this.sort;
            this.unSentDocuments = res.edi.ediDocumentsNoPayload.filter(
              (x: EdiDocument) => !x.isSent
            ).length;
          },
          error: () => {
            this.toastr.error('Something went wrong');
          },
          complete: () => {
            this.loading = false;
          },
        });
    } catch (error) {
      this.loading = false;
      this.toastr.error();
    }
  }

  //make sure we don't leave any subscriptions open
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    if (this.dialog_subscription) {
      this.dialog_subscription.unsubscribe();
    }
  }
}
