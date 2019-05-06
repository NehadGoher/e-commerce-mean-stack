import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  uri = 'http://localhost:7000/';
  //uri="";
  constructor(private http: HttpClient) { }

  getcategory(keyword)
  {
    return this.http.get(`${this.uri}`+"categories/"+keyword);
  }
  getcategories()
  {
    return this.http.get(`${this.uri}`+"categories");

  }
  addcategory(obj)
  {
    return this.http.post(`${this.uri}category`,obj).subscribe(res=>{
      console.log("doneeee");
    });

  }
}
