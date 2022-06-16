import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employes } from '../Model/Employes';
const baseUrl = 'http://localhost:8080/api/v1/employe';
const baseUrladd = 'http://localhost:8080/api/v1/addemploye';
const baseUrlget = 'http://localhost:8080/listEmployes';
const baseUrldell = 'http://localhost:8080/api/v1/deleteemploye';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {
public baseURL:string="http://localhost:8080/listEmployes";
  public host:string="http://localhost:8080";
  public dataForm!: FormGroup;

  constructor(private http:HttpClient) { }

  
  public getEmploye(){
    
    return this.http.get(this.host+"/employes");
}


public getEmployeByKey(des:string){
  return this.http.get(this.host+"/employes/search/byName?des="+des);
}

public getEmployeById(id:number):Observable<Employes>{
  return this.http.get<Employes>(`${this.baseURL}/${id}`);

}


/*public geproductByKey(des:string,page:number,size:number){
  return this.http.get(this.host+"/produits/search/byNamePage?des="+des+"&page="+page+"&size="+size);
}*/

public delete(url: string){
  return this.http.delete(url);
}


public saveData (url: string,data: any):Observable<Employes>{
  /* return this.http.post(url,data);*/
 return this.http.post<Employes>(url,data);
 }


public getData (url: string):Observable<Employes>{
  return this.http.get<Employes>(url);

}

public updateData (url: string,data: any):Observable<Employes>{
  return this.http.put<Employes>(url,data);

}


createData(data: any): Observable<any> {
  return this.http.post(`${this.host+"/employeImg"}`, data);
}
}