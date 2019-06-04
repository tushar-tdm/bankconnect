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

import { ApiResolverService } from './api/api-resolver.service';
import { CbsregisterComponent } from './cbsregister/cbsregister.component';
import { CbssuccessComponent } from './cbssuccess/cbssuccess.component';
import { SelectedApiListResolverService } from './dashboard/select-apilist-resolver.service';
import { ProfileComponent } from './profile/profile.component';
import { GetUserProfileResolverService } from './profile/get-userprofile-resolver.service';
import { LoginComponent } from './login/login.component';
import { ApilistComponent } from './apilist/apilist.component';
import { ApiListResolverService } from './apilist/apilist-resolver.service';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { OverviewComponent } from './overview/overview.component';
import { ApiserviceService } from './apiservice.service';
import { OverviewResolverService } from './overview/overview-resolver.service';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    SupportComponent,
    ApiComponent,
    SignupComponent,
    SubmitComponent,
    CbsComponent,
    DashboardComponent,
    CbsregisterComponent,
    CbssuccessComponent,
    ProfileComponent,
    LoginComponent,
    ApilistComponent,
    HomeComponent,
    FooterComponent,
    OverviewComponent
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
  providers: [SignupServiceService,
    ApiResolverService,
    ApiListResolverService,
    SelectedApiListResolverService, 
    GetUserProfileResolverService,
    ApiserviceService,
    OverviewResolverService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
