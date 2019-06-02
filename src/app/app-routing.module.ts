import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SupportComponent } from './support/support.component';
import { ApiComponent } from './api/api.component';
import { SignupComponent } from './signup/signup.component';
import { SubmitComponent } from './submit/submit.component';
import { CbsComponent } from './cbs/cbs.component';
import { SignupServiceService } from './services/signup-service.service';
import { ApiResolverService } from './api/api-resolver.service';
import { ApiListResolverService } from './apilist/apilist-resolver.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CbssuccessComponent } from './cbssuccess/cbssuccess.component';
import { CbsregisterComponent } from './cbsregister/cbsregister.component';
import { ProfileComponent } from './profile/profile.component';
import { SelectedApiListResolverService } from './dashboard/select-apilist-resolver.service';
import { GetUserProfileResolverService } from './profile/get-userprofile-resolver.service';
import { LoginComponent } from './login/login.component';
import { ApilistComponent } from './apilist/apilist.component';

const routes: Routes = [
  { path : '' , redirectTo : 'signup', pathMatch: 'full'},
  { path: 'api', component: ApiComponent, resolve : { apiList : ApiResolverService}},
  { path: 'support', component: SupportComponent },
  { path: 'submit', component: SubmitComponent },
  { path: 'signup', component: SignupComponent},
  { path: 'corebankservices',
    component: CbsComponent,
    children: [
      { path : '' , redirectTo : 'register', pathMatch: 'full'},
      { path: 'success', component: CbssuccessComponent},
      { path: 'register', component: CbsregisterComponent}
    ]
  },
  { path: 'dashboard', component:DashboardComponent, resolve:{selected_api: SelectedApiListResolverService}},
  { path: 'profile', component: ProfileComponent, resolve : { user_profile : GetUserProfileResolverService}},
  { path: 'login', component: LoginComponent},
  { path: 'apilist', component: ApilistComponent, resolve:{ apiList : ApiListResolverService}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
