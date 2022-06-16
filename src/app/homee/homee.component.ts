import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpServiceService } from '../http-service.service';
import { Exercice } from '../model/exercice';
import { ExerciceService } from '../service/exercice.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-homee',
  templateUrl: './homee.component.html',
  styleUrls: ['./homee.component.scss']
})
export class HomeeComponent implements OnInit {
  name = "";
  term:any;
  ExerciceList: Exercice[];
  loginForm:  FormGroup; 
 /* isLogin = false;*/

  constructor(private router:Router, private userService:UserService,public exercice:ExerciceService,
    public fb: FormBuilder) { 
/*
  let request = {}
  this.http.postRequest("api/status",request).subscribe(data=>{
    console.log("test",data);
},error=>{
  alert("Server connection error "+error)
})
if(this.http.isLogin()){
this.isLogin = true;
this.name = this.http.getLoginDataByKey("name");
}
*/
}
get f() { return this.loginForm.controls }   
logout(){
  localStorage.removeItem('name');
  this.userService.islogin = false;
  ///this.router.navigate(['/login']);
  location.reload();
}

account(){
  this.router.navigate(['/accueil1/profile-user']);
}
  ngOnInit(): void {
    this.name = localStorage.getItem('name');
    this.infoForm();
    this.exercice.getAll().subscribe(
      response =>{this.ExerciceList = response;}
     );
  }
  infoForm(){
    this.loginForm = this.fb.group({
      annee : '',
      date_debut:'',
      date_fin:''
  });
  }


  OnSelectExercice(ctrl)
  {
     if(ctrl.selectedIndex == 0){
      this.f['annee'].setValue('');
      this.f['date_debut'].setValue('');
      this.f['date_fin'].setValue('');
     }
     else{
        this.f['annee'].setValue(this.ExerciceList[ctrl.selectedIndex - 1].annee);
        this.f['date_debut'].setValue(this.ExerciceList[ctrl.selectedIndex - 1].date_debut);
        this.f['date_fin'].setValue(this.ExerciceList[ctrl.selectedIndex - 1].date_fin);
     }
}

}
