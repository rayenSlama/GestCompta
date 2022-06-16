import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Categorie } from 'src/app/model/categorie';
import { Tiers } from 'src/app/model/tiers';
import { ClientService } from 'src/app/service/client.service';
import { FournisseurService } from 'src/app/service/fournisseur.service';
import { TierService } from 'src/app/service/tier.service';
import { UserService } from 'src/app/service/user.service';
import { AddTiersComponent } from '../add-tiers/add-tiers.component';

@Component({
  selector: 'app-list-tiers',
  templateUrl: './list-tiers.component.html',
  styleUrls: ['./list-tiers.component.scss']
})
export class ListTiersComponent implements OnInit {
  term:any;
  tiers : Tiers;
  name="";
  control: FormControl = new FormControl('');
 p: number = 1;
  constructor(public crudApi:TierService,public userService:UserService, public toastr: ToastrService,
    private router : Router,public fb: FormBuilder,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<AddTiersComponent>,) { }
 
  ngOnInit() {
    this.name = localStorage.getItem('name');
    this.getData();
  }

  logout(){
    localStorage.removeItem('name');
    this.userService.islogin = false;
    this.router.navigate(['/login'])
    
  }
  addCategorie()
  {
 
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    //dialogConfig.data="gdddd";
    this.matDialog.open(AddTiersComponent, dialogConfig);
  }
 
  

  
  getData() {
   this.crudApi.getAll().subscribe(
      response =>{this.crudApi.list = response;}
     );
   
   
  }
  
 
  removeData(id: number) {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet tiers ?')) {
    this.crudApi.deleteData(id)
      .subscribe(
        data => {
          console.log(data);
          this.toastr.warning(' Tiers supprimé avec succès !'); 
          this.getData();
        },
        error => console.log(error));
  }
  }
  selectData(item : Tiers) {
    this.crudApi.choixmenu = "M";
    this.crudApi.dataForm = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    
    this.matDialog.open(AddTiersComponent, dialogConfig);
  }


  
  DetailsData(id:number){
    this.router.navigate(["detail-tier",id]);
  }
  
  

}
