import { Component, OnInit } from '@angular/core';
import {ProductServiceService} from '../product-service.service';
import { Cart } from '../Cart';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
valid;
validId;
ordersNo;
ordersInfo=[];
idx=0;
products :any;
  constructor(private PService:ProductServiceService, private cart:Cart) {
    this.load();
    this.valid=this.PService.valid;
    this.validId=this.PService.validname;
    this.PService.getOrderDetails(this.validId).subscribe((data)=>{
      console.log(data);
      this.ordersNo=data;
      for(let x of this.ordersNo)
      {
        this.ordersInfo[this.idx++]=x;
      }
    });
   /* this.PService.getOrders(this.validId).subscribe((data)=>{
      console.log(data);
this.ordersNo=data;
for(let x of this.ordersNo)
    {
      this.PService.getOrderDetails(x.OrderID).subscribe((data)=>{
        this.ordersInfo[""+x.OrderID]=data;
      });
    }
    console.log(this.ordersInfo);
    for(let x of this.ordersInfo)
    {
      for(let y=0;y<x.length;y++)
      {
        console.log(x[y].ProductID)
        this.PService.getProductName(x[y].ProductID).subscribe((data)=>{
          console.log("daaaaaa",data);
          x[y].ProductID=data;
        })
      }
    }
    });
    
*/
   }

  ngOnInit() {
  }
  load(){
    this.PService.getProp().subscribe(data=>{
      this.products = data;
      console.log(data);
    })
  }
  addCart(prodName,quantity){
    /////////////add quantity
    var index = this.search(prodName);
    // console.log("index");
    // console.log(index);
    console.log(quantity);
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
        console.log(prod)
      }
    }
    );
   return prod;
  }

}
