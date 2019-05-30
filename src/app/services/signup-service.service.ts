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
    return this.http.get<any>('/integrated',{
      headers :
      new HttpHeaders({ 'Content-Type':'application/json'})
    });
  }
}
