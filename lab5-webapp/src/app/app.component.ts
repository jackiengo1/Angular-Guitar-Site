import { Component } from '@angular/core';
import {LoginComponent} from './login/login.component';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import {Router, Routes} from '@angular/router';

import {Observable} from 'rxjs/Rx';

import 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  
  constructor(public http:Http, private router: Router){
    //this.testing();
  }
    ngOnInit() {
  }
  
  openSecurityPage(){
    this.router.navigate(['securitypolicy']);
  }
  
  openDMCAPage(){
    this.router.navigate(['dmcatakedown']);
  }
  
  
  
   // testing(){
     // console.log("testing");
       // let body = JSON.stringify({'email': "hello321@hotmail.com", 'title': "hello123123", 'version': 1, 'chordString': "nothing" });
      //  let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        //let options = new RequestOptions({ headers: headers, method: "post" });

            
          /*this.http.get("https://se3316a-jngo42.c9users.io/api/users")
                    .map((res:Response) => res.json())
                    .catch(this.handleError).subscribe(
                                                        data => this.jsonData = data
                                                      );*/
                                                      
                                                      
        /*let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: headers }); // Create a request option
        this.http.post("https://se3316a-jngo42.c9users.io/api/chordsheets", body, options) // ...using post request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch(this.handleError).subscribe(data => console.log("Data: " + data.message)); //...errors if a
    
    }
    
    
    private extractData(res: Response) {
     let body = res.json();
     return body.data || { };
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
  }*/
}
