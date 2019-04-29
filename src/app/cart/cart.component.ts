import { Component, OnInit } from '@angular/core';
import {ProductServiceService} from '../product-service.service';
import Product from '../product';
import {Cart} from '../Cart'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart:any =[]
  constructor(private PService:ProductServiceService, private cartObj:Cart, private prodt:Product) { 
    console.log("ctor")
    this.cart =cartObj.getCart();
    console.log(this.cart);
  }

  ngOnInit() {
    //console.log("init")
  }

  buyOrder(){
    console.log("buy");
    //pservice   don't have time to make service for cart
    this.PService.addOrder(this.cart).subscribe(data=>{
      
      console.log(data);
    });
  }
  removeProduct(prodName,quantity){
    ///////////Bug
    /// need to get the whole product
    //console.log(prodName);
    // let prod = this.cartObj.search(prodName);
    // console.log("removeProduct");
    // console.log(prod);
    // prod["UnitsInStock"] += parseInt(quantity);
    // console.log("After");
    // console.log(prod);
    // this.PService.updateProduct(prod,prod["_id"]).subscribe((data)=>{
    //   console.log("update")
    //   console.log(data)
    // });
    // this.cartObj.removeProduct(prod);
    
   

  }
}
