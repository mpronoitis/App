import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { WhmcsOrder } from '@play.app/types/Whmcs/WhmcsOrder';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WhmcsAcceptOrder } from '@play.app/types/Whmcs/WhmcsAcceptOrder';
import { AcceptWhmcsOrder } from '../../../@store/Actions/whmcs.action';
import { ToastrService } from 'ngx-toastr';

@Component({
  template: `<h1 mat-dialog-title>
      Accept Order[#{{ data.id }}] - {{ data.name }}
    </h1>
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

      <form [formGroup]="form" *ngIf="!loading">
        <!--
  fields = [
    { name: 'orderId', type: 'number', label: 'Order ID', required: true },
    { name: 'serverId', type: 'number', label: 'Server ID' },
    { name: 'username', type: 'text', label: 'Username' },
    { name: 'password', type: 'text', label: 'Password' },
    { name: 'registrar', type: 'text', label: 'Registrar' },
    { name: 'sendRegistrar', type: 'checkbox', label: 'Send to Registrar' },
    { name: 'sendModule', type: 'checkbox', label: 'Send to Module' },
    { name: 'sendEmail', type: 'checkbox', label: 'Send Email' },
  ];
    Create loop to build fields , full width tailwind inputs -->
        <div class="flex flex-wrap -mx-3 mb-6 mt-4">
          <div class="w-full px-3">
            <ng-container *ngFor="let field of fields">
              <!-- switch case for field types -->
              <ng-container [ngSwitch]="field.type">
                <mat-form-field class="w-full" *ngSwitchCase="'text'">
                  <mat-label>{{ field.label }}</mat-label>
                  <input matInput [formControlName]="field.name" />
                </mat-form-field>
                <mat-form-field class="w-full" *ngSwitchCase="'number'">
                  <mat-label>{{ field.label }}</mat-label>
                  <input
                    matInput
                    [formControlName]="field.name"
                    type="number"
                  />
                </mat-form-field>
                <mat-checkbox
                  class="mx-2"
                  color="primary"
                  *ngSwitchCase="'checkbox'"
                  [formControlName]="field.name"
                  >{{ field.label }}</mat-checkbox
                >
              </ng-container>
            </ng-container>
          </div>
        </div>
      </form>
    </div>
    <mat-dialog-actions align="end">
      <button
        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        mat-dialog-close="close"
        [mat-dialog-close]="false"
      >
        Close
      </button>
      <!-- submit button -->
      <button
        class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2"
        [disabled]="loading"
        (click)="submit()"
      >
        Accept Order
      </button>
    </mat-dialog-actions>
    <ng-container></ng-container> `,
  styles: [``],
})
export class WhmcsAcceptOrderDialogComponent {
  form = new FormGroup({
    orderId: new FormControl(this.data.id, [Validators.required]),
    serverId: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
    registrar: new FormControl(''),
    sendRegistrar: new FormControl(''),
    sendModule: new FormControl('true'),
    sendEmail: new FormControl(''),
  });

  fields = [
    { name: 'orderId', type: 'number', label: 'Order ID', required: true },
    { name: 'serverId', type: 'number', label: 'Server ID' },
    { name: 'username', type: 'text', label: 'Username' },
    { name: 'password', type: 'text', label: 'Password' },
    { name: 'registrar', type: 'text', label: 'Registrar' },
    { name: 'sendRegistrar', type: 'checkbox', label: 'Send to Registrar' },
    { name: 'sendModule', type: 'checkbox', label: 'Send to Module' },
    { name: 'sendEmail', type: 'checkbox', label: 'Send Email' },
  ];

  loading = false;

  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: WhmcsOrder,
    private store: Store,
    private dialogRef: MatDialogRef<WhmcsAcceptOrderDialogComponent>,
    private toastr: ToastrService
  ) {}

  /**
   * @summary Submit the form
   */
  submit() {
    this.loading = true;
    const action: WhmcsAcceptOrder = {
      orderId: this.form.get('orderId')?.value as number,
      //serverId can be either a number or empty , if its empty set to 0 if its not empty try to parse it to a number
      serverId: this.form.value.serverId
        ? parseInt(this.form.value.serverId)
        : 0,
      username: (this.form.get('username') as FormControl).value as string | '',
      password: (this.form.get('password') as FormControl).value as string | '',
      registrar: (this.form.get('registrar') as FormControl).value as
        | string
        | '',
      sendRegistrar: ((this.form.get('sendRegistrar') as FormControl).value ===
        'true') as boolean | null,
      sendModule: ((this.form.get('sendModule') as FormControl).value ===
        'true') as boolean | null,
      sendEmail: ((this.form.get('sendEmail') as FormControl).value ===
        'true') as boolean | null,
    };

    console.log(action);

    const sub = this.store
      .dispatch(new AcceptWhmcsOrder({ acceptOrderModel: action }))
      .subscribe({
        next: () => {
          this.loading = false;
          this.toastr.success('Order accepted successfully');
          sub.unsubscribe();
          this.dialogRef.close(true);
        },
        error: () => {
          this.loading = false;
          this.toastr.error();
          sub.unsubscribe();
          this.dialogRef.close(false);
        },
      });
  }
}
