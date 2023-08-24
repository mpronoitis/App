import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WhmcsClient } from '@play.app/types/Whmcs/WhmcsClient';
import { Store } from '@ngxs/store';
import { WhmcsPurchasedProduct } from '@play.app/types/Whmcs/WhmcsPurchasedProduct';
import { WhmcsDomain } from '@play.app/types/Whmcs/WhmcsDomain';
import {
  GetWhmcsClientDetails,
  GetWhmcsClientPurchasedDomains,
  GetWhmcsClientPurchasedProducts,
} from '../../../@store/Actions/whmcs.action';

@Component({
  template: `<h1 mat-dialog-title>{{ data.firstname }} {{ data.lastname }}</h1>
    <div class="border-t border-gray-200"></div>
    <div cdkFocusInitial mat-dialog-content>
      <div *ngIf="loading" class="text-center pt-5 mt-5" mat-dialog-content>
        <play-components-simple-spinner
          *ngIf="loading"
          class="grow"
          mainColor="blue"
          id="spinner"
        ></play-components-simple-spinner>
      </div>
      <!-- tailwind card for displaying basic client info such as
     1. Firstname and Lastname
     2. Email
     3. Date Created
     4. Last Login Date
     6. IP Address
     -->
      <!-- the card should have an icon to the left of the card title -->
      <div *ngIf="!loading && lastLogin && ipAddress" class="flex flex-col">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div
            class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"
          >
            <div
              class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
            >
              <div class="px-4 py-5 sm:px-6">
                <h3 class="text-lg leading-6 font-medium text-gray-900">
                  Client Details
                </h3>
                <p class="mt-1 max-w text-sm text-gray-500">
                  Basic client information.
                </p>
                <div class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                  <div
                    class="col-span-1 bg-white shadow-lg border-gray-200 border rounded-lg overflow-hidden"
                  >
                    <div class="px-4 py-5 sm:p-6">
                      <dl>
                        <dt class="text-sm font-medium text-gray-500 truncate">
                          Firstname
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900">
                          {{ data.firstname }}
                        </dd>
                      </dl>
                    </div>
                  </div>
                  <div
                    class="col-span-1 bg-white shadow-lg border-gray-200 border rounded-lg  rounded-lg overflow-hidden"
                  >
                    <div class="px-4 py-5 sm:p-6">
                      <dl>
                        <dt class="text-sm font-medium text-gray-500 truncate">
                          Lastname
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900">
                          {{ data.lastname }}
                        </dd>
                      </dl>
                    </div>
                  </div>
                  <div
                    class="col-span-1 bg-white shadow-lg border-gray-200 border rounded-lg  rounded-lg overflow-hidden"
                  >
                    <div class="px-4 py-5 sm:p-6">
                      <dl>
                        <dt class="text-sm font-medium text-gray-500 truncate">
                          Email
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900">
                          {{ data.email }}
                        </dd>
                      </dl>
                    </div>
                  </div>
                  <div
                    class="col-span-1 bg-white shadow-lg border-gray-200 border rounded-lg  rounded-lg overflow-hidden"
                  >
                    <div class="px-4 py-5 sm:p-6">
                      <dl>
                        <dt class="text-sm font-medium text-gray-500 truncate">
                          Date Created
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900">
                          {{ data.datecreated }}
                        </dd>
                      </dl>
                    </div>
                  </div>
                  <div
                    class="col-span-1 bg-white shadow-lg border-gray-200 border rounded-lg  rounded-lg overflow-hidden"
                  >
                    <div class="px-4 py-5 sm:p-6">
                      <dl>
                        <dt class="text-sm font-medium text-gray-500 truncate">
                          Last Login
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900">
                          {{ lastLogin }}
                        </dd>
                      </dl>
                    </div>
                  </div>
                  <div
                    class="col-span-1 bg-white shadow-lg border-gray-200 border rounded-lg  rounded-lg overflow-hidden"
                  >
                    <div class="px-4 py-5 sm:p-6">
                      <dl>
                        <dt class="text-sm font-medium text-gray-500 truncate">
                          IP Address
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900">
                          {{ ipAddress }}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- end of tailwind card -->
      <!-- tailwind card for displaying purchased products -->
      <div
        *ngIf="!loading && clientProducts"
        class="flex flex-col overflow-hidden mt-10"
      >
        <div class="-my-2 sm:-mx-6 lg:-mx-8">
          <div
            class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"
          >
            <div
              class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
            >
              <div class="px-4 py-5 sm:px-6">
                <h3 class="text-lg leading-6 font-medium text-gray-900">
                  Purchased Products
                </h3>
                <p class="mt-1 max-w text-sm text-gray-500">
                  Products purchased by the client.
                </p>
              </div>
              <ng-container *ngIf="clientProducts.length > 0">
                <ng-container *ngFor="let product of clientProducts">
                  <div class="border-t border-gray-400 mt-2 mb-2"></div>
                  <div class="px-4 py-5 sm:px-6">
                    <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                      <div class="sm:col-span-1">
                        <dt class="text-sm font-medium text-gray-500">
                          Product Name
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900">
                          {{ product.name }}
                        </dd>
                      </div>
                      <div class="sm:col-span-1">
                        <dt class="text-sm font-medium text-gray-500">
                          Domain
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900">
                          {{ product.domain }}
                        </dd>
                      </div>
                      <div class="sm:col-span-1">
                        <dt class="text-sm font-medium text-gray-500">
                          Registration Date
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900">
                          {{ product.regdate | date: 'medium' }}
                        </dd>
                      </div>
                      <div class="sm:col-span-1">
                        <dt class="text-sm font-medium text-gray-500">
                          Due Date
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900">
                          {{ product.nextduedate | date: 'medium' }}
                        </dd>
                      </div>
                      <div class="sm:col-span-1">
                        <dt class="text-sm font-medium text-gray-500">
                          Status
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900">
                          {{ product.status }}
                        </dd>
                      </div>
                      <div class="sm:col-span-1">
                        <dt class="text-sm font-medium text-gray-500">
                          Recurring Amount
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900">
                          {{ product.recurringamount }} €
                        </dd>
                      </div>
                      <div class="sm:col-span-1">
                        <dt class="text-sm font-medium text-gray-500">
                          Disk Usage
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900">
                          {{ product.diskusage }} MB /
                          {{ product.disklimit }} MB
                        </dd>
                      </div>
                      <div class="sm:col-span-1">
                        <dt class="text-sm font-medium text-gray-500">
                          Bandwidth Usage
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900">
                          {{ product.bwusage }} MB / {{ product.bwlimit }} MB
                        </dd>
                      </div>
                    </dl>
                  </div>
                </ng-container>
              </ng-container>
              <ng-container *ngIf="clientProducts.length === 0">
                <div class="border-t border-gray-200"></div>
                <div class="px-4 py-5 sm:px-6">
                  <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                    <div class="sm:col-span-1">
                      <dt class="text-sm font-medium text-gray-500">
                        Client has no products.
                      </dt>
                    </div>
                  </dl>
                </div>
              </ng-container>
            </div>
          </div>
        </div>
      </div>
      <!-- end of tailwind card -->
      <!-- tailwind card for displaying purchased domains -->
      <div
        *ngIf="!loading && clientDomains"
        class="flex flex-col overflow-hidden mt-10"
      >
        <div class="-my-2 sm:-mx-6 lg:-mx-8">
          <div
            class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"
          >
            <div
              class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
            >
              <div class="px-4 py-5 sm:px-6">
                <h3 class="text-lg leading-6 font-medium text-gray-900">
                  Purchased Domains
                </h3>
                <p class="mt-1 max-w text-sm text-gray-500">
                  Domains purchased by the client.
                </p>
              </div>
              <ng-container *ngIf="clientDomains.length > 0">
                <ng-container *ngFor="let domain of clientDomains">
                  <div class="border-t border-gray-400 mt-2 mb-2"></div>
                  <div class="px-4 py-5 sm:px-6">
                    <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                      <div class="sm:col-span-1">
                        <dt class="text-sm font-medium text-gray-500">
                          Domain Name
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900">
                          {{ domain.domainname }}
                        </dd>
                      </div>
                      <div class="sm:col-span-1">
                        <dt class="text-sm font-medium text-gray-500">
                          Registration Date
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900">
                          {{ domain.regdate | date: 'medium' }}
                        </dd>
                      </div>
                      <div class="sm:col-span-1">
                        <dt class="text-sm font-medium text-gray-500">
                          Due Date
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900">
                          {{ domain.nextduedate | date: 'medium' }}
                        </dd>
                      </div>
                      <div class="sm:col-span-1">
                        <dt class="text-sm font-medium text-gray-500">
                          Expire Date
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900">
                          {{ domain.expirydate | date: 'medium' }}
                        </dd>
                      </div>
                      <div class="sm:col-span-1">
                        <dt class="text-sm font-medium text-gray-500">
                          Status
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900">
                          {{ domain.status }}
                        </dd>
                      </div>
                      <div class="sm:col-span-1">
                        <dt class="text-sm font-medium text-gray-500">
                          First Payment Amount
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900">
                          {{ domain.firstpaymentamount }} €
                        </dd>
                      </div>
                      <div class="sm:col-span-1">
                        <dt class="text-sm font-medium text-gray-500">
                          Renewal Amount
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900">
                          {{ domain.recurringamount }} €
                        </dd>
                      </div>
                      <div class="sm:col-span-1">
                        <dt class="text-sm font-medium text-gray-500">
                          Registrat Name
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900">
                          {{ domain.registrar }}
                        </dd>
                      </div>
                      <div class="sm:col-span-1">
                        <dt class="text-sm font-medium text-gray-500">
                          Registry Period
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900">
                          {{ domain.regperiod }} Years
                        </dd>
                      </div>
                    </dl>
                  </div>
                </ng-container>
              </ng-container>
              <ng-container *ngIf="clientDomains.length === 0">
                <div class="border-t border-gray-200"></div>
                <div class="px-4 py-5 sm:px-6">
                  <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                    <div class="sm:col-span-1">
                      <dt class="text-sm font-medium text-gray-500">
                        Client has no domains.
                      </dt>
                    </div>
                  </dl>
                </div>
              </ng-container>
            </div>
          </div>
        </div>
      </div>
      <!-- end of tailwind card -->
    </div>
    <mat-dialog-actions align="end">
      <button
        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        mat-dialog-close="close"
        [mat-dialog-close]="false"
      >
        Close
      </button>
    </mat-dialog-actions>
    <ng-container></ng-container> `,
  styles: [],
})
export class WhmcsClientDetailsDialogComponent implements OnInit {
  loading = true;
  clientDetails: string | undefined;
  telephoneNumber: string | undefined;
  lastLogin: string | undefined;
  ipAddress: string | undefined;
  clientProducts: WhmcsPurchasedProduct[] = [];
  clientDomains: WhmcsDomain[] = [];

