import { Component, OnInit } from '@angular/core';
import {ProductServiceService} from '../product-service.service';
import User from '../user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user;
  validuser=0;
  url="http://localhost:4200/Product";
  constructor(private PService:ProductServiceService,private router: Router) {
    
     }

  ngOnInit() {
  }
  getInfo(_email,_password){
    var obj={"email":_email,"password":_password};
    this.PService.getuser(obj).subscribe((data)=>{
      this.user=data;
       if(data)
        this.login();
        else
        alert("Error in email or password");
    });
    //console.log(_email + " "+ _password);
  }
  login(){
    if(this.user.email=="admin@admin.com"&&this.user.password=="123456")
       this.router.navigate(["admin"]);
    else
    {
      this.PService.loginOrNot(1,this.user.username);
       this.router.navigate(["Product"]);
    }
  }

}
