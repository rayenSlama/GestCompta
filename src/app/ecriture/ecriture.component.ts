import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ecriture',
  templateUrl: './ecriture.component.html',
  styleUrls: ['./ecriture.component.scss']
})
export class EcritureComponent implements OnInit {
name="";
  constructor() { }

  ngOnInit(): void {
    this.name = localStorage.getItem('name');
  }

}