  //eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: WhmcsClient,
    private store: Store
  ) {
    this.loading = true;
  }

  ngOnInit(): void {
    //array of promises to run
    const promises = [
      this.getClientDetails(),
      this.getClientProducts(),
      this.getClientDomains(),
    ];
    //run promises
    Promise.all(promises).then(() => {
      console.log('done');
    });
  }

  /**
   * @summary promise to get client details from store
   */
  async getClientDetails(): Promise<void> {
    const id = Number(this.data.id);
    const sub = await this.store
      .dispatch(new GetWhmcsClientDetails({ clientid: id }))
      .subscribe({
        next: (data) => {
          this.clientDetails = data.whmcs.clientDetails;
          //get telephoneNumber from clientDetails
          const clientDetailsArray = this.clientDetails?.split(';');
          clientDetailsArray?.forEach((item) => {
            if (item.includes('telephoneNumber')) {
              this.telephoneNumber = item.split('=')[1];
            }
            //get lastLogin from clientDetails
            if (item.includes('lastlogin')) {
              this.lastLogin = item.split('=')[1];
              //cut last login to the first <br>
              this.lastLogin = this.lastLogin?.split('<br>')[0];
              //delete Date:
              this.lastLogin = this.lastLogin?.replace('Date:', '');
            }
            //get ipAddress from clientDetails
            if (item.includes('IP Address')) {
              this.ipAddress = item.split('=')[1];
              //cut after the first <br> and before the second <br>
              this.ipAddress = this.ipAddress?.split('<br>')[1];
              this.ipAddress = this.ipAddress?.split('<br>')[0];
              //delete IP Address:
              this.ipAddress = this.ipAddress?.replace('IP Address:', '');
            }
          });
          sub.unsubscribe();
        },
        error: (error) => {
          console.log(error);
          sub.unsubscribe();
        },
      });
  }

  /**
   * @summary promise to get client products from store
   *
   */
  async getClientProducts(): Promise<void> {
    //convert this.data.id to number
    const id = Number(this.data.id);
    const sub = await this.store
      .dispatch(
        new GetWhmcsClientPurchasedProducts({
          limitstart: 0,
          limitnum: 100,
          clientid: id,
        })
      )
      .subscribe({
        next: (data) => {
          this.clientProducts = data.whmcs.clientProducts;
          sub.unsubscribe();
          this.loading = false;
        },
        error: (error) => {
          console.log(error);
          sub.unsubscribe();
        },
      });
  }

  /**
   * @summary promise to get client domains from store
   */
  async getClientDomains(): Promise<void> {
    //convert this.data.id to number
    const id = Number(this.data.id);
    const sub = await this.store
      .dispatch(
        new GetWhmcsClientPurchasedDomains({
          limitstart: 0,
          limitnum: 100,
          clientid: id,
        })
      )
      .subscribe({
        next: (data) => {
          this.clientDomains = data.whmcs.clientDomains;
          sub.unsubscribe();
        },
        error: (error) => {
          console.log(error);
          sub.unsubscribe();
        },
      });
  }
}
