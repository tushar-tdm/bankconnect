import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { SignupServiceService } from './services/signup-service.service';

import { HttpClientModule} from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material';
import { NavComponent } from './nav/nav.component';
import { SupportComponent } from './support/support.component';
import { ApiComponent } from './api/api.component';
import { SignupComponent } from './signup/signup.component';
import { SubmitComponent } from './submit/submit.component';
import { CbsComponent } from './cbs/cbs.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    SupportComponent,
    ApiComponent,
    SignupComponent,
    SubmitComponent,
    CbsComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [SignupServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
