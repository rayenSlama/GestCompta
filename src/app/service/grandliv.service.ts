import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Ecriture } from '../model/ecriture';
import { LigneEcriture } from '../model/LigneEcriture';
import { ClientService } from './client.service';
import { EcritureService } from './ecriture.service';
import { LigneEcritureService } from './ligneEcriture.service';
import { SocieteService } from './societe.service';

@Injectable({
  providedIn: 'root'
})
export class GrandlivService {

  public host:string="http://localhost:8080";
  public baseUrl:string="http://localhost:8080/api/ecritures";
  public formData:  FormGroup; 
  list :  any=[];
 /* liste:Ecriture[];*/
  ecriture    : any={};
  lecriture    : any={};
  ste:any={};
  lecritureList:LigneEcriture[];
  ecritur : Ecriture=new Ecriture();
  constructor(private http:HttpClient,private toastr: ToastrService,
    public steService : SocieteService,private datePipe : DatePipe,public crudApi :EcritureService,
    public clientService : ClientService, public lecrtService:LigneEcritureService) { }
  choixmenu : number = 1;
  /*getData(id: number): Observable<Ecriture> {
    return this.http.get<Ecriture>(`${this.baseUrl}/${id}`);
  }*/
  transformDate(date){
    return this.datePipe.transform(date, 'dd-MM-yyyy');
  }

  getter():Ecriture{
    return this.ecritur;
  }
  setter(uc : Ecriture){
       this.ecritur=uc;
  }

 /* getAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
  
  deleteAll(id: number): Observable<any> {
  
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }*/
        
  getDocument() {
     
    this.steService.getData(1).subscribe(
      response =>{
        this.ste = response;
        }
     );  
     this.crudApi.getAll().subscribe(
      response =>{
        this.crudApi.liste = response;
        }
     );  
  /*  sessionStorage.setItem('ecriture', JSON.stringify(this.ecriture));*/
  return {
    content: [
      {
        columns: [
          [{
            text: this.ste.libelle ,
            style: 'name',
            fontSize: 10
          },
          {
            text: this.ste.slibelle,
            style: 'name',
            fontSize: 10
          },
          {
            text: this.ste.adresse,
              style: 'name',
              fontSize: 10
          },

      /*    {
           /* img: this.ste.image,*/ /*'http://localhost:8080/api/imageEcrt/1'*/
          /*    image:'http://localhost:8080/api/imageEcrt/1',
              alignment:'right'
          },*/


     /*     {
            text: 'Email : ' ,
          },*/
          {
            text: 'Tel 1  : '+ this.ste.tel1,
            color: 'blue',
            fontSize: 9
          },
          {
            text: 'Tel 2  : '+ this.ste.tel2,
            color: 'blue',
            fontSize: 9
          },
          ],
        ]
      },
      
      
      
      
      {
        text: 'Grand Livre ',
        style: 'header'
      },
     /* {
        text: 'Devise :  '+ this.ecriture.code_devise ,
        style: 'headerr',
        margin: [0, 0, 0, 0],
       },

       {
        text: 'Taux :  '+ this.ecriture.taux ,
        style: 'headerr',
       },*/
     this.getList(this.crudApi.liste),
     
    
    {
      text: 'Signature',
      style: 'sign',
      alignment : 'right'

    },
     
    ],
   
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 20, 0, 10],
          alignment: 'center',
      /*    decoration: 'underline'*/
        },

        headerr: {
          fontSize: 11,
          bold: true,
        /*  margin: [0, 20, 20, 10],*/
          alignment: 'right',
      /*    decoration: 'underline'*/
        },

        name: {
          /*fontSize: 11,*/
          bold: true
        },
        total: {
          fontSize: 12,
          bold: true,
          italics: true,
          alignment:'right',
          margin:[0,10,0,0],
        
        },
        ligne: {
          fontSize: 11,
          bold: true,
          italics: true
        },

        ligne2: {
          fontSize: 11,
          bold: true,
          italics: true,
        

        },



        sign: {
          margin: [0, 50, 0, 10],
          alignment: 'right',
          italics: true
        },
        tableHeader: {
          bold: true,
          fontSize: 11,
          border: 1,
        }
      }
  };
}
 

 getList(items:Ecriture[]) {
  return {
    table: {
      widths: [17, 54, 62, 35,44,75,60,60,40],
    
      body: [
        [{
          text: 'Jrn',
          style: 'tableHeader'
        
        },
        {
          text: 'N° Ecrt',
          style: 'tableHeader'
        },
        {
          text: 'Date',
          style: 'tableHeader'
        },
        {
          text: 'Pièce',
          style: 'tableHeader'
        },
        {
          text: 'Compte',
          style: 'tableHeader'
        },
     /*   {
          text: 'Auxiliaire',
          style: 'tableHeader'
        },*/
        
        {
          text: 'Désignation ',
          style: 'tableHeader'
        },
        {
          text: 'Débit',/*+ items.montant,*/
          style: 'tableHeader'
        },
        {
          text: 'Crédit',
          style: 'tableHeader'
        },
        {
          text: 'Solde',
          style: 'tableHeader'
        },
        ],
       ...items.map(ed => {
         return [ed.code_JRN,ed.numecrt,this.transformDate(ed.date_ecrt),ed.num_piece,ed.numcompte,ed.libellec,ed.totdeb.toFixed(2),ed.totcred.toFixed(2), ed.solde.toFixed(2)];
        })
      ]
    }
  };
}
}