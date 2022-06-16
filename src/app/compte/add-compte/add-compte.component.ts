import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Tiers } from 'src/app/model/tiers';
import { CompteService } from 'src/app/service/compte.service';
import { SocieteService } from 'src/app/service/societe.service';
import { TierService } from 'src/app/service/tier.service';

@Component({
  selector: 'app-add-compte',
  templateUrl: './add-compte.component.html',
  styleUrls: ['./add-compte.component.scss']
})
export class AddCompteComponent implements OnInit {
  TierList: Tiers[];
  ste : any={};
  scategorie : any={};
  wcode : string = '';

  public message: string;
  constructor(public crudApi: CompteService ,public fb: FormBuilder,public toastr: ToastrService,
    public categorieService: TierService,public steService:SocieteService,
    private router : Router,@Inject(MAT_DIALOG_DATA)  public data,
    public dialogRef:MatDialogRef<AddCompteComponent>,
    
    ) { }
    get f() { return this.crudApi.dataForm.controls; }
  ngOnInit() {
   if (this.crudApi.choixmenu == "A")
    {this.infoForm()};
    this.categorieService.getAll().subscribe(
      response =>{this.TierList = response;}
     );
    }

cal(){
if(this.crudApi.dataForm.value.codetier=="Client"){

     this.steService.getData(1).subscribe(
      response =>{
        this.ste = response;
        this.f['numcopmte'].setValue(this.ste.numc);
      
        }
     );  
   }
   if(this.crudApi.dataForm.value.codetier=="Fournisseur"){

    this.steService.getData(1).subscribe(
     response =>{
       this.ste = response;
       this.f['numcopmte'].setValue(this.ste.numf);
     
       }
    );  
  }

}

  
  
  infoForm() {
    this.crudApi.dataForm = this.fb.group({
        id: null,
        numcompte: ['', [Validators.required, Validators.minLength(6)]],
        code: ['', [Validators.required]],
        libellec: ['', [Validators.required]],
        datecreation: ['', [Validators.required]],
        bloque: [[Validators.required]],
        
        codetier: ['', [Validators.required]],
        lib_tier:['', [Validators.required]],
        profile : [],
      });
    }

  ResetForm() {
      this.crudApi.dataForm.reset();
  }
  onSubmit() {
    if (this.crudApi.choixmenu == "A")
    {
      this.addData();
    }
    
}
  
onSelectCateg(id_categ: string)
{/*
  this.scategorieService.listScateg(id_categ).subscribe(
    response =>{this.ScategorieList = response;}
   );  */
} 

onSelectScateg(id_scateg: string)
{/*
 this.scategorieService.getData(id_scateg).subscribe(
    response =>{
      this.scategorie = response;
      this.wcode = (10000 + this.scategorie.rang).toString().substring(1);
      this.wcode = this.scategorie.id_categ+this.scategorie.code+this.wcode;
      this.f['code'].setValue(this.wcode);
      }
   );  */
} 

addData() {


  console.log(this.crudApi.dataForm.value.numcompte);
  this.crudApi.createData(this.crudApi.dataForm.value).
  subscribe( data => {
    this.crudApi.getAll().subscribe(
      response =>{this.crudApi.list = response;}
     );
    this.dialogRef.close();
  
  
    
 /* const formData = new  FormData();
  const compte = this.crudApi.dataForm.value;
  formData.append('compte',JSON.stringify(compte));

  this.crudApi.createData(formData).subscribe( data => {
    this.dialogRef.close();
    this.router.navigate(['/client']); */
  });
 
}
 

   OnSelectTier(ctrl)
   {
      if(ctrl.selectedIndex == 0){
       this.f['lib_tier'].setValue('');
       this.f['codetier'].setValue('');
       this.f['code'].setValue('');
      }
      else{
         this.f['lib_tier'].setValue(this.TierList[ctrl.selectedIndex - 1].libelle);
         this.f['codetier'].setValue(this.TierList[ctrl.selectedIndex - 1].codetier);
         this.f['code'].setValue(this.TierList[ctrl.selectedIndex - 1].code);
      }
}


}







  
    
 
  
  



