import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ContactService } from '@play.app/services/Contact/Contact.service';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { Contact } from '@play.app/types/Contact/Contact';

@Component({
  selector: 'play-app-trial-dialog',
  template: `
    <h1 mat-dialog-title>Request a trial</h1>
    <div mat-dialog-content>
      <!-- Component Code -->
      <div class="relative w-full max-w-md h-full">
        <form [formGroup]="form" class="space-y-4">
          <div>
            <label
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              for="email"
            >
              Email Address
            </label>
            <input
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              id="email"
              type="email"
              formControlName="email"
              markAsterisk
            />
          </div>

          <div>
            <label
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              for="phone-number"
            >
              Phone Number
            </label>
            <input
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              id="phoneNumber"
              type="text"
              formControlName="phoneNumber"
            />
          </div>

          <div>
            <label
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              for="subject"
            >
              Subject
            </label>
            <input
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              id="subject"
              type="text"
              markAsterisk
              formControlName="subject"
            />
          </div>

          <div>
            <label
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              for="message"
            >
              Your Message
            </label>
            <textarea
              rows="10"
              markAsterisk
              formControlName="message"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            >
            </textarea>
          </div>
          <div class="flex justify-end">
            <play-components-simple-button
              title="Send Message"
              [icon]="faPaperPlane"
              (click)="onSubmit()"
              size="w-full"
              [loading]="loading"
            ></play-components-simple-button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [``],
})
export class TrialDialogComponent {
  loading = false;
  form = new FormGroup({
    email: new FormControl({ value: '', disabled: false }, [
      Validators.required,
      Validators.email,
    ]),
    message: new FormControl({ value: '', disabled: false }, [
      Validators.required,
    ]),
    phoneNumber: new FormControl({ value: '', disabled: false }, []),
    subject: new FormControl({ value: '', disabled: false }, [
      Validators.required,
    ]),
  });
  faPaperPlane = faPaperPlane;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(
    private toastr: ToastrService,
    private contactService: ContactService
  ) {}

  onSubmit() {
    this.loading = true;
    if (this.form.invalid) {
      this.toastr.error();
      this.loading = false;
      return;
    }
    //if all required fields are completed
    const contactRequest: Contact = {
      email: this.form.get('email')?.value || '',
      message: this.form.get('message')?.value || '',
      phoneNumber: this.form.get('phoneNumber')?.value || '',
      subject: this.form.get('subject')?.value || '',
    };
    this.contactService.makeContactRequest(contactRequest).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.toastr.success('Your message has been sent successfully');
        this.loading = false;
        this.form.reset(); //reset form
      },
    });
  }
}
