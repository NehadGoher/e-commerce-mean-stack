import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  uri = 'http://localhost:7000';
  products :any= [];

  constructor(private http: HttpClient) { }
<<<<<<< HEAD

key =""; 
=======
key;
<<<<<<< HEAD
valid=-1;
validId;
=======
>>>>>>> d6464faa4b9ea2f7ab577a529539de92ad42e763
>>>>>>> 51bb54d9e1bf6c2753bfed272e096e7904004cad
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
<<<<<<< HEAD
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
=======

  
>>>>>>> 51bb54d9e1bf6c2753bfed272e096e7904004cad
}
