import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EdiCredit } from '@play.app/types/Edi/EdiCredit';
import { Store } from '@ngxs/store';

@Component({
  template: `
    <h1 mat-dialog-title>Edi Credit of {{ userEmail }}</h1>
    <div class="border-t border-gray-200"></div>
    <div cdkFocusInitial mat-dialog-content>
      <!-- using tailwind we want to create a grid with 2 columns-->
      <div class="grid grid-cols-2 gap-4 mb-4">
        <!--ID -->
        <div class="bg-white rounded-lg shadow-lg p-4">
          <h3 class="text-lg font-semibold text-gray-700">Edi Credit ID</h3>
          <p class="text-sm text-gray-500">{{ data.id }}</p>
        </div>
        <!--Amount -->
        <div class="bg-white rounded-lg shadow-lg p-4">
          <h3 class="text-lg font-semibold text-gray-700">Amount</h3>
          <p class="text-sm text-gray-500">{{ data.amount }}</p>
        </div>

        <!-- CreatedAt -->
        <div class="bg-white rounded-lg shadow-lg p-4">
          <h3 class="text-lg font-semibold text-gray-700">CreatedDate</h3>
          <p class="text-sm text-gray-500">{{ data.createdAt }}</p>
        </div>

        <!-- UpdatedAt -->
        <div class="bg-white rounded-lg shadow-lg p-4">
          <h3 class="text-lg font-semibold text-gray-700">UpdatedDate</h3>
          <p class="text-sm text-gray-500">{{ data.updatedAt }}</p>
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
      </div>
    </div>
  `,
  styles: [``],
})
export class EdiCreditDetailsDialogComponent {
  userEmail: string | undefined;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: EdiCredit,
    private store: Store
  ) {
    this.userEmail = this.fetchUserEmail();
  }

  // take email of user and display it in the dialog
  fetchUserEmail() {
    return this.store
      .selectSnapshot((state) => state.users.users)
      .find((user: any) => user.id === this.data.customerId).email;
  }
}
