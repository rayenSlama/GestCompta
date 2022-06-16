import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';  
import { ToastrService } from 'ngx-toastr';
import { UserService} from '../../service/user.service';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import { Router } from '@angular/router';
import { User} from '../../model/user';
import { DatePipe }         from '@angular/common';
import { ExerciceService } from 'src/app/service/exercice.service';
import { Exercice } from 'src/app/model/exercice';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: any={};
  UserList: User[];
  ExerciceList: Exercice[];
  errorMessage:string;  
  name : string;  
  email :string;
  telephone :string;
  adresse : string;
  Wdate;
  annee : 0;
  loginForm:  FormGroup; 
  loginForm1:  FormGroup;
  state=false;
  constructor(private router:Router,public userService : UserService,public exercice:ExerciceService,
    public toastr: ToastrService,private datePipe : DatePipe,public fb: FormBuilder) { } 
    get f() { return this.loginForm.controls }   
  ngOnInit() {    
     this.userService.islogin = false;
     this.userService.admin = false;
     this.userService.suser = false;
     this.Wdate = this.transformDate(new Date());
     this.annee = (this.Wdate).toString().substring(0,4);
     localStorage.setItem('annee', this.annee.toString());
     this.infoForm();
     this.loginForm = this.fb.group({
      'code' : [null, Validators.required, Validators.minLength(1)],
      'username' : [null, Validators.required],
      'password' : [null, Validators.required],
      'date_debut' : [null, Validators.required],
      'date_fin' : [null, Validators.required],
      'annee': [null, Validators.required]



    });

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




  login() {
    
    const val = this.loginForm.value;
    this.userService.login(val.username, val.password).subscribe(
      res =>{
      this.user = res;
      localStorage.setItem("code", this.user.code);
        localStorage.setItem("name", this.user.username);
        localStorage.setItem("id_user", this.user.id);
        localStorage.setItem("telephone", this.user.telephone);
        localStorage.setItem("adresse", this.user.adresse);
        localStorage.setItem("email", this.user.email);


      

   
        
      /*  localStorage.setItem("date_debut",this.user.lexercices.date_debut);
        localStorage.setItem("date_fin",this.user.lexercices.date_fin);*/
    /*    localStorage.setItem("annee",this.user.lexercices.annee);*/
        let jwt = "Bearer " + this.user.jwt;
          localStorage.setItem("token", jwt)
       
         this.userService.islogin = true;
       
            
           




        if (this.user.role  == "Admin")
         {
         this.userService.admin = true;
          this.router.navigate(['/dashbord']);
      }
      else
      {
        this.userService.suser = true;
        this.router.navigate(['/accueil1']);
      }
          },
          error => 
          
            this.toastr.warning( 'Connexion incorrecte ')
         
          
          );
        }


    /*    exerc() { 

          this.exercice.createData(this.exercice.dataForm.value).
          subscribe(response => {
          
            this.exercice.getAll().subscribe(
              response =>{this.exercice.list = response;}
             );
             
            });

        }*/

        
        
        logOut() {
          localStorage.removeItem("username");
        }
 


  /*  onFormSubmit(form: NgForm) {
      this.authService.login(form)
        .subscribe(res => {
          console.log(res);
          if (res.token) {
            localStorage.setItem('token', res.token);
            this.router.navigate(['products']);
          }
        }, (err) => {
          console.log(err);
        });
    }

*/

    transformDate(date){
      return this.datePipe.transform(date, 'yyyy-MM-dd');
    }
    logout() {
      // remove user from local storage and set current user to null
      localStorage.removeItem('name');
      
  }




  ffff(){
    if(this.state){
      document.getElementById("password").setAttribute("type","password");
      document.getElementById("eye").style.color='#79797e';
      this.state=false;
    }
    else{
      document.getElementById("password").setAttribute("type","text");
      document.getElementById("eye").style.color='#5887ef';
      this.state=true;
    }
  }



 /* OnSelectTier(ctrl)
  {
     if(ctrl.selectedIndex == 0){
      this.f['username'].setValue('');
      this.f['code'].setValue('');
     }
     else{
        this.f['username'].setValue(this.UserList[ctrl.selectedIndex - 1].username);
        this.f['code'].setValue(this.UserList[ctrl.selectedIndex - 1].code);
     }
}*/


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
