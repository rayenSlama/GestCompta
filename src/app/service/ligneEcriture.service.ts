import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { LigneEcriture } from '../model/LigneEcriture';

@Injectable({
  providedIn: 'root'
})
export class LigneEcritureService {
  public host:string="http://localhost:8080";
  public baseUrl:string="http://localhost:8080/api/lecrts";
 //formData :Lb1016;
 public formData:  FormGroup;
 list :  any=[];
/* LigneEcriture : LigneEcriture = new LigneEcriture();*/
 lecritureList : LigneEcriture[];

 constructor(private http: HttpClient) { }
 addLigneEcriture(info: Object): Observable<Object> {
   return this.http.post(`${this.baseUrl}`, info);
 }

getAll(id: number): Observable<Object> {
  return this.http.get(`${this.baseUrl}/${id}`);
}

getAll1(): Observable<any> {
  return this.http.get(`${this.baseUrl}`);
}


getLigneEcritureByNumero(numero: number): Observable<any> {
  return this.http.get(`${this.baseUrl}/${numero}`);
}



}