import { Component, OnInit } from '@angular/core';
import {ProductServiceService} from '../product-service.service';

import {Cart} from '../Cart'
//import Product from '../product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products :any;
  pageNum  =1;
  constructor(private PService:ProductServiceService, private cart:Cart) { 
   // this.products = this.PService.getProp();

    //console.log("ctor");
    this.load();
  }

   clicked = {};
   prodClicked(prodName){
    this.clicked =this.search(prodName);
    console.log(this.clicked);
   }
  load(){
    this.PService.getProducts(this.pageNum).subscribe(data=>{
      this.products = data;
      console.log(data);
      console.log("Loaded");
    })
  }
  ngOnInit() {
   
   this.load();
    
   
  }

  changePage(num){
    console.log(num);
    this.pageNum = parseInt(num);
    this.load();
  }

  addCart(prodName,quantity){
    //console.log(prodName);
    var index = this.search(prodName);
    // console.log("index");
    // console.log(index);
    if(index &&index["UnitsInStock"] >=quantity){
      //console.log(index["UnitsInStock"])
      this.cart.addToCart(index,quantity);
      index["UnitsInStock"] -= quantity;

      this.PService.updateProduct(index,index["_id"]).subscribe((data)=>{
        // console.log("update")
        // console.log(data)
        this.load();
      });
    }

   // this.load();
  }
  
  search(prodName:string){
    let prod = null;
    prodName = prodName.trim();
     this.products.forEach(element => {
      // console.log("for")
      // console.log(element["ProductName"])

      if(element["ProductName"].trim().includes(prodName) ){
        
        prod = element
        //console.log(prod)
      }
    }
    );
   return prod;
  }
}
