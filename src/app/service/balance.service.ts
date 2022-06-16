import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Ecriture } from '../model/ecriture';
import { LigneEcriture } from '../model/LigneEcriture';
import { ClientService } from './client.service';
import { LigneEcritureService } from './ligneEcriture.service';
import { SocieteService } from './societe.service';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {
  public host:string="http://localhost:8080";
  public baseUrl:string="http://localhost:8080/api/ecritures";
  public formData:  FormGroup; 
  list :  any=[];
  liste:Ecriture[];
  ecriture    : any={};
  lecriture    : any={};
  ste:any={};
  lecritureList:LigneEcriture[];
  ecritur : Ecriture=new Ecriture();
  constructor(private http:HttpClient,private toastr: ToastrService,
    public steService : SocieteService,private datePipe : DatePipe,
    public clientService : ClientService, public lecrtService:LigneEcritureService) { }
  choixmenu : number = 1;
  getData(id: number): Observable<Ecriture> {
    return this.http.get<Ecriture>(`${this.baseUrl}/${id}`);
  }
  transformDate(date){
    return this.datePipe.transform(date, 'dd-MM-yyyy');
  }

  getter():Ecriture{
    return this.ecritur;
  }
  setter(uc : Ecriture){
       this.ecritur=uc;
  }
  
}
