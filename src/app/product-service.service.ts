import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  uri = 'http://localhost:7000';
  products :any= [];

  constructor(private http: HttpClient) { }

key =""; 

valid=-1;
validId;
  getProduct(keyword)
  {
    this.key = keyword;
    return this.http.get(`${this.uri}`+"/products/"+keyword);
  }
  getProducts()
  {
    return this.http.get(`${this.uri}`+"/products");

  }
  addProduct(obj)
  {
    return this.http.post(`${this.uri}/product`,obj);

  }
  updateProduct(obj,id)
  {
   
    console.log("pservice",`${this.uri}/product/${id}`)
    return this.http.put(`${this.uri}/product/${id}`,obj);
  }
  deleteProduct(id)
  {
     return this.http.delete(`${this.uri}/product/${id}`);
  }
  getProp(){
    console.log("proop" +this.key);
    return this.http.get(`${this.uri}`+"/products/"+this.key);

  }

  addOrder(obj){
    console.log("addOrder");
    console.log(obj);
    return this.http.post(`${this.uri}`+"/cart",obj);
  }
  getuser(obj)
  {
    return this.http.get(`${this.uri}/user/${obj.email}/${obj.password}`,obj);
     
  }
  getOrders(custId)
  {
    return this.http.get(`${this.uri}/order/${custId}`);
  }
  getOrderDetails(orderID)
  {
return this.http.get(`${this.uri}/orderDetails/${orderID}`);
  }
  loginOrNot(login,LoginId)
  {
     this.valid=login;
     this.validId=LoginId;
  }
  getProductName(id)
  {
    return this.http.get(`${this.uri}/productName/id`);
}
  
}
