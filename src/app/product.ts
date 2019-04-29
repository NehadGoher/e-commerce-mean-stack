
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export default class Product {
  _id:String;
    ProductName: String;
    SupplierID: Number;
    CategoryID:Number;
    QuantityPerUnit:String;
    UnitPrice:Number;
    UnitsInStock:Number;
    UnitsOnOrder:Number;
    ReorderLevel:Number;
    Discontinued:Number;


    
  }
