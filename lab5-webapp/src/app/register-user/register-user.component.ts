import { Component, OnInit } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import {Router, Routes} from '@angular/router';


import {Observable} from 'rxjs/Rx';

import 'rxjs/Rx';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  
  emailValue;
  passwordValue;

  constructor(private router: Router, private http: Http) { 
    
  }

  ngOnInit() {
  }
  
  register(){
    
    if(this.emailValue == undefined || this.emailValue.length == 0){
      alert("Empty email");
    }
    
    else if(this.passwordValue == undefined || this.passwordValue.length == 0){
      alert("Empty password");
    }
    else{
    
      this.http.get("https://se3316a-jngo42.c9users.io/api/chordsheets")
                     .map((res:Response) => res.json())
                      .catch(this.handleError).subscribe(
                                                         data => this.registerUser(data)
                                                        );
    }
  }
  
  
  back(){
    this.router.navigate(['']);
  }
  
  successfullyRegistered(){
    alert("Successfully registered");
    this.router.navigate(['']);
  }
  
  registerUser(data){
    if(this.checkExistingUser(data)){
      console.log("valid email");
      
      let body = JSON.stringify({'email': this.emailValue, 'password': this.passwordValue});
      let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
      let options = new RequestOptions({ headers: headers }); // Create a request option
      console.log(this.emailValue + " " + this.passwordValue);
    
     this.http.post("https://se3316a-jngo42.c9users.io/api/users", body, options)
                    .map((res:Response) => res.json()) 
                    .catch(this.handleError).subscribe(data => this.successfullyRegistered());
      
      
      
    }
  }
  
  checkExistingUser(data){
    
    for(var i = 0; i < data.length; i++){
      if(data[i].email == this.emailValue){
        alert("Email already exists. Enter another email.");
        return false
      }
    }
    
    return true;
    
  }
  
  
    private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
