import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import {Router, Routes} from '@angular/router';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class LoginService {
    
    logined;
    userEmail;
    
    
      constructor(public http:Http, private router: Router) { 
          this.logined = false;
          
      }
    
    authenticate(userList, email, password){
        var validEmail = false;
        for(let i of userList){
            if(i.email == email){
                validEmail = true;
                this.userEmail = email;
                this.http.get("https://se3316a-jngo42.c9users.io/api/verify/encryptedpass/"+ i.password + "/password/" + password)
                .toPromise()
                .then(
                    response => this.isPasswordValid(response.json())
                 )
                .catch(this.handleError);
            }
        }
        
        if(validEmail == false){
            alert("Invalid email");
        }
        
        
    }
    
    isPasswordValid(isValid){
        if(isValid){
            this.logined = true;
            this.router.navigate(['profile']);
            console.log("You have successfully logged in");
            console.log(this.logined + " " + this.userEmail );
        }
        else{
            alert("Invalid password");
            console.log("invalid password");
        }
    }

  
  
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
    
    
    
    isLogined(){
        return this.logined;
    }
    
    getUserEmail(){
        return this.userEmail;
    }

}
