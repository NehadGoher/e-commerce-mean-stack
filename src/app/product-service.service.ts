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
=======
 /* addBusiness(person_name, business_name, business_gst_number) {
    const obj = {
      person_name: person_name,
      business_name: business_name,
      business_gst_number: business_gst_number
    };
    console.log(obj);
    this.http.post(`${this.uri}/add`, obj)
        .subscribe(res => console.log('Done'));
  }*/
  key;
>>>>>>> f0e0a8d7b2247b284331e010c0df9d92274aa2a0
  getProduct(keyword)
  {
    this.key = keyword;
    console.log("Keeeey" +this.key);
    return this.http.get(`${this.uri}`+"/products/"+keyword)
  }
  getProducts()
  {

    return this.http.get(`${this.uri}`+"/products");

  }
  addProduct(obj)
  {
    return this.http.post(`${this.uri}/product`,obj);

  }
<<<<<<< HEAD
  updateProduct(obj,id)
  {
    console.log("pservice",`${this.uri}/product/${id}`)
    return this.http.put(`${this.uri}/product/${id}`,obj);
  }
  deleteProduct(id)
  {
     return this.http.delete(`${this.uri}/product/${id}`);
=======

  getProp(){
    console.log("proop" +this.key);
    return this.http.get(`${this.uri}`+"/products/"+this.key);
>>>>>>> f0e0a8d7b2247b284331e010c0df9d92274aa2a0
  }
}
