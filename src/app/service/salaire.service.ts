import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SalaireService {
  public host:string="http://localhost:8080";
  constructor(private http:HttpClient) { }



  public getSalaires(){
    
    return this.http.get(this.host+"/salaires");
}
}
