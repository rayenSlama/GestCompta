import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Exercice } from '../model/exercice';

@Injectable({
  providedIn: 'root'
})
export class ExerciceService {
  public host:string="http://localhost:8080";
  public baseUrl:string="http://localhost:8080/api/exercices";
  
  choixmenu : string  = 'A';
  list : Exercice[];
  tokenStr = localStorage.getItem('token');
  public dataForm:  FormGroup; 
  constructor(private http: HttpClient) { }
 
 
  getData(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${id}`,{ headers: { authorization: this.tokenStr } });
  }
 
  createData(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, info,{ headers: { authorization: this.tokenStr } });
  }
  
  updatedata(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value,{ headers: { authorization: this.tokenStr } });
  }
 
  deleteData(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' , headers: { authorization: this.tokenStr }  });
  }

  getAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}`,{ headers: { authorization: this.tokenStr } });
  }
  
}
