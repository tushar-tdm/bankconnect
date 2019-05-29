import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SupportComponent } from './support/support.component';
import { ApiComponent } from './api/api.component';
import { SignupComponent } from './signup/signup.component';
import { SubmitComponent } from './submit/submit.component';
import { CbsComponent } from './cbs/cbs.component';
<<<<<<< HEAD
import { SignupServiceService } from './services/signup-service.service';
import { ApiListResolverService } from './api/apilist-resolver.service';
=======
import { DashboardComponent } from './dashboard/dashboard.component';
import { CbssuccessComponent } from './cbssuccess/cbssuccess.component';
import { CbsregisterComponent } from './cbsregister/cbsregister.component';

>>>>>>> db32343bce189799d836886846def320243d0fee

const routes: Routes = [
  { path : '' , redirectTo : 'signup', pathMatch: 'full'},
  { path: 'api', component: ApiComponent, resolve : { apiList : ApiListResolverService}},
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
  { path: 'dashboard', component:DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
