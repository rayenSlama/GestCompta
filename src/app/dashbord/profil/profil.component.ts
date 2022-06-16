import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/http-service.service';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  
  email = "";
  telephone ="";
  adresse = "";
  name = "";

  id_user;
  
  /*list: User[];*/
 /* public users:any;*/
/* user:any= {};*/

user:User;
 luser:User[]
id:number;

 /* user: User;*/
  
  constructor(private router:Router,public userService: UserService,private http1:HttpServiceService, private route:ActivatedRoute) { 
  }
  logout(){
    localStorage.removeItem('name');
    this.userService.islogin = false;
    this.router.navigate(['/login'])
    
  }

  
  ngOnInit(): void {
    this.user=this.userService.getter();
    this.name = localStorage.getItem('name');
   this.email=localStorage.getItem("email");
     this.id_user=localStorage.getItem("id_user");
      this.telephone=localStorage.getItem("telephone");
       this.adresse= localStorage.getItem("adresse");
     /* this.getData();*/
     this.userService.getData(this.userService.dataForm.value.id_user).subscribe(
      response =>{this.user= response;}
     );
  }
 
 /* getData() {
    this.userService.getData(this.userService.dataForm.value.id_user).subscribe(
      response =>{this.user= response;}
     );
   
    }*/


}
