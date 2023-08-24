import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { PylonContact } from '@play.app/types/Pylon/PylonContact';
import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import {
  GetPylonItemByName,
  SearchPylonContacts,
} from '../../../@store/Actions/pylon.action';
import { PylonItem } from '@play.app/types/Pylon/PylonItem';

@Component({
  template: `
    <h1 mat-dialog-title>Create a new contract</h1>
    <div class="border-t border-gray-200"></div>
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
    <div *ngIf="!loading" cdkFocusInitial mat-dialog-content>
      <mat-stepper #stepper>
        <mat-step
          [stepControl]="contactForm"
          errorMessage="Client is required!"
        >
          <form [formGroup]="contactForm">
            <ng-template matStepLabel>Select Client</ng-template>
            <!-- tailwind input searchbox to search for a client with a label -->
            <div class="flex mt-4 flex-col">
              <label class="text-gray-700" for="client">Client</label>
              <div class="relative">
                <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                  <fa-icon [icon]="faSearch"></fa-icon>
                </span>
                <input
                  class="w-full pl-10 pr-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                  type="text"
                  id="client"
                  placeholder="Search for a client, press enter"
                  formControlName="clientSearchValue"
                />
              </div>
              <!-- display the selected client in a neuomorphic card -->
              <div *ngIf="selectedClient" class="flex flex-col mt-4">
                <div
                  class="flex flex-col md:flex-row md:items-center md:justify-between p-4 bg-white rounded-lg shadow-lg mb-4"
                >
                  <!-- title -->
                  <div class="flex flex-col">
                    <h3 class="text-lg font-semibold text-gray-700">
                      Selected Client
                    </h3>
                    <p class="text-sm text-gray-500">
                      {{ selectedClient.name }}
                    </p>
                    <p class="text-sm text-gray-500">
                      {{ selectedClient.tin }}
                    </p>
                    <p class="text-sm text-gray-500">
                      {{ selectedClient.phones }}
                    </p>
                    <p class="text-sm text-gray-500">
                      {{ selectedClient.address }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <!-- tailwind next button -->
              <button
                class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                (click)="stepper.next()"
                *ngIf="selectedClient"
              >
                Next
              </button>
              <!-- tailwind search green button -->
              <button
                class="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
                (click)="searchClient()"
              >
                Search
              </button>
            </div>
          </form>
        </mat-step>
        <mat-step [stepControl]="itemForm" errorMessage="Item is required!">
          <form [formGroup]="itemForm">
            <ng-template matStepLabel>Select Item</ng-template>
            <!-- tailwind input searchbox to search for a client with a label -->
            <div class="flex mt-4 flex-col">
              <label class="text-gray-700" for="item">Item</label>
              <div class="relative">
                <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                  <fa-icon [icon]="faSearch"></fa-icon>
                </span>
                <input
                  class="w-full pl-10 pr-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                  type="text"
                  id="item"
                  placeholder="Search for an item, press enter"
                  formControlName="itemSearchValue"
                />
              </div>
              <!-- display the selected client in a neuomorphic card -->
              <div *ngIf="selectedItem" class="flex flex-col mt-4">
                <div
                  class="flex flex-col md:flex-row md:items-center md:justify-between p-4 bg-white rounded-lg shadow-lg mb-4"
                >
                  <!-- title -->
                  <div class="flex flex-col">
                    <h3 class="text-lg font-semibold text-gray-700">
                      Selected Item
                    </h3>
                    <p class="text-sm text-gray-500">
                      {{ selectedItem.name }}
                    </p>
                    <p class="text-sm text-gray-500">
                      {{ selectedItem.code }}
                    </p>
                    <p class="text-sm text-gray-500">
                      {{ selectedItem.factoryCode }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <!-- tailwind next button -->
              <button
                class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                (click)="stepper.next()"
                *ngIf="selectedItem"
              >
                Next
              </button>
              <!-- tailwind search green button -->
              <button
                class="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
                (click)="searchItem()"
              >
                Search
              </button>
            </div>
          </form>
        </mat-step>
        <mat-step
          [stepControl]="contractForm"
          errorMessage="Contract is required!"
        >
          <form [formGroup]="contractForm">
            <ng-template matStepLabel>Contract</ng-template>
            <div class="flex mt-4 flex-col">
              <label class="text-gray-700" for="contract">Contract</label>
              <div class="relative">
                <!-- select start and end date -->
                <mat-form-field appearance="outline">
                  <mat-label>Start Date</mat-label>
                  <input
                    matInput
                    [matDatepicker]="startDatePicker"
                    formControlName="startDate"
                    placeholder="Start Date"
                  />
                  <mat-datepicker-toggle
                    matSuffix
                    [for]="startDatePicker"
                  ></mat-datepicker-toggle>
                  <mat-datepicker #startDatePicker></mat-datepicker>
                </mat-form-field>
                <mat-form-field class="ml-4" appearance="outline">
                  <mat-label>End Date</mat-label>
                  <input
                    matInput
                    [matDatepicker]="endDatePicker"
                    formControlName="endDate"
                    placeholder="End Date"
                  />
                  <mat-datepicker-toggle
                    matSuffix
                    [for]="endDatePicker"
                  ></mat-datepicker-toggle>
                  <mat-datepicker #endDatePicker></mat-datepicker>
                </mat-form-field>
              </div>
            </div>
            <!-- select status (paid - unpaid) -->
            <div class="flex mt-4 flex-col">
              <label class="text-gray-700" for="status">Status</label>
              <div class="relative">
                <mat-form-field appearance="outline">
                  <mat-label>Status</mat-label>
                  <mat-select formControlName="status">
                    <mat-option value="paid">Paid</mat-option>
                    <mat-option value="unpaid">Unpaid</mat-option>
                  </mat-select>
                </mat-form-field>
              </div>
            </div>
            <!-- next button -->
            <button
              class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
              (click)="stepper.next()"
            >
              Next
            </button>
          </form>
        </mat-step>
      </mat-stepper>
    </div>
    <mat-dialog-actions align="end">
      <button
        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        mat-dialog-close
        [mat-dialog-close]="false"
      >
        Close
      </button>
    </mat-dialog-actions>
    <ng-container> </ng-container>
  `,
  styles: [],
})
export class CreateContractDialogComponent {
  loading = false;

