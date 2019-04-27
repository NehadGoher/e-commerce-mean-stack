import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //keyword="";
  constructor() { }

  ngOnInit() {
  }

  getKeyword(keyword){
    
    console.log(keyword);
  }

}
