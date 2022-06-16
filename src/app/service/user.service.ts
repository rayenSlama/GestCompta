import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User} from '../model/user';
import { DatePipe } from '@angular/common';

import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  public host:string="http://localhost:8080";
  public baseUrl:string="http://localhost:8080/api/users";
  public host1:string="http://localhost:8080/api/authenticate";
  tokenStr = localStorage.getItem('token');
 /* private baseUrl = '/api/users';
  private baseUrl1 = '/api/authenticate';*/
  islogin = false;
  admin = false;
  suser = false;
  choixmenu : string  = 'A';
  listData : any;
  public dataForm:  FormGroup; 
  list: User[];

  utilisateur : User=new User();
  constructor(private http: HttpClient,private datePipe: DatePipe) { }

  getter():User{
    return this.utilisateur;
  }
  setter(uc : User){
       this.utilisateur=uc;
  }





  login(username, password) {
     return this.http.post(`${this.host1}`,{username, password});
   }  
 
  getData(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }
 
  createData(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, info,{ headers: { authorization: this.tokenStr } });
  }
  
  updatedata(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }
 
  deleteData(id: number): Observable<any> {
   
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
  /*public getAll(){
   /* return this.http.get(`${this.baseUrl}`);*/
 /*  return this.http.get(this.host+"/users");
  }*/
  transformDate(date){
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }


  public getUserByKey(email:string){
    return this.http.get(this.host+"/users/search/byEmail?email="+email);
  }
  public getUserByName(username:string){
    return this.http.get(this.host+"/users/search/findByUsername?username="+username);
  }
  public getUserByAdresse(adresse:string){
    return this.http.get(this.host+"/users/search/byAdresse?adresse="+adresse);
  }
  public getUserByTelephone(telephone:string){
    return this.http.get(this.host+"/users/search/byTelephone?telephone="+telephone);
  }

  public getUserByCode(code:number){
    return this.http.get(this.host+"/users/search/findByCode?code="+code);
  }
  
}
