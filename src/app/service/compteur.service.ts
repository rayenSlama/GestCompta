import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Compteur} from '../model/compteur'
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CompteurService {
  public host:string="http://localhost:8080";
  public baseUrl:string="http://localhost:8080/api/compteurs";
  public baseUrl1:string="http://localhost:8080/api/compteurs/rang";
  public formData:  FormGroup; 
  choixmenu : string  = 'A';
  listData : Compteur[];
  list :  any=[];
  compteur   : any={};
  public dataForm:  FormGroup; 
  constructor(private http: HttpClient) { }
 
 
  getData(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }



  getData1(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl1}/${id}`);
  }
 

  getDataRang(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl1}/${id}`);
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
