import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SupportComponent } from './support/support.component';
import { ApiComponent } from './api/api.component';
import { SignupComponent } from './signup/signup.component';
import { SubmitComponent } from './submit/submit.component';
import { CbsComponent } from './cbs/cbs.component';
import { SignupServiceService } from './services/signup-service.service';
import { ApiListResolverService } from './api/apilist-resolver.service';

const routes: Routes = [
  { path : '' , redirectTo : 'signup', pathMatch: 'full'},
  { path: 'api', component: ApiComponent, resolve : { apiList : ApiListResolverService}},
  { path: 'support', component: SupportComponent },
  { path: 'submit', component: SubmitComponent },
  { path: 'signup', component: SignupComponent},
  { path: 'corebankservices', component: CbsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
