import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cbssuccess',
  templateUrl: './cbssuccess.component.html',
  styleUrls: ['./cbssuccess.component.scss']
})
export class CbssuccessComponent implements OnInit {

  loaded :Number = 0;
  i:Number = 0;
  constructor() { }

  ngOnInit() {
  }

  change(){
    this.loaded = 1;
  }

}
