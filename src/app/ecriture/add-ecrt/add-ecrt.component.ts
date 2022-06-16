import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AddCompteComponent } from 'src/app/compte/add-compte/add-compte.component';
import { Client } from 'src/app/model/client';
import { Tiers } from 'src/app/model/tiers';
import { Journal } from 'src/app/model/journal';
import { Devise } from 'src/app/model/devise';
import { ClientService } from 'src/app/service/client.service';
import { CompteurService } from 'src/app/service/compteur.service';
import { EcritureService } from 'src/app/service/ecriture.service';
import { JournalService } from 'src/app/service/journal.service';

import { AddLecrtComponent } from '../add-lecrt/add-lecrt.component';
import { TierService } from 'src/app/service/tier.service';
import { LigneEcritureService } from 'src/app/service/ligneEcriture.service';
import { DeviseService } from 'src/app/service/devise.service';


@Component({
  selector: 'app-add-ecrt',
  templateUrl: './add-ecrt.component.html',
  styleUrls: ['./add-ecrt.component.scss']
})
export class AddEcrtComponent implements OnInit {
 /* ClientList: Client[];*/
 TierList: Tiers[];
 DeviseList: Devise[];
 JournalList: Journal[];
  isValid:boolean = true;
  articleService: any;
  minDate;
  Wdate;
  devise:any={};
  compteur : any={};
  tier   : any= {};
  journal : any={};
  annee  = 0;
  keyword = 'libelle';
  keywordd='code_JRN';
  constructor(public service:EcritureService,
    public compteurservice:CompteurService,
    public deviseservice:DeviseService,
    public lecrtservice:LigneEcritureService,
    private dialog:MatDialog,public fb: FormBuilder,
    public clientService :ClientService,public tierservice : TierService,public jrnservice:JournalService,
    private toastr :ToastrService,
    private router :Router,
    private currentRoute: ActivatedRoute,
    private datePipe : DatePipe) { }
    get f() { return this.service.formData.controls }
   
ngOnInit() {

   if (this.service.choixmenu == 1){
   this.InfoForm();
    this.service.list = [];
    this.minDate = this.transformDate(new Date(Date.now()));
    this.annee = (this.minDate).toString().substring(0,4);
    this.f['annee'].setValue(this.annee);
    this.onSelectCompteur(this.annee);
    
  
  /*  this.minDate = this.transformDate(new Date());
    this.annee = parseInt(localStorage.getItem('annee'));
    this.onSelectCompteur(this.annee);
    this.InfoForm();
    this.f['annee'].setValue(2022);
    this.Wdate=this.transformDate(new Date());
    this.service.list = [];*/
    }
      else
    {
     this.lecrtservice.getAll(this.service.formData.value.numecrt).subscribe(
     response =>{this.service.list = response;
    
    
    
    }
     
     );
    
     this.f['date_ecrt'].setValue(this.service.formData.value.date_ecrt);
    }

this.tierservice.getAll().subscribe(
  response =>{this.TierList = response;}
 );

 this.jrnservice.getAll1().subscribe(
  response =>{this.JournalList = response;}
 );



 this.deviseservice.getAll().subscribe(
   response=>{this.DeviseList=response;}
 );
  }

onSelectCompteur(id: number)
 {
  this.compteurservice.getData(id).subscribe(
    response =>{
      this.compteur = response;
      this.f['numecrt'].setValue(20220000 + this.compteur.numecrt);
      }
   );  
 } 

   
    
InfoForm() {
    this.service.formData = this.fb.group({
      id :null,
      annee : 0,
      numero : 0,
      numecrt: 0,
     /* num_piece:'',*/   num_piece: ['', [Validators.required]],
      date_ecrt : '',
      code : '',
      codetier : '',    
    /*  numcompte : '', */   numcompte: ['', [Validators.required]],
      lig: 1,
      seq_ecrt:0,
      sens : '',
     
   /*   libelle : '',*/      libelle: ['', [Validators.required]],
      libellec : '',
      lib_tier: '',
    
      totdeb : 0,
      totcred : 0,
      solde:0,
      montant : 0 ,
     /* code_devise:'', */  code_devise: ['', [Validators.required]],
      taux:0,
      libelle_devise:'',
      annee_devise:'',
    /*  code_JRN:'', */  code_JRN: ['', [Validators.required]],
      type_JRN:'',
      lecritures :[],
      });
    } 
  
resetForm() {
      this.service.formData.reset();
  }

AddData(lcommandeIndex,Id){  
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    dialogConfig.data={lcommandeIndex,Id};
    
    /*Id++;*/
    this.dialog.open(AddLecrtComponent, dialogConfig).afterClosed().subscribe(b10=>{
      this.calcul();
    });

   
  }

  
onDelete(item : Journal,Id:number,i:number){
    if(Id != null)
    this.service.formData.value.id+=Id ;
   this.service.list.splice(i,1);
   this.calcul();
   }

calcul(){

  this.f['totdeb'].setValue(this.service.list.reduce((prev, curr) => {
    return prev + curr.totdeb;
  }, 0));
  
  this.f['totcred'].setValue(this.service.list.reduce((prev, curr) => {
    return prev + curr.totcred;
  }, 0));

  this.f['solde'].setValue(this.service.list.reduce((prev, curr) => {
    return prev + curr.solde;
  }, 0));   
   
   }
validateForm(){
     this.isValid = true ;
    
     if(this.service.formData.value.numecrt==0)
     this.isValid =false;
    
     else if (this.service.list.length==0)
     this.isValid =false;
     return this.isValid;
   }

onSubmit(){
/*if(this.service.formData.value.lig<=1){
  this.toastr.warning( 'Une écriture comptable doit contenir au moins deux lignes');
}
*/
  if(this.service.formData.value.solde!=0){
    this.toastr.warning( 'Vérifier le solde de cette écriture');
  }

  else{
  this.f['lecritures'].setValue(this.service.list);
      this.service.saveOrUpdate(this.service.formData.value).
      subscribe( data => {


      /*  console.log(this.service.list.length);*/
        this.toastr.success( 'Validation Faite avec succès'); 
        this.router.navigate(['/journal'])

      });
    }
   }
  
  
transformDate(date){
     return this.datePipe.transform(date, 'yyyy-MM-dd');
   }
   
/*OnSelectClient(ctrl)
   {
      if(ctrl.selectedIndex == 0){
       this.f['lib_client'].setValue('');
       this.f['code'].setValue('');
      }
      else{
         this.f['lib_client'].setValue(this.ClientList[ctrl.selectedIndex - 1].libelle);
         this.f['code'].setValue(this.ClientList[ctrl.selectedIndex - 1].code);
      }
    }*/
    

