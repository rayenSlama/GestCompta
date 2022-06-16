import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { map, filter, scan,catchError,tap, retry } from "rxjs/operators";
import { Observable, throwError } from 'rxjs'
/*const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};*/
@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {
 /* url = "http://localhost:8080/";
  public host:string="http://localhost:8080"*/

  id=0;
  constructor(private http: HttpClient) { }
  


 /* param: any['id'] = this.getLoginDataByKey("id");*/

  getLoginDataByKey(key){
    let data = JSON.parse(localStorage.getItem("login_data"));
    if(data.hasOwnProperty(key)){
      return data[key];
    }
    return null;
  }
  
/*
  postRequest(url:string,param:{}){
    return this.http.post(this.url+url,param,httpOptions)
    .pipe(
      catchError(this.handleError.bind(this)) // then handle the error
    );
  }

  private handleError(error: any) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
          return throwError("Something went wrong..while connecting with server");
      }
    }



  getLoginToken(){
    return localStorage.getItem("token")
}
  isLogin(){
    try{
      console.log("login token ",this.getLoginToken());
      
      if(this.getLoginToken() != "" && this.getLoginToken().length >10){
        return true;
      }
    }catch(e){

    }
   return false;
  }
*/
}
