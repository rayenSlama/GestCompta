import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employes } from 'src/app/Model/Employes';
import { EmployeService } from 'src/app/service/employe.service';

@Component({
  selector: 'app-details-employe',
  templateUrl: './details-employe.component.html',
  styleUrls: ['./details-employe.component.css']
})
export class DetailsEmployeComponent implements OnInit {
  employe!: Employes;
  id!: number;
  constructor(private route:ActivatedRoute ,public emplService:EmployeService) { }

  ngOnInit(): void {
 this.id=this.route.snapshot.params['id'];
    this.employe=new Employes();
   this.emplService.getEmployeById(this.id)
   .subscribe(data =>{
     this.employe=data;
   });
  }

}
