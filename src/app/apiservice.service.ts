import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private http:HttpClient) { }

  apiname:string;

  setApi(api){
    console.log("api name recieved :"+api);
    this.apiname = api;
  }

  getApiDetails(){
    console.log("getApiDetails called");
    var path = '/route/getapiDetails/'+this.apiname;
    return this.http.get<any>(path,{
      headers: new HttpHeaders({'Content-Type':'application/json'})
    });
  }

  // getApiDetails(apiname){
  //   return this.http.get<any>('/api/')
  // }
}
