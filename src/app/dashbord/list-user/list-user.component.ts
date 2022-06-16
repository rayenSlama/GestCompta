import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';
import { AddUserComponent } from '../add-user/add-user.component';
import { EditUserComponent } from '../edit-user/edit-user.component';


@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})

export class ListUserComponent implements OnInit {
  p: number = 1;
  public users:any;
  term:any;
 /*isActive:boolean;*/

  constructor(private router:Router,public userService:UserService, public toastr: ToastrService,public fb: FormBuilder,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }
  logout(){
    localStorage.removeItem('name');
    this.userService.islogin = false;
    this.router.navigate(['/login'])
    
  }
 /* onChercher(form){
   
    this.userService.getUserByKey(form.keyword).subscribe( data =>{
      this.users=data;
          },err=>{
            console.log(err);
        });
        this.userService.getUserByAdresse(form.keyword).subscribe( data =>{
          this.users=data;
              },err=>{
                console.log(err);
            });

           this.userService.getUserByName(form.keyword).subscribe( data =>{
              this.users=data;
                  },err=>{
                    console.log(err);
                })

                this.userService.getUserByTelephone(form.keyword).subscribe( data =>{
                  this.users=data;
                      },err=>{
                        console.log(err);
                    })

                    this.userService.getUserByCode(form.keyword).subscribe( data =>{
                      this.users=data;
                          },err=>{
                            console.log(err);
                        })
      }*/
  ngOnInit(): void {
    this.getData();
  }


  getData() {
    this.userService.getAll().subscribe( 
      response =>{this.userService.list = response;}
      );
    
   }


  addclient()
  {
  this.userService.choixmenu = "A";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    //dialogConfig.data="gdddd";
    this.matDialog.open(AddUserComponent, dialogConfig);
  }
  removeData(id: number) {
  if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
    this.userService.deleteData(id)
      .subscribe(
        data => {
          console.log(data);
          this.toastr.success(' Utilisateur supprimé avec succès !'); 
          this.getData();
        },
        error => console.log(error));
  }
  }
  selectData(item : User) {
   this.userService.choixmenu = "M";
    this.userService.dataForm = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    
    this.matDialog.open( EditUserComponent, dialogConfig);
  }


  DetailsData(id:number){
    this.router.navigate(["dashbord/details-user",id]);
  }
   

updateStatut(){
 
  this.userService.updatedata(this.userService.dataForm.value.id,this.userService.dataForm.value).
  subscribe( data => {
      this.userService.getAll().subscribe(
      response =>{this.userService.list = response;}
     );
   
  });
}

}
