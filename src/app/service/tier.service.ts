import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Tiers } from '../model/tiers';

@Injectable({
  providedIn: 'root'
})
export class TierService {
  public host:string="http://localhost:8080";
  public baseUrl:string="http://localhost:8080/api/tiers";

  choixmenu : string  = 'A';
  list : Tiers[];
  tokenStr = localStorage.getItem('token');
  public dataForm:  FormGroup; 
  constructor(private http: HttpClient) { }
 
 
 /* getData(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }*/

  getData(id: number): Observable<Tiers> {
    return this.http.get<Tiers>(`${this.baseUrl}/${id}`);
  }
 
  createData(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, info);
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
  
}

