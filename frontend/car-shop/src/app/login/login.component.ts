import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationServiceService } from '../auth/authentication-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  name: string;
  password: string;

  constructor(private authenticationService: AuthenticationServiceService, private router: Router) {
    this.name =""
    this.password =""
   }

  ngOnInit(): void {
    if(localStorage.getItem("user")){
      localStorage.removeItem("user")
    }
  }

  login(){
    if(this.name !="" && this.password !=""){
      this.authenticationService.login(this.name, this.password).subscribe(msg =>{
        console.log(msg)
        localStorage.setItem('user', this.name)
        this.router.navigate(['homepage']);
      }, (err) =>{
        console.log(err)
      })
    }
  }

}
