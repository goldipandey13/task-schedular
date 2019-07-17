import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { MatIconModule, MatDialogModule, MatSnackBarModule, MatCardModule } from '@angular/material';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { AppRoutingModule } from './app-routing.module';
import { SignUpComponent } from './account/sign-up/sign-up.component';
import { SignInComponent } from './account/sign-in/sign-in.component';
import { AppComponent } from './app.component';
import { AjaxUtils } from './shared/ajax.util';
import { ErrorService } from './shared/error.service';
import { UrlConstants } from './shared/url-constant';
import { CommonService } from './shared/common.service';
import { AccountService } from './account/account.service';
import { HeaderComponent } from './shared/header/header.component';
import { TasksComponent } from './tasks/tasks.component';
import { TokenInterceptor } from './custom-interceptor';
import { ToastMessagesComponent } from './shared/toast-message/toast-message.component';
import { TaskDetailsComponent } from './tasks/task-details/task-details.component';
import { TasksService } from './tasks/task.service';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    ToastMessagesComponent,
    HeaderComponent,
    TasksComponent,
    TaskDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    MatCardModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],
  providers: [AjaxUtils, ErrorService, UrlConstants, AccountService, CommonService, TasksService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
