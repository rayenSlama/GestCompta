import { Component, OnInit } from '@angular/core';
import { Employes } from 'src/app/Model/Employes';
import { EmployeService } from 'src/app/service/employe.service';
import { PointageService } from 'src/app/service/pointage.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
public salaires:any;
public pointages:any;
public employes:any;
  employe!: Employes;
  constructor( private pointService: PointageService , private emplService:EmployeService) { }

  ngOnInit(): void {

    this.pointService.getPointage()
    .subscribe(data=>{
       this.pointages=data;
     },err=>{
       console.log(err);
     }
   )
   this.emplService.getEmploye()
   .subscribe(data=>{
      this.employes=data;
    },err=>{
      console.log(err);
    }
  )
   }
  


  onChercher(form : any){
    this.pointService.getPointageByMois(form.keyword).subscribe( data =>{
      //   this.employes = data;
      this.pointages=data;
          },err=>{
            console.log(err);
        })
      }



  Afficher(){

  }

  Imprimer(){

  }
}
