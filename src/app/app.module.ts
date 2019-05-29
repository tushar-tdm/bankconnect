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
<<<<<<< HEAD
import { ApiListResolverService } from './api/apilist-resolver.service';
=======
import { CbsregisterComponent } from './cbsregister/cbsregister.component';
import { CbssuccessComponent } from './cbssuccess/cbssuccess.component';
>>>>>>> db32343bce189799d836886846def320243d0fee


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
    CbssuccessComponent
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
  providers: [SignupServiceService,ApiListResolverService],
  bootstrap: [AppComponent]
})
export class AppModule { }
