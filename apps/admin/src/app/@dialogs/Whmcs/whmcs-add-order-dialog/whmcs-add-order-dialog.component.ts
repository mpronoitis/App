import { Component, OnInit, ViewChild } from '@angular/core';
import { WhmcsClient } from '@play.app/types/Whmcs/WhmcsClient';
import { WhmcsProduct } from '@play.app/types/Whmcs/WhmcsProduct';
import { Store } from '@ngxs/store';
import {
  AddWhmcsOrder,
  GetWhmcsClients,
  GetWhmcsProducts,
} from '../../../@store/Actions/whmcs.action';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WhmcsAddOrder } from '@play.app/types/Whmcs/WhmcsAddOrder';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';

@Component({
  template: `
    <h1 mat-dialog-title>Add Whmcs Order</h1>
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
      <!-- material stepper -->
      <mat-stepper [linear]="true" #stepper>
        <mat-step [stepControl]="clientForm">
          <form [formGroup]="clientForm">
            <ng-template matStepLabel>Select Client</ng-template>
            <mat-form-field>
              <!-- autocomplete to select client from clients array, when a client is selected we store the client id in the form-->
              <mat-label>Client</mat-label>
              <input
                class="w-full"
                matInput
                [matAutocomplete]="auto"
                formControlName="clientId"
                (input)="filterClients($event)"
              />
              <mat-autocomplete #auto="matAutocomplete">
                <mat-option
                  *ngFor="let client of filteredClients"
                  [value]="client.id"
                >
                  {{ client.firstname }} {{ client.lastname }}
                </mat-option>
              </mat-autocomplete>
            </mat-form-field>
            <div>
              <!-- tailwind Next button -->
              <button
                mat-button
                matStepperNext
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                [disabled]="!clientForm.valid"
                (click)="updateClient()"
              >
                Next
              </button>
            </div>
          </form>
        </mat-step>
        <mat-step [stepControl]="productForm">
          <form [formGroup]="productForm">
            <ng-template matStepLabel>Select Product</ng-template>
            <mat-form-field>
              <!-- dropdown that allows for multiple selection of products -->
              <mat-label>Products</mat-label>
              <mat-select class="w-full" multiple formControlName="productIds">
                <mat-option
                  *ngFor="let product of products"
                  [value]="product.pid"
                >
                  {{ product.name }}
                </mat-option>
              </mat-select>
            </mat-form-field>
            <div>
              <button
                mat-button
                matStepperPrevious
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Back
              </button>
              <button
                mat-button
                matStepperNext
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
                (click)="updateProducts()"
                [disabled]="!productForm.valid"
              >
                Next
              </button>
            </div>
          </form>
        </mat-step>
        <mat-step [stepControl]="orderForm">
          <form [formGroup]="orderForm">
            <ng-template matStepLabel>Order Details</ng-template>
            <!-- fields should be full width  styled with tailwind -->
            <div *ngFor="let field of orderFields" class="w-full">
              <ng-container [ngSwitch]="field.type">
                <mat-form-field *ngSwitchCase="'string'" class="w-full">
                  <mat-label>{{ field.label }}</mat-label>
                  <input
                    matInput
                    formControlName="{{ field.name }}"
                    [required]="field.required"
                  />
                </mat-form-field>
                <mat-form-field *ngSwitchCase="'number'" class="w-full">
                  <mat-label>{{ field.label }}</mat-label>
                  <input
                    matInput
                    formControlName="{{ field.name }}"
                    [required]="field.required"
                  />
                </mat-form-field>
                <mat-form-field *ngSwitchCase="'boolean'" class="w-full">
                  <mat-label>{{ field.label }}</mat-label>
                  <mat-select
                    formControlName="{{ field.name }}"
                    [required]="field.required"
                  >
                    <mat-option value="true">True</mat-option>
                    <mat-option value="false">False</mat-option>
                  </mat-select>
                </mat-form-field>
                <mat-form-field *ngSwitchCase="'string[]'" class="w-full">
                  <mat-label>{{ field.label }}</mat-label>
                  <input
                    matInput
                    formControlName="{{ field.name }}"
                    [required]="field.required"
                  />
                </mat-form-field>
                <mat-form-field *ngSwitchCase="'number[]'" class="w-full">
                  <mat-label>{{ field.label }}</mat-label>
                  <input
                    matInput
                    formControlName="{{ field.name }}"
                    [required]="field.required"
                  />
                </mat-form-field>
              </ng-container>
            </div>
          </form>
        </mat-step>
      </mat-stepper>
    </div>
    <mat-dialog-actions align="end">
      <!-- orange tailwind button to fill fields for demo package , can be clicked only if we are on step 3 -->
      <button
        mat-button
        class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mr-2"
        (click)="fillDemoData()"
      >
        Demo Package
      </button>

      <button
        (click)="submit()"
        class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
      >
        Submit
      </button>
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
export class WhmcsAddOrderDialogComponent {
  loading = false;
  clients: WhmcsClient[] = [];
  products: WhmcsProduct[] = [];
  filteredClients: WhmcsClient[] = [];

  //the first form group will be the client selection, a user can select only one client
  clientForm: FormGroup = new FormGroup({
    clientId: new FormControl('', Validators.required),
  });

  //the second form group will be the product selection, a user can select multiple products
  //it will accept an array of ids
  productForm: FormGroup = new FormGroup({
    productIds: new FormControl('', Validators.required),
  });

  //form for order
  orderForm: FormGroup = new FormGroup({
    clientId: new FormControl('', Validators.required),
    paymentMethod: new FormControl('mailin', Validators.required),
    productIds: new FormControl(''),
    domainNames: new FormControl(''),
    billingCycles: new FormControl(''),
    domainRegTypes: new FormControl(''),
    domainRegPeriods: new FormControl(''),
    domainIdnLangs: new FormControl(''),
    domainEppCodes: new FormControl(''),
    firstNameserver: new FormControl(''),
    secondNameserver: new FormControl(''),
    thirdNameserver: new FormControl(''),
    fourthNameserver: new FormControl(''),
    fifthNameserver: new FormControl(''),
    customFields: new FormControl(''),
    configOptions: new FormControl(''),
    overridePrice: new FormControl(''),
    promoCode: new FormControl(''),
    promoOverride: new FormControl(''),
    affiliateId: new FormControl(''),
    noInvoice: new FormControl('true'),
    noInvoiceEmail: new FormControl(''),
    noEmail: new FormControl(''),
    addons: new FormControl(''),
    serverHostname: new FormControl(''),
    serverNameserver1: new FormControl(''),
    serverNameserver2: new FormControl(''),
    serverRootPassword: new FormControl(''),
    domainContactId: new FormControl(''),
    domainDnsManagement: new FormControl(''),
    tldSpecificFields: new FormControl(''),
    domainEmailForwarding: new FormControl(''),
    domainIdProtection: new FormControl(''),
    domainOverridePrice: new FormControl(''),
    domainOverrideRenewalPrice: new FormControl(''),
    domainRenewals: new FormControl(''),
    ipAddress: new FormControl(''),
    addonId: new FormControl(''),
    addonIds: new FormControl(''),
    addonServiceIds: new FormControl(''),
  });

  //order fields array to be used to build the form inputs
  orderFields = [
    { name: 'clientId', type: 'number', label: 'Client ID', required: true },
    {
      name: 'paymentMethod',
      type: 'string',
      label: 'Payment Method',
      required: true,
    },
    {
      name: 'productIds',
      type: 'number[]',
      label: 'Product IDs',
      required: false,
    },
    {
      name: 'domainNames',
      type: 'string[]',
      label: 'Domain Names',
      required: false,
    },
    {
      name: 'billingCycles',
      type: 'string[]',
      label: 'Billing Cycles',
      required: false,
    },
    {
      name: 'domainRegTypes',
      type: 'string[]',
      label: 'Domain Reg Types',
      required: false,
    },
    {
      name: 'domainRegPeriods',
      type: 'number[]',
      label: 'Domain Reg Periods',
      required: false,
    },
    {
      name: 'domainIdnLangs',
      type: 'string[]',
      label: 'Domain IDN Langs',
      required: false,
    },
    {
      name: 'domainEppCodes',
      type: 'string[]',
      label: 'Domain EPP Codes',
      required: false,
    },
    {
      name: 'firstNameserver',
      type: 'string',
      label: 'First Nameserver',
      required: false,
    },
    {
      name: 'secondNameserver',
      type: 'string',
      label: 'Second Nameserver',
      required: false,
    },
    {
      name: 'thirdNameserver',
      type: 'string',
      label: 'Third Nameserver',
      required: false,
    },
    {
      name: 'fourthNameserver',
      type: 'string',
      label: 'Fourth Nameserver',
      required: false,
    },
    {
      name: 'fifthNameserver',
      type: 'string',
      label: 'Fifth Nameserver',
      required: false,
    },
    {
      name: 'customFields',
      type: 'string[]',
      label: 'Custom Fields',
      required: false,
    },
    {
      name: 'configOptions',
      type: 'string[]',
      label: 'Config Options',
      required: false,
    },
    {
      name: 'overridePrice',
      type: 'number[]',
      label: 'Override Price',
      required: false,
    },
    { name: 'promoCode', type: 'string', label: 'Promo Code', required: false },
    {
      name: 'promoOverride',
      type: 'boolean',
      label: 'Promo Override',
      required: false,
    },
    {
      name: 'affiliateId',
      type: 'number',
      label: 'Affiliate ID',
      required: false,
    },
    {
      name: 'noInvoice',
      type: 'boolean',
      label: 'No Invoice',
      required: false,
    },
    {
      name: 'noInvoiceEmail',
      type: 'boolean',
      label: 'No Invoice Email',
      required: false,
    },
    { name: 'noEmail', type: 'boolean', label: 'No Email', required: false },
    { name: 'addons', type: 'string', label: 'Addons', required: false },
    {
      name: 'serverHostname',
      type: 'string',
      label: 'Server Hostname',
      required: false,
    },
    {
      name: 'serverNameserver1',
      type: 'string',
      label: 'Server Nameserver 1',
      required: false,
    },
    {
      name: 'serverNameserver2',
      type: 'string',
      label: 'Server Nameserver 2',
      required: false,
    },
    {
      name: 'serverRootPassword',
      type: 'string',
      label: 'Server Root Password',
      required: false,
    },
    {
      name: 'domainContactId',
      type: 'number',
      label: 'Domain Contact ID',
      required: false,
    },
    {
      name: 'domainDnsManagement',
      type: 'boolean',
      label: 'Domain DNS Management',
      required: false,
    },
    {
      name: 'tldSpecificFields',
      type: 'string[]',
      label: 'TLD Specific Fields',
      required: false,
    },
    {
      name: 'domainEmailForwarding',
      type: 'boolean',
      label: 'Domain Email Forwarding',
      required: false,
    },
    {
      name: 'domainIdProtection',
      type: 'boolean',
      label: 'Domain ID Protection',
      required: false,
    },
    {
      name: 'domainOverridePrice',
      type: 'number[]',
      label: 'Domain Override Price',
      required: false,
    },
    {
      name: 'domainOverrideRenewalPrice',
      type: 'number[]',
      label: 'Domain Override Renewal Price',
      required: false,
    },
    {
      name: 'domainRenewals',
      type: 'string[]',
      label: 'Domain Renewals',
      required: false,
    },
    { name: 'ipAddress', type: 'string', label: 'IP Address', required: false },
    { name: 'addonId', type: 'number', label: 'Addon ID', required: false },
    { name: 'addonIds', type: 'number[]', label: 'Addon IDs', required: false },
    {
      name: 'addonServiceIds',
      type: 'number[]',
      label: 'Addon Service IDs',
      required: false,
    },
  ];

  constructor(
    private store: Store,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<WhmcsAddOrderDialogComponent>
  ) {
    //get stepper from html
    //run both promises in parallel and get the results
    this.loading = true;
    Promise.all([this.fetchClients(), this.fetchProducts()]).then(
      (res) => {
        this.loading = false;
        this.clients = res[0];
        this.products = res[1];
      },
      (err) => {
        this.loading = false;
        console.log(err);
      }
    );
  }

  /**
   * @summary Promise to fetch clients via the store
   */
  fetchClients(): Promise<WhmcsClient[]> {
    return new Promise((resolve, reject) => {
      const sub = this.store
        .dispatch(new GetWhmcsClients({ limitstart: 0, limitnum: 200 }))
        .subscribe({
          next: (res) => {
            this.clients = res.whmcs.clients;
            resolve(this.clients);
            sub.unsubscribe();
          },
          error: (err) => {
            reject(err);
            sub.unsubscribe();
          },
        });
    });
  }

  /**
   * @summary Promise to fetch products via the store
   */
  fetchProducts(): Promise<WhmcsProduct[]> {
    return new Promise((resolve, reject) => {
      const sub = this.store.dispatch(new GetWhmcsProducts({})).subscribe({
        next: (res) => {
          this.products = res.whmcs.products;
          resolve(this.products);
          sub.unsubscribe();
        },
        error: (err) => {
          reject(err);
          sub.unsubscribe();
        },
      });
    });
  }

  /**
   * @summary Submit Function, will map the orderForm to a new instance of WhmcsAddOrder and dispatch the action
   */
  submit() {
    this.loading = true;
    const order: WhmcsAddOrder = {
      clientId: this.orderForm.value.clientId as number,
      paymentMethod: this.orderForm.value.paymentMethod as string,
      //in order to convert productIds to a number array, we need to convert a string that is like 1,2,3 to a number array unless its empty in which case we set it to null, if its a single number we convert it to a number array
      productIds: this.orderForm.value.productIds
        ? this.orderForm.value.productIds.includes(',')
          ? this.orderForm.value.productIds.split(',').map((id: string) => {
              return parseInt(id);
            })
          : [parseInt(this.orderForm.value.productIds)]
        : null,
      //if domainNames array is empty, set it to null otherwise convert it to a string array
      domainNames: this.orderForm.value.domainNames
        ? this.orderForm.value.domainNames.length
          ? (this.orderForm.value.domainNames.split(',') as string[])
          : null
        : null,
      billingCycles: this.orderForm.value.billingCycles
        ? this.orderForm.value.billingCycles.length
          ? (this.orderForm.value.billingCycles.split(',') as string[])
          : null
        : null,
      domainRegTypes: this.orderForm.value.domainRegTypes
        ? this.orderForm.value.domainRegTypes.length
          ? (this.orderForm.value.domainRegTypes.split(',') as string[])
          : null
        : null,
      domainRegPeriods: this.orderForm.value.domainRegPeriods
        ? this.orderForm.value.domainRegPeriods.includes(',')
          ? this.orderForm.value.domainRegPeriods
              .split(',')
              .map((id: string) => {
                return parseInt(id);
              })
          : [parseInt(this.orderForm.value.domainRegPeriods)]
        : null,
      domainIdnLangs: this.orderForm.value.domainIdnLangs
        ? this.orderForm.value.domainIdnLangs.length
          ? (this.orderForm.value.domainIdnLangs.split(',') as string[])
          : null
        : null,
      domainEppCodes: this.orderForm.value.domainEppCodes
        ? this.orderForm.value.domainEppCodes.length
          ? (this.orderForm.value.domainEppCodes.split(',') as string[])
          : null
        : null,
      firstNameserver: this.orderForm.value.firstNameserver as string,
      secondNameserver: this.orderForm.value.secondNameserver as string,
      thirdNameserver: this.orderForm.value.thirdNameserver as string,
      fourthNameserver: this.orderForm.value.fourthNameserver as string,
      fifthNameserver: this.orderForm.value.fifthNameserver as string,
      customFields: this.orderForm.value.customFields
        ? this.orderForm.value.customFields.length
          ? (this.orderForm.value.customFields.split(',') as string[])
          : null
        : null,
      configOptions: this.orderForm.value.configOptions
        ? this.orderForm.value.configOptions.length
          ? (this.orderForm.value.configOptions.split(',') as string[])
          : null
        : null,
      overridePrice: this.orderForm.value.overridePrice
        ? this.orderForm.value.overridePrice.includes(',')
          ? this.orderForm.value.overridePrice.split(',').map((id: string) => {
              return parseInt(id);
            })
          : [parseInt(this.orderForm.value.overridePrice)]
        : null,
      promoCode: this.orderForm.value.promoCode as string,
      promoOverride: (this.orderForm.value.promoOverride as string) === 'true',
      //affiliateid is a number if its empty we set it to null
      affiliateId: this.orderForm.value.affiliateId
        ? parseInt(this.orderForm.value.affiliateId)
        : 0,
      noInvoice: (this.orderForm.value.noInvoice as string) === 'true',
      noInvoiceEmail:
        (this.orderForm.value.noInvoiceEmail as string) === 'true',
      noEmail: (this.orderForm.value.noEmail as string) === 'true',
      addons: this.orderForm.value.addons as string,
      serverHostname: this.orderForm.value.serverHostname as string,
      serverNameserver1: this.orderForm.value.serverNameserver1 as string,
      serverNameserver2: this.orderForm.value.serverNameserver2 as string,
      serverRootPassword: this.orderForm.value.serverRootPassword as string,
      domainContactId: this.orderForm.value.domainContactId
        ? parseInt(this.orderForm.value.domainContactId)
        : 0,
      domainDnsManagement:
        (this.orderForm.value.domainDnsManagement as string) === 'true',
      tldSpecificFields: this.orderForm.value.tldSpecificFields.split(
        ','
      ) as string[],
      domainEmailForwarding:
        (this.orderForm.value.domainEmailForwarding as string) === 'true',
      domainIdProtection:
        (this.orderForm.value.domainIdProtection as string) === 'true',
      domainOverridePrice: this.orderForm.value.domainOverridePrice
        ? this.orderForm.value.domainOverridePrice.includes(',')
          ? this.orderForm.value.domainOverridePrice
              .split(',')
              .map((id: string) => {
                return parseInt(id);
              })
          : [parseInt(this.orderForm.value.domainOverridePrice)]
        : null,
      domainOverrideRenewalPrice: this.orderForm.value
        .domainOverrideRenewalPrice
        ? this.orderForm.value.domainOverrideRenewalPrice.includes(',')
          ? this.orderForm.value.domainOverrideRenewalPrice
              .split(',')
              .map((id: string) => {
                return parseInt(id);
              })
          : [parseInt(this.orderForm.value.domainOverrideRenewalPrice)]
        : null,
      domainRenewals: this.orderForm.value.domainRenewals
        ? this.orderForm.value.domainRenewals.length
          ? (this.orderForm.value.domainRenewals.split(',') as string[])
          : null
        : null,
      ipAddress: this.orderForm.value.ipAddress as string,
      addonId: this.orderForm.value.addonId
        ? parseInt(this.orderForm.value.addonId)
        : 0,
      addonIds: this.orderForm.value.addonIds
        ? this.orderForm.value.addonIds.includes(',')
          ? this.orderForm.value.addonIds.split(',').map((id: string) => {
              return parseInt(id);
            })
          : [parseInt(this.orderForm.value.addonIds)]
        : null,
      addonServiceIds: this.orderForm.value.addonServiceIds
        ? this.orderForm.value.addonServiceIds.includes(',')
          ? this.orderForm.value.addonServiceIds
              .split(',')
              .map((id: string) => {
                return parseInt(id);
              })
          : [parseInt(this.orderForm.value.addonServiceIds)]
        : null,
    };
    //console.log(order);
    const sub = this.store.dispatch(new AddWhmcsOrder({ order })).subscribe({
      next: (res) => {
        this.toastr.success('Order Added');
        sub.unsubscribe();
        this.dialogRef.close();
      },
      error: (err) => {
        this.toastr.error();
        sub.unsubscribe();
        this.dialogRef.close();
      },
    });
  }

  /**
   * @summary Filter clients based on the input
   * @param event
   */
  filterClients(event: any) {
    //filter clients based on the input
    this.filteredClients = this.clients.filter((client) => {
      return (
        client.firstname
          .toLowerCase()
          .includes(event.target.value.toLowerCase()) ||
        client.lastname.toLowerCase().includes(event.target.value.toLowerCase())
      );
    });
  }

  /**
   * @summary Update products in order form based on the selected products
   */
  updateProducts() {
    this.orderForm.controls['productIds'].setValue(
      this.productForm.value.productIds
    );
  }

  /**
   * @summary Update the client id in the order form
   */
  updateClient() {
    this.orderForm.controls['clientId'].setValue(
      this.clientForm.value.clientId
    );
  }

  /**
   * @summary Fill demo data in the order form
   */
  fillDemoData() {
    //set overridePrice to 0
    this.orderForm.controls['overridePrice'].setValue('0');
    //set promoCode to demo_0TC3YX00DU
    this.orderForm.controls['promoCode'].setValue('demo_0TC3YX00DU');
    //set billingCycle to Monthly
    this.orderForm.controls['billingCycle'].setValue('Monthly');
  }
}
