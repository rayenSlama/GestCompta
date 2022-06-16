import { Component, OnInit,Inject } from '@angular/core';
import { ClientService} from '../../service/client.service';
import { ToastrService } from 'ngx-toastr';
import { Fournisseur} from '../../model/Fournisseur';
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatDialogRef } from "@angular/material/dialog";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AddFourComponent } from '../../fournisseur/add-four/add-four.component';
import { FournisseurService } from 'src/app/service/fournisseur.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-list-four',
  templateUrl: './list-four.component.html',
  styleUrls: ['./list-four.component.scss']
})
export class ListFourComponent implements OnInit {

  p :number = 1;

  constructor(public crudApi: FournisseurService,public userService:UserService, public toastr: ToastrService,
    private router : Router,public fb: FormBuilder,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<AddFourComponent>,) { }
 
  ngOnInit() {
    this.getData();
  }
  logout(){
    localStorage.removeItem('name');
    this.userService.islogin = false;
    this.router.navigate(['/login'])
    
  }
  
  getData() {
    this.crudApi.getAll().subscribe(
      response =>{this.crudApi.list = response;}
     );
   
  }
  
  addFour()
  {
    this.crudApi.choixmenu = "A";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    //dialogConfig.data="gdddd";
    this.matDialog.open(AddFourComponent, dialogConfig);
  }
  removeData(id: number) {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce Fournisseur ?')) {
    this.crudApi.deleteData(id)
      .subscribe(
        data => {
          console.log(data);
          this.toastr.success(' Fournisseur supprimé avec succès !'); 
          this.getData();
        },
        error => console.log(error));
  }
  }
  selectData(item : Fournisseur) {
    this.crudApi.choixmenu = "M";
    this.crudApi.dataForm = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    
    this.matDialog.open(AddFourComponent, dialogConfig);
  }


}


