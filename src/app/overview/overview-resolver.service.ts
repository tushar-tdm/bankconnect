import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiserviceService } from '../apiservice.service';
import { SignupServiceService } from '../services/signup-service.service';
import { Injectable } from '@angular/core';

@Injectable()
export class OverviewResolverService implements Resolve<any>{
    
    constructor(private signupservice: SignupServiceService,private apiservice: ApiserviceService){}
    
    resolve(route:ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<any> {
        return this.apiservice.getApiDetails();
    }
    
}