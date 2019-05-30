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
    setTimeout(() => {
      if(this.i)
        this.loaded = 1;
        
      this.i=1;
    }, 15000);
  }

}
