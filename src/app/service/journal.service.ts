import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Ecriture } from '../model/ecriture';
import { Journal } from '../model/journal';
import { EcritureService } from './ecriture.service';
import { SocieteService } from './societe.service';

@Injectable({
  providedIn: 'root'
})
export class JournalService {
  public host:string="http://localhost:8080";
  public baseUrl:string="http://localhost:8080/api/journals";
 //formData :Lb1016;

 ste:any={};
 Journal : Journal = new Journal();
 lecritureList : Journal[];
 choixmenu : string  = 'A';
 list : Journal[];
 constructor(private http: HttpClient,private toastr: ToastrService,
  public steService : SocieteService,private datePipe : DatePipe,public crudApi :EcritureService) { }
 addJournal(info: Object): Observable<Object> {
   return this.http.post(`${this.baseUrl}`, info);
 }


getAll(id: number): Observable<Object> {
  return this.http.get(`${this.baseUrl}/${id}`);
}


getAll1(): Observable<any> {
  return this.http.get(`${this.baseUrl}`);
}
transformDate(date){
  return this.datePipe.transform(date, 'dd-MM-yyyy');
}




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
      text: 'Consultation Journal comptable ',
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
    widths: [54, 61, 25, 43,67,35,30,55,55,30],
  
    body: [
      [
         {
        text: 'N° Ecrt',
        style: 'tableHeader'
      },
      {
        text: 'Date',
        style: 'tableHeader'
      },
        {
        text: 'Code jrn',
        style: 'tableHeader'
      },
      {
        text: 'Compte',
        style: 'tableHeader'
      },
      {
        text: 'Désignation',
        style: 'tableHeader'
      },
      {
        text: 'Libelle',
        style: 'tableHeader'
      },
      
      {
        text: 'Pièce',
        style: 'tableHeader'
      },
      
     
      {
        text: 'TotDébit',
        style: 'tableHeader'
      },
      {
        text: 'TotCrédit',
        style: 'tableHeader'
      },
      {
        text: 'Solde',
        style: 'tableHeader'
      },
      ],
     ...items.map(ed => {
       return [ed.numecrt,this.transformDate(ed.date_ecrt),ed.code_JRN,ed.numcompte,ed.libellec,ed.libelle,ed.num_piece,ed.totdeb.toFixed(2),ed.totcred.toFixed(2), ed.solde.toFixed(2)];
      })
    ]
  }
};
}
}