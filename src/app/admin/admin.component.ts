import { Component, OnInit } from '@angular/core';
import {ProductServiceService} from '../product-service.service';
import Product from '../product';
import { load } from '@angular/core/src/render3';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
products;
index;
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
upProduct;
Pid;
  constructor(private PService:ProductServiceService) {
    this.load();
   }
load()
{
  this.PService
  .getProducts()
  .subscribe((data :Product) => {
    this.products=data;
    this.index=this.products[this.products.length-1].ProductID;
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
    var obj = {ProductID:this.index, ProductName:this.PName, SupplierID: this.SID,CategoryID:this.CID,
      QuantityPerUnit:this.Quantity
    ,UnitPrice:this.Price,UnitsInStock:this.UInStock,UnitsOnOrder:this.UOnOrder,
    ReorderLevel:this.RLevel,Discontinued:this.Dis};
this.PService.addProduct(obj).subscribe((data)=>{
  

});
this.load();
this.visible=1;
  }
  update(prodId,prodName,id)
  {
    this.upProduct=prodId;
    this.Pid=id;
     this.visible=2;
     this.PService.getProduct(prodName).subscribe((data:Product)=>{
       var data2=data[0];
      this.PName=data2.ProductName, this.SID=data2.SupplierID,this.CID=data2.CategoryID,
      this.Quantity=data2.QuantityPerUnit
    ,this.Price=data2.UnitPrice,this.UInStock=data2.UnitsInStock,this.UOnOrder=data2.UnitsOnOrder,
    this.RLevel=data2.ReorderLevel,this.Dis=data2.Discontinued;
    console.log(data2);
     })
     
  }

  updateProduct=()=>
  {
    var obj = {ProductID:this.Pid, ProductName:this.PName, SupplierID: this.SID,CategoryID:this.CID,
      QuantityPerUnit:this.Quantity
    ,UnitPrice:this.Price,UnitsInStock:this.UInStock,UnitsOnOrder:this.UOnOrder,
    ReorderLevel:this.RLevel,Discontinued:this.Dis};
    console.log("update");
    console.log(obj);
    console.log(this.upProduct);
    this.PService.updateProduct(obj,this.upProduct).subscribe((data)=>{
    });
    console.log(this);

    this.load();
    this.visible=1;

  }
  delete(id)
  {
    console.log(id);
    this.PService.deleteProduct(id).subscribe(function (data){
      
    });
    console.log("deleted");
    console.log(this);
    this.load();
  }
}
