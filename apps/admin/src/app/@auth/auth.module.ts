import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '@play.app/components';
import { AdminAuthComponent } from './auth.component';
import { routes } from './auth.routing.module';
import { LoginComponent } from './login/login.component';
import { AdminLogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [LoginComponent, AdminAuthComponent, AdminLogoutComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    RouterModule.forChild(routes),
  ],
  exports: [LoginComponent],
})
export class AuthModule {}
