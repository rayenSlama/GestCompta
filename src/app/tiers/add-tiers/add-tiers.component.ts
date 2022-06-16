import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tiers } from 'src/app/model/tiers';
import { TierService } from 'src/app/service/tier.service';

@Component({
  selector: 'app-add-tiers',
  templateUrl: './add-tiers.component.html',
  styleUrls: ['./add-tiers.component.scss']
})
export class AddTiersComponent implements OnInit {

  TierList: Tiers[];

  tiers : any={};
  wcode : string = '';
  constructor(public crudApi: TierService ,public fb: FormBuilder,public toastr: ToastrService,
    private router : Router,@Inject(MAT_DIALOG_DATA)  public data,
    public dialogRef:MatDialogRef<AddTiersComponent>,
    ) { }
    get f() { return this.crudApi.dataForm.controls; }
  ngOnInit() {
  
    if (this.crudApi.choixmenu == "A")
    {this.infoForm()};
   }


  
  infoForm() {
    this.crudApi.dataForm = this.fb.group({
        id: null,
        code: ['', [Validators.required]],
        libelle: ['', [Validators.required]],
        email: ['', [Validators.required], [Validators.email]],
        tel: ['', [Validators.required],[Validators.minLength(8)]],
        fax: ['', [Validators.required],[Validators.minLength(8)]],
        login: ['', [Validators.required],[Validators.minLength(5)]],
        pwd: ['', [Validators.required],[Validators.minLength(8)]],
        adresse: ['', [Validators.required],[Validators.minLength(5)]],
        cree: ['', [Validators.required]],
        type_tier: ['', [Validators.required]]
      });
    }
   
  

  ResetForm() {
      this.crudApi.dataForm.reset();
  }
  onSubmit() {
   
    if (this.crudApi.choixmenu != "A")
    {
      
     this.updateData()
    }
   
}
  
   

/*addData() {
  this.crudApi.createData(this.crudApi.dataForm.value).
  subscribe( data => {
    this.dialogRef.close();
   
    this.crudApi.getAll().subscribe(
      response =>{this.crudApi.list = response;}
     );
    this.router.navigate(['/list-tier']); 
  });
}*/
  updateData()
  {
    this.crudApi.updatedata(this.crudApi.dataForm.value.id,this.crudApi.dataForm.value).
    subscribe( data => {
      this.dialogRef.close();
   
      this.crudApi.getAll().subscribe(
        response =>{this.crudApi.list = response;}
       );
      this.router.navigate(['/tiers']);
    });
  }




}

