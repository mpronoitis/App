import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MbamOneViewSite } from '@play.app/types/Mbam/MbamOneViewSite';
import { Store } from '@ngxs/store';
import { MbamOneViewEndpoint } from '@play.app/types/Mbam/MbamOneViewEndpoint';
import { GetMbamEndpoints } from '../../../@store/Actions/mbam.action';

@Component({
  template: `
    <h1 mat-dialog-title>Site Details - {{ data.companyName }}</h1>
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
      <!-- using tailwind we want to create a grid with 2 columns - neuomorphic card -->
      <div class="grid grid-cols-2 gap-4 mb-4">
        <div class="bg-white rounded-lg shadow-lg p-4">
          <h3 class="text-lg font-semibold text-gray-700">Site ID</h3>
          <p class="text-sm text-gray-500 truncate">{{ data.id }}</p>
        </div>
        <div class="bg-white rounded-lg shadow-lg p-4">
          <h3 class="text-lg font-semibold text-gray-700">Site Name</h3>
          <p class="text-sm text-gray-500 truncate">{{ data.companyName }}</p>
        </div>
        <div class="bg-white rounded-lg shadow-lg p-4">
          <!-- loop account_owner array -->
          <h3 class="text-lg font-semibold text-gray-700">Account Owners</h3>
          <ng-container *ngFor="let owner of data.accountOwner">
            <!-- owner emails in badges when hovering show roles array concatenated -->
            <span
              [matTooltip]="owner.roles.join(', ')"
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2"
              >{{ owner.email }}</span
            >
          </ng-container>
        </div>
        <div class="bg-white rounded-lg shadow-lg p-4">
          <!-- loop subscriptions array -->
          <h3 class="text-lg font-semibold text-gray-700">Subscriptions</h3>
          <ng-container *ngFor="let subscription of data.subscriptions">
            <!-- subscription name in badges -->
            <span
              [matTooltip]="subscription.billingDuration"
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2"
              >{{ subscription.catalogCode }} -
              {{ subscription.termType }}</span
            >
          </ng-container>
        </div>
        <div class="bg-white rounded-lg shadow-lg p-4">
          <h3 class="text-lg font-semibold text-gray-700">Created By</h3>
          <p class="text-sm text-gray-500">
            {{ data.createdbyid }} - {{ data.createddate | date: 'medium' }}
          </p>
        </div>
        <div class="bg-white rounded-lg shadow-lg p-4">
          <h3 class="text-lg font-semibold text-gray-700">Last Modified By</h3>
          <p class="text-sm text-gray-500">
            {{ data.lastmodifiedbyid }} -
            {{ data.lastmodifieddate | date: 'medium' }}
          </p>
        </div>
      </div>

      <div
        *ngIf="endpoints_loading"
        class="text-center pt-5 mt-5"
        cdkFocusInitial
        mat-dialog-content
      >
        <play-components-simple-spinner
          *ngIf="endpoints_loading"
          class="grow"
          mainColor="blue"
          id="spinner"
        ></play-components-simple-spinner>
      </div>

      <!-- neumorphic container for endpoints
            we will loop through the endpoints array and display them in individual cards -->
      <div *ngIf="!endpoints_loading" class="bg-white rounded-lg shadow-lg p-4">
        <h3 class="text-lg font-semibold text-gray-700">Endpoints</h3>
        <div class="grid grid-cols-2 gap-4 mb-4">
          <div *ngFor="let endpoint of endpoints">
            <div class="bg-white rounded-lg shadow-lg p-4">
              <!-- bordered container for username -->
              <div class="flex justify-between border-b border-gray-200">
                <h3 class="text-lg font-semibold text-gray-700">Machine</h3>
                <!-- don't allow text to overflow -->
                <p class="text-sm text-gray-500 truncate">
                  {{ endpoint.agent.fullyQualifiedHostName }} -
                  {{ endpoint.agent.nics[0].ips[0] }}
                </p>
              </div>

              <!-- bordered container for os details -->
              <div class="flex mt-2 justify-between border-b border-gray-200">
                <h3 class="text-lg font-semibold text-gray-700">OS</h3>
                <!-- don't allow text to overflow -->
                <p class="text-sm text-gray-500 truncate">
                  {{ endpoint.agent.osInfo.osReleaseName }} -
                  {{ endpoint.agent.osInfo.osVersion }}
                </p>
              </div>

              <!-- bordered container for location -->
              <div class="flex mt-2 justify-between border-b border-gray-200">
                <h3 class="text-lg font-semibold text-gray-700">Location</h3>
                <!-- don't allow text to overflow -->
                <p class="text-sm text-gray-500 truncate">
                  {{ endpoint.agent.sourceLocation.city }},{{
                    endpoint.agent.sourceLocation.countryIso
                  }}
                  - {{ endpoint.agent.machineIp }}
                </p>
              </div>

              <!-- bordered container for last scan -->
              <div class="flex mt-2 justify-between border-b border-gray-200">
                <h3 class="text-lg font-semibold text-gray-700">Last Scan</h3>
                <!-- don't allow text to overflow -->
                <p class="text-sm text-gray-500 truncate">
                  {{ endpoint.machine.lastScannedAt | date: 'medium' }}
                </p>
              </div>

              <!-- last seen -->
              <div class="flex mt-2 justify-between border-b border-gray-200">
                <h3 class="text-lg font-semibold text-gray-700">Last Seen</h3>
                <!-- don't allow text to overflow -->
                <p class="text-sm text-gray-500 truncate">
                  {{ endpoint.machine.lastDaySeen | date: 'medium' }}
                </p>
              </div>

              <!-- bordered container for statuses -->
              <div class="flex mt-2 justify-between border-b border-gray-200">
                <!-- don't allow text to overflow -->
                <!-- if isolated is true show green badge else show red badge -->
                <span
                  [ngClass]="{
                    'bg-green-100 text-green-800': !endpoint.machine.isolated,
                    'bg-red-100 text-red-800': endpoint.machine.isolated
                  }"
                  class="mb-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mr-2"
                >
                  {{ endpoint.machine.isolated ? 'Isolated' : 'Not Isolated' }}
                </span>

                <!-- if infectionCount is greater than 0 show red badge else show green badge -->
                <span
                  [ngClass]="{
                    'bg-green-100 text-green-800':
                      endpoint.machine.infectionCount === 0,
                    'bg-red-100 text-red-800':
                      endpoint.machine.infectionCount > 0
                  }"
                  class="mb-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mr-2"
                >
                  {{
                    endpoint.machine.infectionCount === 0 ? 'Clean' : 'Infected'
                  }}
                </span>

                <!-- if rebootRequired is true show red badge else show green badge -->
                <span
                  [ngClass]="{
                    'bg-green-100 text-green-800':
                      !endpoint.machine.rebootRequired,
                    'bg-red-100 text-red-800': endpoint.machine.rebootRequired
                  }"
                  class="mb-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mr-2"
                >
                  {{
                    endpoint.machine.rebootRequired
                      ? 'Reboot Required'
                      : 'No Reboot Required'
                  }}
                </span>

                <!-- if isDeleted is true show red badge else show green badge -->
                <span
                  [ngClass]="{
                    'bg-green-100 text-green-800': !endpoint.machine.isDeleted,
                    'bg-red-100 text-red-800': endpoint.machine.isDeleted
                  }"
                  class="mb-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mr-2"
                >
                  {{ endpoint.machine.isDeleted ? 'Deleted' : 'Not Deleted' }}
                </span>

                <!-- if suspiciousActivityCount is greater than 0 show red badge else show green badge -->
                <span
                  [ngClass]="{
                    'bg-green-100 text-green-800':
                      endpoint.machine.suspiciousActivityCount === 0,
                    'bg-red-100 text-red-800':
                      endpoint.machine.suspiciousActivityCount > 0
                  }"
                  class="mb-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mr-2"
                >
                  {{
                    endpoint.machine.suspiciousActivityCount === 0
                      ? 'No Suspicious Activity'
                      : 'Suspicious Activity'
                  }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
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
export class MbamSiteDetailsDialogComponent {
  loading = false;

  endpoints_loading = false;
  endpoints: MbamOneViewEndpoint[] | null = null;

  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MbamOneViewSite,
    private store: Store
  ) {
    this.getEndpoints();
  }

  /**
   * @summary Get endpoints for site
   */
  getEndpoints() {
    this.endpoints_loading = true;
    this.store
      .dispatch(new GetMbamEndpoints({ accountId: this.data.accountId }))
      .subscribe({
        next: (res) => {
          this.endpoints = res.mbam.endpoints;
          this.endpoints_loading = false;
          console.log(this.endpoints);
        },
        error: (err) => {
          this.endpoints_loading = false;
          console.error(err);
        },
      });
  }
}
