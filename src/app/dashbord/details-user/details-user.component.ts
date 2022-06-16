import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-details-user',
  templateUrl: './details-user.component.html',
  styleUrls: ['./details-user.component.scss']
})
export class DetailsUserComponent implements OnInit {
  user:User;
  id:number;
  constructor(private router:Router,public userService: UserService, private route:ActivatedRoute) { }


  logout(){
    localStorage.removeItem('name');
    this.userService.islogin = false;
    this.router.navigate(['/login'])
    
  }
  ngOnInit(): void {
  
    this.id=this.route.snapshot.params['id'];
    this.user=new User();
   this.userService.getData(this.id)
   .subscribe(data =>{
     this.user=data;
   });
  }


}
