import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';
import { AddUserComponent } from '../add-user/add-user.component';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  constructor(public userService:UserService,public fb: FormBuilder,public toastr: ToastrService,
    private router : Router,
    @Inject(MAT_DIALOG_DATA)  public data,
    public dialogRef:MatDialogRef<EditUserComponent>) { }

  ngOnInit(): void {
    if (this.userService.choixmenu == "A")
    {this.infoForm()};
  }




  infoForm() {
    this.userService.dataForm = this.fb.group({
        id: null,
        code: ['', [Validators.required]],
        username: ['', [Validators.required]],
        adresse: ['', [Validators.required, Validators.minLength(5)]],
        telephone: ['', [Validators.required, Validators.minLength(8)]],
        email: [' ', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        role: ['', [Validators.required]]
    
        }, {updateOn:'submit'});
    }

    ResetForm() {
      this.userService.dataForm.reset();
  }
  
     onSubmit() {
      if (this.userService.choixmenu == "M")
      {
        
       this.updateData()
      }
    }
  updateData()
  {
    this.userService.updatedata(this.userService.dataForm.value.id,this.userService.dataForm.value).
    subscribe( data => {
      this.toastr.success( 'Modification Faite avec succés');
      this.dialogRef.close();
   
      this.userService.getAll().subscribe(
        response =>{this.userService.list = response;}
       );
      this.router.navigate(['/dashbord/list-user']);
    });
  }
}
