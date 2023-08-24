import { Component, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { AuthState } from '../../../@store/States/auth.state';
import { Subscription } from 'rxjs';
import {
  BuildAllUnBuiltDocuments,
  SendAllUnSentDocuments,
} from '../../../@store/Actions/edi.actions';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'play-app-send-edi-dialog',
  template: `
    <ng-container *transloco="let t; read: 'edi-dashboard.edi-documents-table'">
      <h1 mat-dialog-title>{{ t('send-edi-dialog.title') }}</h1>
      <div cdk-focus-initial mat-dialog-content>
        {{
          t('send-edi-dialog.label', {
            totalDocuments: totalDocuments
          })
        }}
      </div>
      <div mat-dialog-actions class="flex space-x-4">
        <play-components-simple-button
          title="{{ t('send-edi-dialog.no-label') }}"
          color="red"
          [icon]="faTimes"
          [loading]="loading"
          mat-dialog-close
          [mat-dialog-close]="false"
        ></play-components-simple-button>
        <play-components-simple-button
          title="{{ t('send-edi-dialog.yes-label') }}"
          color="blue"
          [icon]="faCheck"
          [loading]="loading"
          (click)="onYesClick()"
        ></play-components-simple-button>
      </div>
      <ng-container> </ng-container
    ></ng-container>
  `,
  styles: [],
})
export class SendEdiDialogComponent implements OnDestroy {
  //total count of documents to be uploaded
  totalDocuments = 0;
  //customer id
  customer_Id = '';
  //loading flag
  loading = false;
  faTimes = faTimes;
  faCheck = faCheck;
  sub: Subscription | undefined;

  constructor(
    private store: Store,
    public dialogRef: MatDialogRef<SendEdiDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: unknown
  ) {
    this.totalDocuments = data as number;
    this.customer_Id = this.store.selectSnapshot(AuthState.Id).toString() || '';
  }

  onYesClick(): void {
    this.loading = true;
    //what we want to do is first build all un Processed documents and then send them
    this.sub = this.store.dispatch(new BuildAllUnBuiltDocuments()).subscribe({
      next: () => {
        //send all documents
        this.sub?.unsubscribe();
        this.sub = this.store.dispatch(new SendAllUnSentDocuments()).subscribe({
          next: () => {
            this.dialogRef.close(true);
          },
          error: (err) => {
            this.dialogRef.close(false);
            console.log(err);
          },
        });
      },
      error: (error) => {
        console.log(error);
        this.dialogRef.close(false);
      },
      complete: () => {
        this.loading = false;
        this.dialogRef.close(true);
      },
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
