import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WhmcsAddClient } from '@play.app/types/Whmcs/WhmcsAddClient';
import { Store } from '@ngxs/store';
import { AddWhmcsClient } from '../../../@store/Actions/whmcs.action';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  template: `
    <h1 mat-dialog-title>Add Whmcs Client</h1>
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
      <form [formGroup]="form">
        <!-- tailwind alert for errors -->
        <div
          *ngIf="form.invalid && form.touched && show_error"
          class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong class="font-bold">{{ error_text }}!</strong>
        </div>
        <!-- create a loop to create the form fields -->
        <ng-container *ngFor="let field of fields">
          <div class="flex flex-col mb-4">
            <label class="text-sm font-bold mb-2" [for]="field.name">
              {{ field.label }}
              <span *ngIf="field.required" class="text-red-500">*</span>
            </label>
            <input
              placeholder="e.x. {{ field.placeholder }}"
              class="border border-gray-200 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              [formControlName]="field.name"
              [type]="field.type"
              [id]="field.name"
            />
          </div>
        </ng-container>
      </form>
      <div
        *ngIf="show_error && !form.invalid"
        class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong class="font-bold">{{ error_text }}!</strong>
      </div>
    </div>
    <mat-dialog-actions align="end">
      <button
        (click)="onSubmit()"
        class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
        [disabled]="!form.touched"
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
export class WhmcsAddClientDialogComponent {
  loading = false;
  show_error = false;
  error_text = 'Fill all required fields';

  form = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    companyName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    address1: new FormControl('', [Validators.required]),
    address2: new FormControl(''),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    postcode: new FormControl('', [Validators.required]),
    country: new FormControl('GR', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    taxId: new FormControl(''),
    password: new FormControl('', [Validators.required]),
    securityQuestionId: new FormControl('', [Validators.required]),
    securityQuestionAnswer: new FormControl(''),
    currencyId: new FormControl('0'),
    clientGroupId: new FormControl('0'),
    customFields: new FormControl(''),
    language: new FormControl(''),
    ownerUserId: new FormControl('0'),
    ipAddress: new FormControl('0'),
    notes: new FormControl(''),
    marketingEmailsOptIn: new FormControl('false'),
    noEmail: new FormControl('false'),
    skipValidation: new FormControl('true'),
  });

  //create fields array
  fields = [
    {
      name: 'firstName',
      label: 'First Name',
      type: 'text',
      required: true,
      placeholder: 'John',
    },
    {
      name: 'lastName',
      label: 'Last Name',
      type: 'text',
      required: true,
      placeholder: 'Doe',
    },
    {
      name: 'companyName',
      label: 'Company Name',
      type: 'text',
      required: true,
      placeholder: 'Company Name',
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      required: true,
      placeholder: 'foo@bar.com',
    },
    {
      name: 'address1',
      label: 'Address 1',
      type: 'text',
      required: true,
      placeholder: 'Address 1',
    },
    {
      name: 'address2',
      label: 'Address 2',
      type: 'text',
      required: false,
      placeholder: 'Address 2',
    },
    {
      name: 'city',
      label: 'City',
      type: 'text',
      required: true,
      placeholder: 'City',
    },
    {
      name: 'state',
      label: 'State',
      type: 'text',
      required: true,
      placeholder: 'State',
    },
    {
      name: 'postcode',
      label: 'Postcode',
      type: 'text',
      required: true,
      placeholder: 'Postcode',
    },
    {
      name: 'country',
      label: 'Country',
      type: 'text',
      required: true,
      placeholder: 'GR',
    },
    {
      name: 'phoneNumber',
      label: 'Phone Number',
      type: 'text',
      required: true,
      placeholder: 'Phone Number',
    },
    {
      name: 'taxId',
      label: 'Tax Id',
      type: 'text',
      required: false,
      placeholder: 'Tax Id',
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      required: true,
      placeholder: 'Password',
    },
    {
      name: 'securityQuestionId',
      label: 'Security Question Id',
      type: 'text',
      required: true,
      placeholder: '1',
    },
    {
      name: 'securityQuestionAnswer',
      label: 'Security Question Answer',
      type: 'text',
      required: false,
      placeholder: 'Security Question Answer',
    },
    {
      name: 'currencyId',
      label: 'Currency Id',
      type: 'text',
      required: false,
      placeholder: 'Currency Id',
    },
    {
      name: 'clientGroupId',
      label: 'Client Group Id',
      type: 'text',
      required: false,
      placeholder: 'Client Group Id',
    },
    {
      name: 'customFields',
      label: 'Custom Fields',
      type: 'text',
      required: false,
      placeholder: 'Custom Fields',
    },
    {
      name: 'language',
      label: 'Language',
      type: 'text',
      required: false,
      placeholder: 'Language',
    },
    {
      name: 'ownerUserId',
      label: 'Owner User Id',
      type: 'text',
      required: false,
      placeholder: 'Owner User Id',
    },
    {
      name: 'ipAddress',
      label: 'Ip Address',
      type: 'text',
      required: false,
      placeholder: 'Ip Address',
    },
    {
      name: 'notes',
      label: 'Notes',
      type: 'text',
      required: false,
      placeholder: 'Notes',
    },
    {
      name: 'marketingEmailsOptIn',
      label: 'Marketing Emails Opt In',
      type: 'boolean',
      required: false,
      placeholder: 'true',
    },
    {
      name: 'noEmail',
      label: 'No Email',
      type: 'text',
      required: false,
      placeholder: 'true',
    },
    {
      name: 'skipValidation',
      label: 'Skip Validation',
      type: 'text',
      required: false,
      placeholder: 'true',
    },
  ];

  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(
    private store: Store,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<WhmcsAddClientDialogComponent>
  ) {}

  /**
   * @summary on submit form
   */
  onSubmit() {
    //if form is invalid return
    if (this.form.invalid) {
      this.show_error = true;
      this.toastr.error();
      return;
    }
    //map form values to object (WhmcsAddClient)
    const whmcsAddClient: WhmcsAddClient = {
      firstName: this.form.controls.firstName.value ?? '',
      lastName: this.form.controls.lastName.value ?? '',
      companyName: this.form.controls.companyName.value ?? '',
      email: this.form.controls.email.value ?? '',
      address1: this.form.controls.address1.value ?? '',
      address2: this.form.controls.address2.value ?? '',
      city: this.form.controls.city.value ?? '',
      state: this.form.controls.state.value ?? '',
      postcode: this.form.controls.postcode.value ?? '',
      country: this.form.controls.country.value ?? '',
      phoneNumber: this.form.controls.phoneNumber.value ?? '',
      taxId: this.form.controls.taxId.value ?? '',
      password: this.form.controls.password.value ?? '',
      securityQuestionId:
        (this.form.controls.securityQuestionId.value as unknown as number) ?? 0,
      securityQuestionAnswer:
        this.form.controls.securityQuestionAnswer.value ?? '',
      currencyId:
        (this.form.controls.currencyId.value as unknown as number) ?? 0,
      clientGroupId:
        (this.form.controls.clientGroupId.value as unknown as number) ?? 0,
      customFields: this.form.controls.customFields.value ?? '',
      language: this.form.controls.language.value ?? '',
      ownerUserId:
        (this.form.controls.ownerUserId.value as unknown as number) ?? 0,
      ipAddress: this.form.controls.ipAddress.value ?? '',
      notes: this.form.controls.notes.value ?? '',
      marketingEmailsOptIn:
        this.form.controls.marketingEmailsOptIn.value === 'true',
      noEmail: this.form.controls.noEmail.value === 'true',
      skipValidation: this.form.controls.skipValidation.value === 'true',
    };

    this.store
      .dispatch(new AddWhmcsClient({ client: whmcsAddClient }))
      .subscribe({
        next: (response) => {
          this.toastr.success('Client added successfully');
          //close modal
          this.dialogRef.close();
        },
        error: (error) => {
          //if response code is 400
          if (error.status === 400) {
            this.error_text = '';
            //loop error.error.errors.Messages and add to form errors
            error.error.errors.Messages.forEach((message: string) => {
              this.error_text = this.error_text + message + ' , ';
            });
            //remove last comma
            this.error_text = this.error_text.slice(0, -2);
            //show error toasts
            this.toastr.error();
            this.show_error = true;
          }
        },
      });
  }
}
