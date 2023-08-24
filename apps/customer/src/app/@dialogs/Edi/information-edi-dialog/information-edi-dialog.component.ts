import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { EdiDocument } from '@play.app/types/Edi/EdiDocument';
import {
  faFileInvoice,
  faReceipt,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { GetEdiDocumentById } from '../../../@store/Actions/edi.actions';

@Component({
  selector: 'play-app-information-edi-dialog',
  template: `
    <ng-container *transloco="let t; read: 'edi-dashboard'">
      <h1 mat-dialog-title>
        {{ t('edi-documents-table.information-edi-dialog.title') }}
      </h1>
      <div
        *ngIf="loading"
        class="text-center pt-5 mt-5"
        cdkFocusInitial
        mat-dialog-content
      >
        <play-components-simple-spinner
          *ngIf="loading"
          class="grow"
          mainColor="blue"
          id="spinner"
        ></play-components-simple-spinner>
      </div>
      <div cdkFocusInitial mat-dialog-content *ngIf="!loading">
        <form class="w-full md:pl-5 pt-3 max-w-lg">
          <div class="md:flex md:items-center mb-6">
            <div class="md:w-1/3">
              <label
                class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="inline-full-name"
              >
                {{ t('edi-documents-table.title') }}
              </label>
            </div>
            <div class="md:w-2/3">
              <input
                readonly
                disabled
                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                id="inline-full-name"
                type="text"
                [value]="data.title"
              />
            </div>
          </div>
          <div class="md:flex md:items-center mb-6">
            <div class="md:w-1/3">
              <label
                class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="inline-full-name"
              >
                {{ t('edi-documents-table.processed') }}
              </label>
            </div>
            <div class="md:w-2/3">
              <play-components-simple-badge
                [title]="
                  this.data.isProcessed
                    ? t('edi-documents-table.processed')
                    : t('edi-documents-table.waiting')
                "
                [textColor]="this.data.isProcessed ? 'green' : 'red'"
                [backgroundColor]="this.data.isProcessed ? 'green' : 'red'"
              ></play-components-simple-badge>
            </div>
          </div>
          <div class="md:flex md:items-center mb-6">
            <div class="md:w-1/3">
              <label
                class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="inline-full-name"
              >
                {{ t('edi-documents-table.sent') }}
              </label>
            </div>
            <div class="md:w-2/3">
              <play-components-simple-badge
                [title]="
                  this.data.isSent
                    ? t('edi-documents-table.sent')
                    : t('edi-documents-table.waiting')
                "
                [textColor]="this.data.isSent ? 'green' : 'red'"
                [backgroundColor]="this.data.isSent ? 'green' : 'red'"
              ></play-components-simple-badge>
            </div>
          </div>
          <div class="md:flex md:items-center mb-6">
            <div class="md:w-1/3">
              <label
                class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="inline-full-name"
              >
                {{ t('edi-documents-table.created_at') }}
              </label>
            </div>
            <div class="md:w-2/3">
              <input
                readonly
                disabled
                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                id="inline-full-name"
                type="text"
                [value]="data.created_At | date: 'dd/MM/yyyy HH:mm:ss'"
              />
            </div>
          </div>
        </form>

        <!-- Document && Edi Accordion -->
        <mat-toolbar color="primary"> Payloads </mat-toolbar>
        <mat-accordion>
          <mat-expansion-panel>
            <mat-expansion-panel-header>
              <mat-panel-title>
                <span class="flex items-center space-between"
                  >Document Payload</span
                >
              </mat-panel-title>
            </mat-expansion-panel-header>

            <textarea
              readonly
              disabled
              id="message"
              rows="20"
              columns="20"
              class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >

             {{ data.documentPayload | json }}

            </textarea
            >
          </mat-expansion-panel>
          <mat-expansion-panel
            (opened)="panelOpenState = true"
            (closed)="panelOpenState = false"
          >
            <mat-expansion-panel-header>
              <mat-panel-title>
                <span class="flex items-center space-between">Edi Payload</span>
              </mat-panel-title>
            </mat-expansion-panel-header>
            <!-- Inside Content -->
            <textarea
              readonly
              disabled
              id="message"
              rows="20"
              columns="20"
              class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >

            {{ data.ediPayload }}

</textarea
            >
          </mat-expansion-panel>
        </mat-accordion>
      </div>

      <div class="relative mt-10">
        <play-components-simple-button
          mat-button
          mat-dialog-close
          [mat-dialog-close]="false"
          title=" {{ t('edi-documents-table.information-edi-dialog.close') }}"
          [icon]="faTimes"
        ></play-components-simple-button>
      </div>
    </ng-container>
  `,
  styles: [
    `
      textarea {
        background: url(http://i.imgur.com/2cOaJ.png);
        background-attachment: local;
        background-repeat: no-repeat;
        padding-left: 35px;
        padding-top: 10px;
        font-size: 14px;
        border-color: #ccc;
      }
    `,
  ],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class InformationEdiDialog implements OnDestroy {
  //total count of documents to be uploaded

  sub: Subscription | undefined;
  faTimes = faTimes;
  showDocumentAccordion = false;
  showEdiAccordion = false;
  panelOpenState = false;
  faFileInvoice = faFileInvoice;
  faReceipt = faReceipt;
  loading = false;
  ediDocument: EdiDocument | undefined;

  constructor(
    private store: Store,
    public dialogRef: MatDialogRef<InformationEdiDialog>,
    @Inject(MAT_DIALOG_DATA) public data: EdiDocument
  ) {
    this.getEdiDocumentById();
  }

  /**
   * Get Edi Document by id
   */
  getEdiDocumentById() {
    try {
      this.loading = true;
      this.store
        .dispatch(new GetEdiDocumentById({ id: this.data.id }))
        .subscribe({
          next: (res) => {
            this.loading = false;
            this.data = res.edi.ediDocument;
          },
          error: (err) => {
            this.loading = false;
            console.log(err);
          },
        });
    } catch (err) {
      console.log(err);
    }
  }

  onShowDocumentAccordion() {
    this.showDocumentAccordion = !this.showDocumentAccordion;
  }

  onShowEdiAccordion() {
    this.showEdiAccordion = !this.showEdiAccordion;
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
