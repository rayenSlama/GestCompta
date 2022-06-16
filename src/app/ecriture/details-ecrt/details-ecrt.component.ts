import { AgmBicyclingLayer } from '@agm/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ecriture } from 'src/app/model/ecriture';
import { EcritureService } from 'src/app/service/ecriture.service';
import { LigneEcritureService } from 'src/app/service/ligneEcriture.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-details-ecrt',
  templateUrl: './details-ecrt.component.html',
  styleUrls: ['./details-ecrt.component.scss']
})
export class DetailsEcrtComponent implements OnInit {
  p: number = 1;
  ecriture:Ecriture;

  ligne : any;
  constructor(private router:Router,public ecrtService: EcritureService,public lignecrt :LigneEcritureService, private route:ActivatedRoute) { }

  ngOnInit(): void {
  
  this.ecriture=this.ecrtService.getter();
  console.log(this.ecriture);
  
   this.ecrtService.getData(this.ecriture.numecrt)
   .subscribe(data =>{
     this.ecriture=data;
   });

  this.lignecrt.getLigneEcritureByNumero(this.ecriture.numecrt).subscribe(response =>{this.lignecrt.lecritureList = response;
   });
  }

}
