import { Component, OnInit } from '@angular/core';
import {ProductServiceService} from '../product-service.service';
//import Product from '../product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products :any;
  constructor(private PService:ProductServiceService) { 
   // this.products = this.PService.getProp();

    console.log("ctor");

  }

  
  ngOnInit() {
    this.PService.getProp().subscribe(data=>{
      this.products = data;
      console.log(data)
    })
   
    //this.products = this.PService.getProp();
    console.log("init !!!!");
   // console.log(this.PService.getProp());
   
  }

  
}
