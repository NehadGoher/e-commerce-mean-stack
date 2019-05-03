import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../product-service.service'
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private pservice:ProductServiceService) { 
    console.log("hiii nav");
  }

  public login="" ;

  ngOnInit() {
    this.pservice.getEmitter().subscribe((LoginName) => {
      this.login=LoginName;
    });
   // this.login = this.pservice.validname;

  }


}
