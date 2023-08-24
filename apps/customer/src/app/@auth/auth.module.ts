import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ComponentsModule } from '@play.app/components';
import { RouterModule } from '@angular/router';
import { routes } from './auth.routing.module';
import { AuthComponent } from './auth.component';
import { DirectivesModule } from '@play.app/directives';

@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    AuthComponent,
  ],
  imports: [
    CommonModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    DirectivesModule,
  ],
  exports: [LoginComponent, LogoutComponent, RegisterComponent, AuthComponent],
})
export class AuthModule {}
