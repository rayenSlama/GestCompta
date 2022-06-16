import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PointageService {
  public baseURL:string="http://localhost:8080/listEmployes";
  public host:string="http://localhost:8080";
  constructor(private http:HttpClient) { }



  public getPointage(){
    
    return this.http.get(this.host+"/pointages");
}

public getPointageByMois(des:string){
  return this.http.get(this.host+"/pointages/search/byMois?des="+des);
}

}
