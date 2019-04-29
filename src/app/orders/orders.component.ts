import { Component, OnInit } from '@angular/core';
import {ProductServiceService} from '../product-service.service';

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
index=0;
  constructor(private PService:ProductServiceService) {
    this.valid=this.PService.valid;
    this.validId=this.PService.validId;
    this.PService.getOrders(this.validId).subscribe((data)=>{
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
    

   }

  ngOnInit() {
  }

}
