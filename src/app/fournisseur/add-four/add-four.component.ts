import { Component, Inject, OnInit } from '@angular/core';
import { FournisseurService} from '../../service/fournisseur.service'
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }

from '@angular/forms';
import { Router } from '@angular/router';
import { Client} from '../../model/Client';
import { SocieteService } from 'src/app/service/societe.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-four',
  templateUrl: './add-four.component.html',
  styleUrls: ['./add-four.component.scss']
})
export class AddFourComponent implements OnInit {

  constructor(public crudApi: FournisseurService ,public fb: FormBuilder,public toastr: ToastrService,
  private steService: SocieteService, 
  @Inject(MAT_DIALOG_DATA)  public data,
  public dialogRef:MatDialogRef<AddFourComponent> ,private router : Router) { }
  ste : any={};
  wcode : string = '';
  get f() { return this.crudApi.dataForm.controls }
  ngOnInit() {
  
    if (this.crudApi.choixmenu == "A")
    {this.infoForm()};
    
      this.steService.getData(1).subscribe(
        response =>{
          this.ste = response;

          this.wcode = (10000 + this.ste.rangg).toString().substring(1);
          this.wcode = this.ste.abrevf+this.wcode;
  
        
          this.f['code'].setValue(this.wcode);
          this.f['codetier'].setValue(this.ste.numf);
        }
        );  
      }
  infoForm() {
    this.crudApi.dataForm = this.fb.group({
        id: null,
        code: ['', [Validators.required]],
        libelle: ['', [Validators.required, Validators.maxLength(60)]],
        adresse: ['', [Validators.required, Validators.minLength(5)]],
        tel: ['', [Validators.required, Validators.minLength(8)]],
        email: ['', [Validators.required, Validators.email]],
        fax: ['', [Validators.required, Validators.minLength(8)]],
        login: ['', [Validators.required, Validators.minLength(5)]],
        pwd: ['', [Validators.required, Validators.minLength(8)]],
        codetier:['', [Validators.required]],
    
        }, {updateOn:'submit'});
    }
   
  

  ResetForm() {
      this.crudApi.dataForm.reset();
  }
  onSubmit() {
    if (this.crudApi.choixmenu == "A")
    {
      this.addData();
    }
    else
    {
      
     this.updateData()
    }
   
}
  
   

addData() {
  this.crudApi.createData(this.crudApi.dataForm.value).
  subscribe( data => {
    this.toastr.success( 'Validation Faite avec succès'); 
    this.dialogRef.close();
    this.crudApi.getAll().subscribe(
      response =>{this.crudApi.list = response;}
     );
    this.router.navigate(['/fournisseurs']);
  });
}





  updateData()
  {
  
    this.crudApi.updatedata(this.crudApi.dataForm.value.id,this.crudApi.dataForm.value).
    subscribe( data => {
      this.toastr.success( 'Modification Faite avec Succès');

      this.router.navigate(['/fournisseurs']);
    });
  }
}