  //selected Objects
  selectedClient: PylonContact | undefined;
  selectedItem: PylonItem | undefined;

  fb = new FormBuilder();

  //a typed form that receives a PylonContact as input
  contact = new FormControl<PylonContact | null>(null, Validators.required);
  contactForm = this.fb.group({
    contact: this.contact,
    clientSearchValue: this.fb.control(''),
  });

  //a typed form that receives a PylonItem as input
  item = new FormControl<PylonItem | null>(null, Validators.required);
  itemForm = this.fb.group({
    item: this.item,
    itemSearchValue: this.fb.control(''),
  });

  //a form that defines contract details such as startDate, endDate, Status
  contractForm = this.fb.group({
    startDate: this.fb.control('', Validators.required),
    endDate: this.fb.control('', Validators.required),
    status: this.fb.control('', Validators.required),
  });

  //icons
  faSearch = faSearch;
  faUser = faUser;

  //eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private store: Store) {}

  /**
   * @summary Function to search for a given client and update the selectedClient variable
   */
  searchClient() {
    //get the value of the clientSearchValue from the form
    const value = this.contactForm.get('clientSearchValue')?.value;
    if (!value || value === '') return;
    this.loading = true;
    this.store
      .dispatch(
        new SearchPylonContacts({
          phone: true,
          email: true,
          name: true,
          address: true,
          query: value,
        })
      )
      .subscribe({
        next: (result: any) => {
          if (result.pylon.pylonContacts.length > 0) {
            this.selectedClient = result.pylon.pylonContacts[0];
            this.contactForm.controls.contact.setValue(
              this.selectedClient as PylonContact
            );
          }
          this.loading = false;
        },
        error: (error) => {
          this.loading = false;
        },
      });
  }

  /**
   * @summary Function to search for a given item and update the selectedItem variable
   */
  searchItem() {
    //get the value of itemSearchValue from the form
    const value = this.itemForm.get('itemSearchValue')?.value;
    if (!value) return;
    this.store.dispatch(new GetPylonItemByName({ name: value })).subscribe({
      next: (result: any) => {
        if (result.pylon.pylonItems.length > 0) {
          this.selectedItem = result.pylon.pylonItems[0];
          this.itemForm.controls.item.setValue(this.selectedItem as PylonItem);
        }
      },
      error: (error) => {
        this.loading = false;
      },
    });
  }
}
