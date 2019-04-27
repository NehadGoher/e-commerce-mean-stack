import { Component, OnInit } from '@angular/core';
import {ProductServiceService} from '../product-service.service';
import Product from '../product';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //keyword="";
  constructor(private PService:ProductServiceService) { }

  ngOnInit() {
  }
productobj:Product;
  getKeyword(keyword){
    console.log(keyword);
    this.PService
    .getProduct(keyword)
    .subscribe((data :Product) => {
      this.productobj=data;
      console.log("hii");
     console.log(this.productobj);
  });
    
  }

}
