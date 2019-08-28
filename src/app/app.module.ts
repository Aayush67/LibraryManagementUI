import { BrowserModule } from '@angular/platform-browser';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { HomepageComponent } from './homepage/homepage.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatSidenavModule, MatTableModule,
  MatToolbarModule, MatTooltipModule
} from '@angular/material';
import {MatDialogModule} from '@angular/material';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HttpRequestInterceptor} from './interceptor/HttpRequestInterceptor';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { SearchComponent } from './search/search.component';
import { AccountComponent } from './account/account.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { MessageBoxComponent } from './common/message-box/message-box.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgotpasswordComponent,
    HomepageComponent,
    SearchComponent,
    AccountComponent,
    WelcomeComponent,
    MessageBoxComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatTooltipModule
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ForgotpasswordComponent, MessageBoxComponent]
})
export class AppModule { }
