import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AddLecrtComponent } from 'src/app/ecriture/add-lecrt/add-lecrt.component';
import { Devise } from 'src/app/model/devise';
import { Journal } from 'src/app/model/journal';
import { Tiers } from 'src/app/model/tiers';
import { ClientService } from 'src/app/service/client.service';
import { CompteurService } from 'src/app/service/compteur.service';
import { DeviseService } from 'src/app/service/devise.service';
import { EcritureService } from 'src/app/service/ecriture.service';
import { JournalService } from 'src/app/service/journal.service';
import { LigneEcritureService } from 'src/app/service/ligneEcriture.service';
import { TierService } from 'src/app/service/tier.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-ecrtcompta',
  templateUrl: './ecrtcompta.component.html',
  styleUrls: ['./ecrtcompta.component.scss']
})
export class EcrtcomptaComponent implements OnInit {
  name = "";
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
  constructor(public service:EcritureService,
    public compteurservice:CompteurService,
    public deviseservice:DeviseService,
    public userService:UserService,
    public lecrtservice:LigneEcritureService,
    private dialog:MatDialog,public fb: FormBuilder,
    public clientService :ClientService,public tierservice : TierService,public jrnservice:JournalService,
    private toastr :ToastrService,
    private router :Router,
    private currentRoute: ActivatedRoute,
    private datePipe : DatePipe) { }
    get f() { return this.service.formData.controls }
   

    logout(){
      localStorage.removeItem('name');
      this.userService.islogin = false;
      this.router.navigate(['/login'])
      
    }

ngOnInit() {
  this.name = localStorage.getItem('name');
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
     response =>{this.service.list = response}
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
      num_piece:'',
      date_ecrt : '',
      code : 0,
      code_tier : '',
      num_compte : 0,
      lig: 0,
      seq_ecrt:0,
      sens : '',
aux:'',
     /* lib_client : '',*/
      libelle : '',
      lib_client : '',
      lib_tier: '',
     /* totht : 0,
      tottva : 0,
      totttc : 0,
      lcomms :[],*/
      totdeb : 0,
      totcred : 0,
      solde:0,
      montant : 0 ,



      code_devise:'',
      taux:0,
      libelle_devise:'',
      annee_devise:'',
    
      code_JRN:'',
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
    
     if(this.service.formData.value.id_client==0)
     this.isValid =false;
    
     else if (this.service.list.length==0)
     this.isValid =false;
     return this.isValid;
   }

onSubmit(){
  this.f['lecritures'].setValue(this.service.list);
      this.service.saveOrUpdate(this.service.formData.value).
      subscribe( data => {
        this.toastr.success( 'Validation Faite avec succès'); 
        this.router.navigate(['/journal']);
      });
      
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
       this.f['code_tier'].setValue('');
      }
      else{
         this.f['lib_tier'].setValue(this.TierList[ctrl.selectedIndex - 1].libelle);
         this.f['code_tier'].setValue(this.TierList[ctrl.selectedIndex - 1].code);
      }
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
      this.f['taux'].setValue(this.DeviseList[ctrl.selectedIndex - 1].taux);
      this.f['annee_devise'].setValue(this.DeviseList[ctrl.selectedIndex - 1].annee_devise);
   }
}




OnSelectJournal(ctrl)
{
   if(ctrl.selectedIndex == 0){
    this.f['type_JRN'].setValue('');
    this.f['code_JRN'].setValue('');
   }
   else{
      this.f['type_JRN'].setValue(this.JournalList[ctrl.selectedIndex - 1].type_JRN);
      this.f['code_JRN'].setValue(this.JournalList[ctrl.selectedIndex - 1].code_JRN);
   }
}
}