import { Component, OnInit } from '@angular/core';
import {ProductServiceService} from '../product-service.service';
import Product from '../product';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  key="";
  constructor(private PService:ProductServiceService) { }

  ngOnInit() {
  }
productobj:Product;
  getProductFrom(keyword){
    this.key = keyword;
    console.log(keyword);
    this.PService
    .getProduct(keyword)
   
    
  }

}
