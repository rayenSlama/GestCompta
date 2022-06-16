import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ignoreElements } from 'rxjs/operators';

import { Compte } from 'src/app/model/compte';
import { Devise } from 'src/app/model/devise';

import { Tiers } from 'src/app/model/tiers';
import { CompteService } from 'src/app/service/compte.service';
import { CompteurService } from 'src/app/service/compteur.service';
import { DeviseService } from 'src/app/service/devise.service';
import { EcritureService } from 'src/app/service/ecriture.service';
import { JournalService } from 'src/app/service/journal.service';
import { LigneEcritureService } from 'src/app/service/ligneEcriture.service';
import { SocieteService } from 'src/app/service/societe.service';
import { TierService } from 'src/app/service/tier.service';

@Component({
  selector: 'app-add-lecrt',
  templateUrl: './add-lecrt.component.html',
  styleUrls: ['./add-lecrt.component.scss']
})
export class AddLecrtComponent implements OnInit {
  formData: FormGroup;
  compteur : any={};
comptes:Compte[];
  DeviseList:Devise[];
  TierList:Tiers[];
  isValid:boolean=true;
  wtotdeb = 0;
  wtotcred = 0;
  devise : any={};
  wsolde = 0;  
  annee  = 0;
  id;
  minDate;
 /*lig=1;*/
 /* lig_ecrt=1;*/
  Wdate;
  numcomms = 0;
lig:0;
  keyword = 'libellec';

  ste : any={};
  wcode : string = '';
  
  /*get f() { return this.service.formData.controls }*/
 
  constructor( public service:LigneEcritureService,private toastr :ToastrService,
        @Inject(MAT_DIALOG_DATA)  public data,
        public dialogRef:MatDialogRef<AddLecrtComponent>,
        private compteService:CompteService,
        private steService : SocieteService,
        private ligneservice : LigneEcritureService,
        private jrnservice : JournalService,
        private compteurservice : CompteurService,
        public deviseservice : DeviseService,
        private tierService : TierService,private datePipe : DatePipe,
        private commandeService:EcritureService,public fb: FormBuilder){}
        get f() { return this.formData.controls; }
        get f1(){return this.commandeService.formData.controls;}
     /*   get f() { return this.compteurservice.formData.controls }*/
    /* get f1() { return this.commandeService.formData.controls}*/
  ngOnInit() {
    if(this.data.lcommandeIndex==null)
    {
      this.InfoForm();
   /*   this.f['lig'].setValue(this.service.formData.value.lig);*/
  /* this.lig=this.lig+1;*/
  

  this.minDate = this.transformDate(new Date(Date.now()));
  this.annee = (this.minDate).toString().substring(0,4);
  this.f['annee'].setValue(this.annee);
  this.onSelectCompteur(this.annee);



   




    }
    else 
    {
     this.formData =this.fb.group(Object.assign({},this.commandeService.list[this.data.lcommandeIndex]));

  /*   this.f['lig'].setValue(this.service.formData.value.lig+1);*/
    }
   this.tierService.getAll().subscribe(
      response =>{this.TierList= response;}
     );
     this.deviseservice.getAll().subscribe(
      response=>{this.DeviseList=response;}
    );
    this.compteService.getAll().subscribe(
      response=>{this.comptes=response;}
    );



   /* this.steService.getData(1).subscribe(
      response =>{
        this.ste = response;

        this.wcode = (1000 + this.ste.ranglig).toString().substring(1);
     

      
        this.f['lig'].setValue(this.wcode);
      
      
        }
     );*/




  /*  this.jrnservice.getAll1().subscribe(
      response=>{this.JournalList=response;}
    );*/
  /*  this.compteService.getAll().pipe(map((response:[])=>response.map(item=>item['libelle'])))*/
     




    /* /////////////////////////////////
    this.minDate = this.transformDate(new Date(Date.now()));
     this.annee = (this.minDate).toString().substring(0,4);
     this.f['annee'].setValue(this.annee);
   this.f['lig'].setValue(this.lig);
/////////////////////////////////////*/
 

    /* this.onSelectCompteurLigL(this.lig);*/
}     
increment(){
  this.f['lig'].setValue(this.formData.value.lig+1); }






onSelectCompteur(id: number)
 {
  this.compteurservice.getData(id).subscribe(
    response =>{
      this.compteur = response;
      this.f['lig'].setValue(0+this.compteur.lig);
      }
   );  
 } 



/*onSelectCompteurLigL(id: number)
{
 this.compteurservice.getData1(id).subscribe(
   response =>{
     this.compteur = response;
     this.f['lig'].setValue( 0+ this.compteur.lig);
     
     }
  );  
} */

/*increment(){
this.f['lig'].setValue(this.lig+=1);

}


decrement(){
  this.f['lig'].setValue(this.lig-=1);
}
*/
/*
infoForm() {
  this.crudApi.dataForm = this.fb.group({
      id: null,
      code: ['', [Validators.required]],
      libelle: ['', [Validators.required, Validators.maxLength(60)]],
      adresse: ['', [Validators.required, Validators.minLength(5)]],
      tel: ['', [Validators.required, Validators.minLength(8)]],
      email: [' ', [Validators.required, Validators.email]],
      fax: ['', [Validators.required, Validators.minLength(8)]],
      login: [' ', [Validators.required, Validators.minLength(4)]],
      pwd: ['', [Validators.required, Validators.minLength(8)]],
     codetier:['', [Validators.required]],
  
      }, {updateOn:'submit'});
  }
*/





InfoForm() {
  this.formData = this.fb.group({
      id: null,
      numero :this.data.numecrt,
      code:'',
     
   /*  num_piece:'', */    num_piece: ['', [Validators.required]],
      totcred : 0,
      totdeb :0,
      solde :0,
    /*  libelle :'', */     libelle: ['', [Validators.required]],
      libellec:'',
      codetier:'',
      lib_tier :'',
     /* lig:0,*/
     lig:0,
      sens:'',
      montant:0,
      numcomms:0,
      aux:'',
      annee:0,
  /*  code_devise:'', */     code_devise: ['', [Validators.required]],
      taux:0,
      libelle_devise:'',
      annee_devise:'',
     /* numcompte :'',  */    numcompte: ['', [Validators.required]],
      ecriture_id : this.data.id,
     
    }, {updateOn:'submit'});
  } 


selectPrice(ctrl){
  if(ctrl.selectedIndex == 0){
    this.f['lib_tier'].setValue('');
    this.f['libelle'].setValue('');
  }
  else{
    this.f['lib_tier'].setValue(this.TierList[ctrl.selectedIndex - 1].libelle);
    this.f['code'].setValue( this.TierList[ctrl.selectedIndex - 1].code);
  }
/*  this.cal();*/
}
cal(){
 if (this.formData.value.sens=="D"){
  this.wtotdeb =  parseFloat((this.formData.value.montant*this.commandeService.formData.value.taux).toFixed(3));
}
  if (this.formData.value.sens=="C"){
 
  this.wtotcred = parseFloat((this.formData.value.montant*this.commandeService.formData.value.taux).toFixed(3)); 
}
  this.wsolde = parseFloat((this.wtotdeb - this.wtotcred).toFixed(3));
  this.f['totdeb'].setValue(this.wtotdeb);
  this.f['totcred'].setValue(this.wtotcred);
  this.f['solde'].setValue(this.wsolde);
}


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
 /*  this.f['code_devise'].setValue(this.f1['code_devise']);*/
      this.f['taux'].setValue(this.DeviseList[ctrl.selectedIndex - 1].taux);
      this.f['annee_devise'].setValue(this.DeviseList[ctrl.selectedIndex - 1].annee_devise);


   }
}

