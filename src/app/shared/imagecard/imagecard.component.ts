import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-imagecard',
  templateUrl: './imagecard.component.html',
  styleUrls: ['./imagecard.component.css']
})
export class ImagecardComponent implements OnInit {

  @Input() title:string | undefined;
  @Input() desc: string | undefined;
  @Input() footerTitle: string | undefined;
  @Input() position: string | undefined;
  @Input() image: string | undefined;

  constructor() { }

  ngOnInit() {
  }

}
