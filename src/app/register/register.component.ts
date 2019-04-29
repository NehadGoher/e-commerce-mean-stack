import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../product-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private PService:ProductServiceService,private router: Router) { }

  ngOnInit() {
  }
  getInfo(email,pass,user)
  {
    var obj={"email":email,"password":pass,"username":user};
    this.PService.registerUser(obj).subscribe((data)=>{
      this.router.navigate(["Product"]);     
    });
  }
}
