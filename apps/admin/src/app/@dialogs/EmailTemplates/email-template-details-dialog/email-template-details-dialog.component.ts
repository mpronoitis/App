import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmailTemplate } from '@play.app/types/Mailing/EmailTemplate';

@Component({
  template: `
    <h1 mat-dialog-title>Email Template Details</h1>
    <div mat-dialog-content>
      <!-- using tailwind we will create a grid for the 2 fields in the form
        Center and one under the other-->
      <div class="w-full">
        <form
          class="px-8 pt-6 pb-8 mb-4"
          [formGroup]="form"
          (ngSubmit)="onSubmit()"
        >
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="name"
            >
              Name
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="name"
              formControlName="name"
            />
          </div>
          <div class="mb-6">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="subject"
            >
              Subject
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="subject"
              type="text"
              placeholder="subject"
              formControlName="subject"
            />
          </div>
        </form>
      </div>
    </div>
    <div mat-dialog-actions [align]="'end'">
      <!-- tailwind green save button -->
      <button
        (click)="onSubmit()"
        [disabled]="form.invalid"
        cdkFocusInitial
        class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
      >
        Save
      </button>
      <!-- tailwind red cancel button -->
      <button
        (click)="close()"
        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Cancel
      </button>
    </div>
  `,
  styles: [],
})
export class EmailTemplateDetailsDialogComponent {
  //form containing 2 fields: name and subject
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    subject: new FormControl('', [Validators.required]),
  });

  //eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(
    private dialogref: MatDialogRef<EmailTemplateDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EmailTemplate
  ) {
    //if template is not null, we are in edit mode , so we fill the form with the template values
    if (data) {
      //update name and subject fields with the template values
      this.form.patchValue({
        name: data.name,
        subject: data.subject,
      });
    }
  }

  onSubmit() {
    //return the form values to the parent component and close the dialog
    this.dialogref.close(this.form.value);
  }

  /**
   * close without saving
   */
  close() {
    this.dialogref.close();
  }
}
