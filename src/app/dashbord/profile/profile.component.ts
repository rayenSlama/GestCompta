import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employes } from 'src/app/Model/Employes';
import { EmployeService } from 'src/app/service/employe.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  employs!: Employes[];
 public employes:any;
  constructor(public emplService: EmployeService, private router:Router) { }


onChercher(form : any){
  this.emplService.getEmployeByKey(form.keyword).subscribe( data =>{
    //   this.employes = data;
    this.employes=data;
        },err=>{
          console.log(err);
      })
    }
    EditEmploye(e:any){
      let url=e._links.self.href
this.router.navigateByUrl("/modifemploye/"+btoa(url));
    }

    AjouteEmploye(){
      this.router.navigateByUrl("/ajoutemploye");
    }

    

    DeleteEmploye(e : any){

      let conf=confirm("Etes vous sure?");
      if (conf) {
        this.emplService.delete(e._links.self.href)
        .subscribe(data=>{
          this.emplService.getEmploye()
          .subscribe(data=>{
            this.employes=data;
          },err=>{
            console.log(err);
          }
        )
          
        },err=>{
          console.log(err);
          }
        )

  
      }

    }



  ngOnInit() {
   this.emplService.getEmploye()
   .subscribe(data=>{
      this.employes=data;
    },err=>{
      console.log(err);
    }
  )
}


detail(id :number){
  this.router.navigate(["details-employe",id]);
}
}
