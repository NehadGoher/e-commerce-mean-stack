import { Component } from '@angular/core';
import { ProductServiceService } from './product-service.service'
import {Router} from '@angular/router'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'e-commerce';
  constructor(private router:Router,private PService: ProductServiceService){

  }
  //login=""
  ngOnInit()
  {
    
    this.router.events.subscribe(event => {
      if (event.constructor.name == "nav-bar") {
      //this.login= this.PService.validname;
      }
    })
  }
}
