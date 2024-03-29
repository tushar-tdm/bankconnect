import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SupportComponent } from './support/support.component';
import { ApiComponent } from './api/api.component';
import { SignupComponent } from './signup/signup.component';
import { SubmitComponent } from './submit/submit.component';
import { CbsComponent } from './cbs/cbs.component';
import { ApiResolverService } from './api/api-resolver.service';
import { ApiListResolverService } from './apilist/apilist-resolver.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CbssuccessComponent } from './cbssuccess/cbssuccess.component';
import { CbsregisterComponent } from './cbsregister/cbsregister.component';
import { ProfileComponent } from './profile/profile.component';
import { SelectedApiListResolverService } from './dashboard/select-apilist-resolver.service';
import { GetUserProfileResolverService } from './profile/get-userprofile-resolver.service';
import { GetBMUserProfileResolverService } from './bmprofile/bmprofile-resolver.service';
import { LoginComponent } from './login/login.component';
import { ApilistComponent } from './apilist/apilist.component';
import { HomeComponent } from './home/home.component';
import { OverviewComponent } from './overview/overview.component';
import { OverviewResolverService } from './overview/overview-resolver.service';
import { ApisecurityComponent } from './apisecurity/apisecurity.component';
import { ApiSecurityResolverService } from './apisecurity/apisecurity-resolver.service';
import { PublishComponent } from './publish/publish.component';
import { PublishResolverService } from './publish/publish-resolver.service';
import { RefreshComponent } from './refresh/refresh.component';
import { BmprofileComponent } from './bmprofile/bmprofile.component';
import { RoleSignupComponent } from './role-signup/role-signup.component';
import { DocsComponent } from './docs/docs.component';


const routes: Routes = [
  { path : 'home/:bankname' , component: HomeComponent },
  { path: 'refresh', component: RefreshComponent },
  { path: 'api', component: ApiComponent, resolve : { apiList : ApiResolverService}},
  { path: 'support', component: SupportComponent },
  { path: 'submit', component: SubmitComponent },
  { path: 'roleSignup', component: RoleSignupComponent},
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
  { path: 'apilist', component: ApilistComponent, resolve:{ apiList : ApiListResolverService}},
  { path: 'overview', component: OverviewComponent, resolve:{ apiDetails : OverviewResolverService} },
  { path: 'apisecurity', component: ApisecurityComponent, resolve:{ selectedApi : ApiSecurityResolverService}},
  { path: 'publish', component: PublishComponent, resolve:{ apilist : PublishResolverService}},
  { path: 'bmprofile', component: BmprofileComponent, resolve:{bmuser_profile : GetBMUserProfileResolverService}},
  { path: 'docs/:email/:org', component: DocsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
