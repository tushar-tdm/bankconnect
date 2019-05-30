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
    
    setInterval(() => {
      console.log("function called");
      if(this.i)
      //this.change();
      this.i=1;
      console.log(this.i);
    }, 15000);
  }

  // change(){
  //   this.loaded = 1;
  //   console.log(this.i+" "+this.loaded);
  // }
}
