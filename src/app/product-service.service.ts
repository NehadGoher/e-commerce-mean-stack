import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  uri = 'http://localhost:7000';

  constructor(private http: HttpClient) { }

  getProduct(keyword)
  {
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
}
