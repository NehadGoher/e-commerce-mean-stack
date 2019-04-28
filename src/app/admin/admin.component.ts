import { Component, OnInit } from '@angular/core';
import {ProductServiceService} from '../product-service.service';
import Product from '../product';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
products;
visible=1;
PName;
SID;
CID;
Quantity;
Price;
UInStock;
UOnOrder;
RLevel;
Dis;
  constructor(private PService:ProductServiceService) {
    this.PService
    .getProducts()
    .subscribe((data :Product) => {
      this.products=data;
      console.log("hii");
     console.log(this.products);
  });
   }

  ngOnInit() {
  }
  productobj:Product;
  addProduct(){
    this.visible=0;
  }
  add()
  {
    console.log("addd")
    console.log(this.products.length);
    var obj = {ProductID:this.products.length+1, ProductName:this.PName, SupplierID: this.SID,CategoryID:this.CID,
      QuantityPerUnit:this.Quantity
    ,UnitPrice:this.Price,UnitsInStock:this.UInStock,UnitsOnOrder:this.UOnOrder,
    ReorderLevel:this.RLevel,Discontinued:this.Dis};
this.PService.addProduct(obj);
  }
}
