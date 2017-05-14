import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Headers, Http } from '@angular/http';
import {LoginService} from '../login.service';

import {UserProfileComponent} from '../user-profile/user-profile.component';

import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginService;
  constructor(public http:Http, service: LoginService, private router: Router) { 
    this.loginService = service;
  }

  ngOnInit() {
  }
  
  login(email, password) {
    
    
    this.http.get("https://se3316a-jngo42.c9users.io/api/users")
               .toPromise()
               .then(
                 response => this.loginService.authenticate(response.json(), email, password)
               )
               .catch(this.handleError);
               
  }
  
  back(){
    this.router.navigate(['']);
  }
  
  
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
