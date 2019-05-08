import { Injectable } from '@angular/core';
import {ProductServiceService} from './product-service.service'
@Injectable({
    providedIn: 'root'
  })
export  class Cart{

    cartList :any = []
    constructor(private PService:ProductServiceService){

    }

    addToCart(prod,num){
        //let num = 1;
        // console.log("add to cart service");
        // console.log(prod);
        let idx = this.search(prod["ProductName"]);
        // console.log(idx);
        if(idx){
             console.log("if");
             console.log(idx["quantity"]);
             this.cartList.forEach(element => {
                if( element["ProductName"] == idx["ProductName"])
                element["quantity"] += num;
        })
        }

        else{
            
            let obj = {
                ProductID:prod["ProductID"],
                username:this.PService.validname,
                ProductName:prod["ProductName"],
                quantity:num,
                price:prod["UnitPrice"],
            };

             console.log("Product in cart");
             console.log(obj);
            // console.log(obj);
            this.cartList.push(obj);
        }
        
        // console.log("product add");
        // console.log("cart");
        // console.log(this.cartList);

    }

    getCart(){
        return this.cartList;
    }
    removeFromCart(prod){
        let idx = this.search(prod["ProductName"]);
        if(idx["quantity"]>1){

            idx["quantity"] -= 1;
            this.cartList.forEach(element => {
                if( element["ProductName"] == idx["ProductName"])
                element["quantity"] -= 1;
            }); 
        }
        else{
            this.cartList.splice( this.cartList.findIndex(v => v.ProductName === idx["ProductName"]), 1);
        }
        
        
        // console.log( idx);
        // console.log("deleted");
    }

    removeProduct(prod){
        
        this.cartList.splice( this.cartList.findIndex(v => v.ProductName === prod["ProductName"]), 1);

    }
    findIndex(prod){
        for (var i=0; i < this.cartList.length; i++) {
                if (this.cartList[i].ProductName === prod) {
                    return i;
                }
            }
            return -1;
    }

    search(prodName:string){
        let prod = null;
        if(prodName){
            
            this.cartList.forEach(element => {
             // console.log("for")
             // console.log(element["ProductName"])
       
             if(element["ProductName"].includes(prodName) ){
               
               prod = element
               //console.log(prod)
             }
           }
           );
        }
        
       return prod;
      }
}