onSubmit() {
  console.log(this.commandeService.formData.value.taux);
  console.log(this.commandeService.formData.value.code_devise);
  console.log(this.formData.value.libellec);


  console.log("*********");
 
  console.log(this.commandeService.formData.value.lig);
  console.log(this.formData.value.lig);

  if(this.data.lcommandeIndex==null)
  {
 /*   this.wlig = this.formData.value.lig+1;
    

      
    this.f['lig'].setValue(this.wlig);*/


    this.commandeService.list.push(this.formData.value)
    
    this.dialogRef.close();
   
   
  }
  else
{
 this.commandeService.list[this.data.lcommandeIndex] = this.formData.value;
 
}
this.dialogRef.close();

}

/*validateForm(formData:Ecriture){
  this.isValid=true;
  if(formData.code_JRN ==0)
    this.isValid=false;
    else if(formData.numecrt ==0)
    this.isValid=false;
    else if(formData.libelle=='')
    this.isValid=false;
   else if(formData.num_piece=='')
    this.isValid=false;
    return this.isValid;
}
*/

transformDate(date){
  return this.datePipe.transform(date, 'yyyy-MM-dd');
}


selectEvent(item) {

console.log(item.numcompte);
console.log(item.code);
console.log(item.codetier);
console.log(item.lib_tier);
console.log(item.libellec);
this.formData.patchValue({numcompte:item.numcompte});
this.formData.patchValue({libellec:item.libellec});
this.formData.patchValue({code:item.code});
this.formData.patchValue({codetier:item.codetier});
this.formData.patchValue({lib_tier:item.lib_tier});

}


onChangeSearch(search: string) {
}

onFocused(e) {
  // do something
}

}
