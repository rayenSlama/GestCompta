import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Compte } from 'src/app/model/compte';
import { CompteService } from 'src/app/service/compte.service';
import { AddCompteComponent } from '../add-compte/add-compte.component';

@Component({
  selector: 'app-list-compte',
  templateUrl: './list-compte.component.html',
  styleUrls: ['./list-compte.component.scss']
})
export class ListCompteComponent implements OnInit {
  
  p: number = 1;
  control: FormControl = new FormControl('');
  constructor(public crudApi: CompteService, public toastr: ToastrService,
    private router : Router,public fb: FormBuilder,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<AddCompteComponent>,) { }
  ngOnInit(): void {
    this.getData();
  }
  addarticle()
  {
    this.crudApi.choixmenu = "A";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="40%";
    //dialogConfig.data="gdddd";
    this.matDialog.open(AddCompteComponent, dialogConfig);
  }
 
  

  
  getData() {
    this.crudApi.getAll().subscribe(
      response =>{this.crudApi.list = response;}
     );
   
  }
  
 
  removeData(id: number) {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce compte ?')) {
    this.crudApi.deleteData(id)
      .subscribe(
        data => {
          console.log(data);
          this.toastr.warning(' Compte supprimé avec succès!'); 
          this.getData();
        },
        error => console.log(error));
  }
  }
  selectData(item : Compte) {
    this.crudApi.choixmenu = "M";
    this.crudApi.dataForm = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="40%";
    
    this.matDialog.open(AddCompteComponent, dialogConfig);
  }
}