    OnSelectTier(ctrl)
   {
      if(ctrl.selectedIndex == 0){
       this.f['lib_tier'].setValue('');
       this.f['codetier'].setValue('');
      }
      else{
         this.f['lib_tier'].setValue(this.TierList[ctrl.selectedIndex - 1].libelle);
         this.f['codetier'].setValue(this.TierList[ctrl.selectedIndex - 1].code);
      }
}


/*selectJournal(){
    this.crudApi.choixmenu = "A";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="30%";
    //dialogConfig.data="gdddd";
    this.matDialog.open(AddJournlComponent, dialogConfig);
  }*/


 /* addDataa(Index){  
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="30%";
    dialogConfig.data={Index};
    this.dialog.open(AddJrnlComponent, dialogConfig);
    
  }*/








    





OnSelectDevise(ctrl)
{
   if(ctrl.selectedIndex == 0){
    this.f['libelle_devise'].setValue('');
    this.f['code_devise'].setValue('');
    this.f['taux'].setValue('');
    this.f['annee_devise'].setValue('');
   }
   else{
      this.f['libelle_devise'].setValue(this.DeviseList[ctrl.selectedIndex - 1].libelle_devise);
      this.f['code_devise'].setValue(this.DeviseList[ctrl.selectedIndex - 1].code_devise);
      this.f['taux'].setValue(this.DeviseList[ctrl.selectedIndex - 1].taux);
      this.f['annee_devise'].setValue(this.DeviseList[ctrl.selectedIndex - 1].annee_devise);
   }
}




OnSelectJournal(ctrl)
{
   if(ctrl.selectedIndex == 0){
    this.f['libelle'].setValue('');
    this.f['code_JRN'].setValue('');
   }
   else{
      this.f['libelle'].setValue(this.JournalList[ctrl.selectedIndex - 1].libelle);
      this.f['code_JRN'].setValue(this.JournalList[ctrl.selectedIndex - 1].code_JRN);
   }
}






selectEvent(item) {
  // do something with selected item


  this.service.formData.patchValue({code_JRN:item.code_JRN});
 /* this.service.formData.patchValue({codetier:item.codetier});
  this.service.formData.patchValue({num_piece:item.num_piece});
  this.service.formData.patchValue({lib_tier:item.libelle});
  this.service.formData.patchValue({numcompte:item.numcompte});*/


}

onChangeSearch(search: string) {
  // fetch remote data from here
  // And reassign the 'data' which is binded to 'data' property.
}

onFocused(e) {
  // do something
}







}