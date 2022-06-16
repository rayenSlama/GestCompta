import { Component, OnInit ,Inject} from '@angular/core';
import { ClientService} from '../../service/client.service'
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import { Router } from '@angular/router';
import { Client} from '../../model/Client';
import { SocieteService } from '../../service/societe.service';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatDialogRef } from "@angular/material/dialog";
import { AddCompteComponent } from 'src/app/compte/add-compte/add-compte.component';
@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {
  ste : any={};
  wcode : string = '';
  get f() { return this.crudApi.dataForm.controls }
  constructor(public crudApi: ClientService ,public fb: FormBuilder,public toastr: ToastrService,
    private router : Router,private steService : SocieteService,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)  public data,
    public dialogRef:MatDialogRef<AddClientComponent>, public dialogRef2:MatDialogRef<AddCompteComponent>) { }

  ngOnInit() {
  
    if (this.crudApi.choixmenu == "A")
    {this.infoForm()};
    this.steService.getData(1).subscribe(
      response =>{
        this.ste = response;

        this.wcode = (10000 + this.ste.rang).toString().substring(1);
        this.wcode = this.ste.abrevc+this.wcode;

      
        this.f['code'].setValue(this.wcode);
        this.f['codetier'].setValue(this.ste.numc);
      
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
        email: [' ', [Validators.required, Validators.email]],
        fax: ['', [Validators.required, Validators.minLength(8)]],
        login: [' ', [Validators.required, Validators.minLength(4)]],
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
    this.toastr.success( 'Validation Faite avec Succès'); 
    this.dialogRef.close();
   
    this.crudApi.getAll().subscribe(
      response =>{this.crudApi.list = response;}
     );
  
    this.router.navigate(['/clients']);
  });
}
  updateData()
  {
  
    this.crudApi.updatedata(this.crudApi.dataForm.value.id,this.crudApi.dataForm.value).
    subscribe( data => {
      this.toastr.success( 'Modification Faite avec Succès');
      this.dialogRef.close();
   
      this.crudApi.getAll().subscribe(
        response =>{this.crudApi.list = response;}
       );
      this.router.navigate(['/clients']);
    });
  }





  addcompte()
  {
    this.crudApi.choixmenu = "A";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    //dialogConfig.data="gdddd";
    this.matDialog.open(AddCompteComponent, dialogConfig);
  }
    
}
