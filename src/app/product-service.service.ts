import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  uri = 'http://localhost:7000';

  constructor(private http: HttpClient) { }

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
    return this.http.post(`${this.uri}/product`,obj).subscribe(res=>{
      console.log("doneeee");
    });

  }
}
