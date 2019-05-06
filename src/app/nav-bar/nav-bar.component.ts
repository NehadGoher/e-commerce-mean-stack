import { Component, OnInit } from '@angular/core';
import {ProductServiceService} from '../product-service.service';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private PService:ProductServiceService) { 
  }

  ngOnInit() {
  }

}
