import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employes } from '../../../Model/Employes';
import { EmployeService } from '../../../service/employe.service';

@Component({
  selector: 'app-ajoutemploye',
  templateUrl: './ajoutemploye.component.html',
  styleUrls: ['./ajoutemploye.component.css']
})
export class AjoutemployeComponent implements OnInit {
  employe:Employes=new Employes();
  public currentEmploye: Employes = new Employes;
  public imagePath :any;
  imgURL: any;
  userFile :any;
  public message!: string;
  constructor(private emplService:EmployeService,private router :Router) { }

  ngOnInit(): void {
  }

 onSaveEmploye(data : any){
    this.emplService.saveData(this.emplService.host+"/employes",data)
    .subscribe(res=>{
      alert("Employé ajouté avec succès.");
      this.currentEmploye=res;
   this.router.navigate(['/dashbord/profile'])
    },err=>{
      console.log(err);
    })
  }

  
AjoutEmployee(){
 
}


/****add with image */
/*
addData() {
  const formData = new FormData();
  const article = this.emplService.dataForm.value;
  console.log("article" + article)
  formData.append('article', JSON.stringify(article));
  formData.append('file', this.userFile);
  this.emplService.createData(formData).subscribe(data => {

    alert("Employé  ajouté avec succès");

    this.router.navigate(['/dashbord/profile']);

  }, err => {
    console.log(err);
    alert("il faut renseigner tous les formulaire et choisire une Image\n Employé non ajouté");

  })
  
}*/






onSelectFile(event: any) {
    if (event.target.files.length > 0)
    {
      const file = event.target.files[0];
      this.userFile = file;


      var mimeType = event.target.files[0].type;
      if (mimeType.match(/image\/*/) == null) {
       this.message = "Only images are supported.";
        return;
      }

      var reader = new FileReader();

      this.imagePath = file;
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      }
    }


  }



  onSelectFile2(event: any) {
    if (event.target.files.length > 0)
    {
      const file = event.target.files[0];
      this.userFile = file;


      var mimeType = event.target.files[0].type;
      if (mimeType.match(/image\/*/) == null) {
       this.message = "Only images are supported.";
        return;
      }

      var reader = new FileReader();

      this.imagePath = file;
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      }
    }


  }


 
}
