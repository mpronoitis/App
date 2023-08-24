import { Component } from '@angular/core';
@Component({
  selector: 'play-app-admin-view',
  template: `
    <div
      class="min-h-screen flex flex-col flex-auto flex-shrink-0 bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
    >
      <play-app-admin-header></play-app-admin-header>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [``],
})
export class AdminViewComponent {}
