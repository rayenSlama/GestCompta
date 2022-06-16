import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-deconnexion',
  templateUrl: './deconnexion.component.html',
  styleUrls: ['./deconnexion.component.css']
})
export class DeconnexionComponent implements OnInit {
  constructor(private userService:UserService,
    private router: Router) {

  }

  ngOnInit() {
    localStorage.removeItem('name');
  this.userService.islogin = false;
  this.router.navigate(['/login']);

   
  }

}
