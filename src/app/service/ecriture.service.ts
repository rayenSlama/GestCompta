import { HttpClient } from '@angular/common/http';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DatePipe }         from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Ecriture } from '../model/ecriture';
import { LigneEcriture } from '../model/LigneEcriture';
import { ClientService } from './client.service';
import { LigneEcritureService } from './ligneEcriture.service';
import { SocieteService } from './societe.service';
import { faAlignRight } from '@fortawesome/free-solid-svg-icons';

@Injectable({
  providedIn: 'root'
})
export class EcritureService {
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



 saveOrUpdate(info: Object) {
   
   return this.http.post(`${this.baseUrl}`,info);
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
  
  deleteAll(id: number): Observable<any> {
  
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
        
  getDocument(id :number) {
  

    this.getData(id).subscribe(
     response =>{
       this.ecriture = response;
       }
    );  

    this.lecrtService.getAll1().subscribe(
      response =>{
        this.lecriture = response;
        }
     );  
    this.steService.getData(1).subscribe(
      response =>{
        this.ste = response;
        }
     );  
    /* this.clientService.getData(this.livr.code).subscribe(
      response =>{
        this.client = response;
    
        }
     );*/
    sessionStorage.setItem('ecriture', JSON.stringify(this.ecriture));
  return {
    content: [
      {
        columns: [
          [{
            text: this.ste.libelle ,
            style: 'name',
            fontSize: 11
          },
          {
            text: this.ste.slibelle,
            style: 'name',
            fontSize: 11
          },
          {
            text: this.ste.adresse,
              style: 'name',
              fontSize: 11
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
            fontSize: 11
          },
          {
            text: 'Tel 2  : '+ this.ste.tel2,
            color: 'blue',
            fontSize: 11
          },
          ],
        ]
      },
      {
        text: 'Ecriture Comptable',
        bold: true,
        fontSize: 20,
        alignment: 'center',
        margin: [0, 10, 0, 20]
      },
     
      {
        columns: [
          [{
            text: 'Numéro Ecriture : '+ this.ecriture.numecrt +'         Saisie le : '+this.transformDate(this.ecriture.date_ecrt),
          /*  text: 'Tel 1  : '+ this.ste.te1 +'   Tel   : '+ this.ste.tel2,*/
            style: 'ligne2',
            margin: [0,10, 0, 0]

          },
        /*  {
            text: ' Date Ecriture : ' +this.ecriture.date_ecrt,
            style: 'ligne',
            margin: [0,10, 0, 0] 
           },*/
          {
            text: 'Code Journal :  '+ this.ecriture.code_JRN ,
            style: 'ligne',
            margin: [0, 10, 0, 0]
          },
          {
            text: 'Libelle :  '+ this.ecriture.libelle,
            style: 'ligne',
        
          },

          {
            text: 'Compte :  '+ this.ecriture.numcompte ,
            style: 'ligne',
           },
          {
            text: 'Désignation :  '+ this.ecriture.libellec,
            style: 'ligne',
        
          },
        
        /*  {
            text: 'Pièce :  '+ this.ecriture.num_piece,
            style: 'ligne',
        
          },*/
          ],
        ]
      },
      
      
      
      {
        text: 'Détails Ecritures ',
        style: 'header'
      },
      {
        text: 'Devise :  '+ this.ecriture.code_devise ,
        style: 'headerr',
        margin: [0, 0, 0, 0],
       },

       {
        text: 'Taux :  '+ this.ecriture.taux ,
        style: 'headerr',
       },
     this.getEducationObject(this.ecriture.lecritures),
     {

     },
     {
      text: '  Total débit : ' + this.ecriture.totdeb.toFixed(2) +  '      Total crédit  : ' + this.ecriture.totcred.toFixed(2)
      /*+'       Devise  : ' + this.ecriture.code_devise +'      Taux : ' + this.ecriture.taux */ +'      Solde : ' + this.ecriture.solde.toFixed(2),
      style: 'total',
      
    },
    
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
          fontSize: 11,
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
          fontSize: 11
        }
      }
  };
}
 

 getEducationObject(items:LigneEcriture[]) {
  return {
    table: {
      widths: [30, '*', '*', '*','*','*',30],
      body: [
        [{
          text: 'Ligne',
          style: 'tableHeader'
        },
        {
          text: 'Compte',
          style: 'tableHeader'
        },
        {
          text: 'Auxiliaire',
          style: 'tableHeader'
        },
        {
          text: 'Pièce',
          style: 'tableHeader'
        },
        {
          text: 'Désignation ',
          style: 'tableHeader'
        },
        {
          text: 'Montant',/*+ items.montant,*/
          style: 'tableHeader'
        },
        {
          text: 'Sens',
          style: 'tableHeader'
        },
        ],
       ...items.map(ed => {
         return [ed.lig,ed.numcompte,ed.code, ed.num_piece,ed.lib_tier, ed.montant.toFixed(2), ed.sens];
        })
      ]
    }
  };
}
}