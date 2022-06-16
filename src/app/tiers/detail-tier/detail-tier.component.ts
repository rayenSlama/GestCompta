import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tiers } from 'src/app/model/tiers';
import { TierService } from 'src/app/service/tier.service';

@Component({
  selector: 'app-detail-tier',
  templateUrl: './detail-tier.component.html',
  styleUrls: ['./detail-tier.component.scss']
})
export class DetailTierComponent implements OnInit {
  tier:Tiers;
  id:number;
  constructor(private router:Router,public tierService: TierService, private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.id=this.route.snapshot.params['id'];
    this.tier=new Tiers();
   this.tierService.getData(this.id)
   .subscribe(data =>{
     this.tier=data;
   });
  }
}
