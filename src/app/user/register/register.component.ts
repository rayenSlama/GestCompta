import { Component, OnInit } from '@angular/core';
import { UserService} from '../../service/user.service'
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import { Router } from '@angular/router';
import { User} from '../../model/user';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user: any={};
state=false;
  constructor(public crudApi: UserService ,public fb: FormBuilder,public toastr: ToastrService,
    private router : Router) { }

  ngOnInit() {
  
   
    this.infoForm();
   }

  
  infoForm() {
    this.crudApi.dataForm = this.fb.group({
        id: null,
        code: ['', [Validators.required, Validators.minLength(1)]],
        username: ['', [Validators.required, Validators.minLength(5)]],
        role: ['', [Validators.required]],
        email: ['', [Validators.required,Validators.email]],
        adresse: ['', [Validators.required]],
        telephone: ['', [Validators.required,Validators.minLength(8)]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        pwdd: ['', [Validators.required, Validators.minLength(8)]],
        }, {updateOn:'submit'});
    }
   
  

  ResetForm() {
      this.crudApi.dataForm.reset();
  }
  onSubmit() {
    const val = this.crudApi.dataForm.value;
    if (val.password == val.pwdd)
    { localStorage.setItem("code", this.user.code);
    localStorage.setItem("name", this.user.username);
    localStorage.setItem("id_user", this.user.id);
    localStorage.setItem("telephone", this.user.telephone);
    localStorage.setItem("adresse", this.user.adresse);
    localStorage.setItem("email", this.user.email);
      if (this.crudApi.choixmenu == "A")
      {
        this.addData();
      }
      else
      {
       this.updateData()
      }
    }
    else
    {
      this.toastr.warning( 'Vérifiet votre mot de passe ...');  
    }
}
  
   

addData() {

  const users=this.crudApi.dataForm.value;
  this.crudApi.createData(this.crudApi.dataForm.value).
  subscribe( data => {
    this.toastr.success( 'Validation faite avec succès'); 
    this.router.navigate(['/login']);
  });
}
  updateData()
  {
  
    this.crudApi.updatedata(this.crudApi.dataForm.value.id,this.crudApi.dataForm.value).
    subscribe( data => {
      this.toastr.success( 'Modification faite avec succès');

      this.router.navigate(['/register']);
    });
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
  ffff1(){
    if(this.state){
      document.getElementById("pwdd").setAttribute("type","password");
      document.getElementById("eye1").style.color='#79797e';
      this.state=false;
    }
    else{
      document.getElementById("pwdd").setAttribute("type","text");
      document.getElementById("eye1").style.color='#5887ef';
      this.state=true;
    }
  }


  

  
}
