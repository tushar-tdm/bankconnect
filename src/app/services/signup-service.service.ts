import { Injectable } from '@angular/core';
import { Banks } from '../domain/banks';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SignupServiceService {

  constructor(private http: HttpClient){}

  getallBanks(): Banks[] {
    let allbanks = [
        new Banks('HDFC'),
        new Banks('ICICI'),
        new Banks('Axis'),
        new Banks('Canara'),
        new Banks('State Bank of India'),
        new Banks('CITI Bank')
    ]
    return allbanks;
}

  sendSignUpDetails(user:any):Observable<any>{
    return this.http.post<any>('route/sendmail', user,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  sendLoginDetails(user:any):Observable<any>{
    return this.http.post<any>('route/loginconfirm',user,{
      headers :
      new HttpHeaders({ 'Content-Type':'application/json'})
    });
  }

  getSignUpDetails():Observable<any>{
    return this.http.get<any>('route/profile', {
      headers :
      new HttpHeaders({ 'Content-Type':'application/json'})
    });
  }


  sendCbsDetails(cbsdet:any):Observable<any>{
    return this.http.post<any>('route/corebankservices/register',cbsdet,{
      headers:
      new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  getVersions():Observable<any>{
    return this.http.get<any>('route/corebankservices/register',{
      headers :
      new HttpHeaders({ 'Content-Type': 'application/json'})
    });
  }

  getApis():Observable<any>{
    return this.http.get<any>('route/api',{
      headers :
      new HttpHeaders({ 'Content-Type':'application/json'})
    });
  }

  postApis(apis:any):Observable<any>{
    return this.http.post<any>('route/api',apis,{
      headers:
      new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  getSelectedApis(){
    return this.http.get<any>('route/api/selected',{
      headers :
      new HttpHeaders({ 'Content-Type':'application/json'})
    });
  }

  integrated(){
    return this.http.get<any>('/route/integrated',{
      headers :
      new HttpHeaders({ 'Content-Type':'application/json'})
    });
  }

  checkbcintegrated(){
    return this.http.get<any>('/route/bcintegrated',{
      headers :
      new HttpHeaders({ 'Content-Type':'application/json'})
    });
  }

  confirmbcintegrated():Observable<any>{
    return this.http.post<any>('route/bcintegrated',{
      headers:
      new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  confirmed(){
    return this.http.get<any>('/route/confirmed',{
      headers :
      new HttpHeaders({ 'Content-Type':'application/json'})
    });
  }

  checkshell(){
    return this.http.get<any>('/route/checkshell',{
      headers:
      new HttpHeaders({'Content-Type':'application/json'})
    });
  }

  sendRoleDetails(){
    return this.http.post<any>('route/role',{
      headers:
        new HttpHeaders({'Content-Type':'application/json'})
    });
  }


  sendPassDetails(){
    return this.http.post<any>('route/password',{
      headers:
        new HttpHeaders({'Content-Type':'application/json'})
    });
  }

  sendRegistryDetails(){
    return this.http.post<any>('route/registry',{
      headers:
        new HttpHeaders({'Content-Type':'application/json'})
    });
  }

  checkLogin(){
    return this.http.get<any>('/route/checklogin',{
      headers :
      new HttpHeaders({ 'Content-Type':'application/json'})
    });
  }

  getEmail(){
    return this.http.get<any>('/route/getEmail',{
      headers :
      new HttpHeaders({ 'Content-Type':'application/json'})
    });
  }

  postInClient(obj:any):Observable<any>{
    //console.log("in postInClient service "+obj);
    return this.http.post<any>('http://localhost:5000/route/publishApi',obj,{
      headers :
      new HttpHeaders({ 'Content-Type':'application/json'})
    });
  }

  // postInApiManager(obj:any):Observable<any>{
  //   return this.http.post('/route/apimanager',obj,{
  //     headers :
  //     new HttpHeaders({ 'Content-Type':'application/json'})
  //   })
  // }

  updateSecurity(obj:any):Observable<any>{
    return this.http.post<any>('/route/updateSecurity',obj,{
      headers :
      new HttpHeaders({ 'Content-Type':'application/json'})
    });
  }

  getUnselectedApis(){
    return this.http.get<any>('/route/api/unselected',{
      headers :
      new HttpHeaders({ 'Content-Type':'application/json'})
    });
  }
  
  setBank(bank:any):Observable<any>{
    return this.http.post<any>('/route/setBank',bank,{
      headers :
      new HttpHeaders({ 'Content-Type':'application/json'})
    })
  }
}
