import { Component, OnInit } from '@angular/core';
import {UserCurrentChordSheetService} from '../user-current-chord-sheet.service';
import {CurrentChordSheetService} from '../current-chord-sheet.service';
import {LoginService} from '../login.service';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import {Router, Routes} from '@angular/router';
let chordpro = require('chordprojs');


import {Observable} from 'rxjs/Rx';
import 'rxjs/Rx';

@Component({
  selector: 'app-user-current-chord-sheet',
  templateUrl: './user-current-chord-sheet.component.html',
  styleUrls: ['./user-current-chord-sheet.component.css']
})
export class UserCurrentChordSheetComponent implements OnInit {
  
  userCurrentChordSheetService;
  currentChordSheetService;
  loginService;
  userEmail;
  chordSheetTitle;
  chordSheetVersion;
  chordSheetDate;
  chordSheetId;
  chordSheetString;
  chordStringFormatted;
  isVisible;
  
  constructor(_currentChordSheetService: CurrentChordSheetService, _userCurrentChordSheetService: UserCurrentChordSheetService, _loginService: LoginService, private http: Http, private router: Router) { 
    this.chordStringFormatted = "";
    this.loginService = _loginService;
    this.userCurrentChordSheetService = _userCurrentChordSheetService;
    this.currentChordSheetService = _currentChordSheetService;
    this.chordSheetTitle = this.userCurrentChordSheetService.getChordSheetTitle();
    this.chordSheetVersion = this.userCurrentChordSheetService.getChordSheetVersion();
    this.userEmail = this.loginService.getUserEmail();
    this.getChordSheet();
  }

  ngOnInit() {
  }
  
  
  getChordSheet(){
    
    let body = JSON.stringify({'email': this.userEmail, 'title': this.chordSheetTitle, 'version': this.chordSheetVersion});
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option
    console.log(this.userEmail + " " + this.chordSheetTitle);
    
    this.http.post("https://se3316a-jngo42.c9users.io/api/userchordsheet", body, options)
                   .map((res:Response) => res.json()) 
                   .catch(this.handleError).subscribe(data => this.displayChordSheet(data));
  }
  
  
  setVisibility(){
    console.log("visibility: " + this.isVisible);
    let body = JSON.stringify({'email': this.userEmail, 'title': this.chordSheetTitle, 'newIsVisible': !this.isVisible});
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option
    console.log(this.userEmail + " " + this.chordSheetTitle);
    
    this.http.put("https://se3316a-jngo42.c9users.io/api/chordsheet/updatevisibility", body, options)
                   .map((res:Response) => res.json()) 
                   .catch(this.handleError).subscribe(data => this.updateVisibility(data));
  }
  
  updateVisibility(visible){
    this.isVisible = visible;
    
    if(this.isVisible == true){
      document.getElementById("visibilityBtn").innerText = "Chord sheet is public";
    }
    else{
      document.getElementById("visibilityBtn").innerText = "Chord sheet is private";
    }
  }
  
  
  
  
  
  
  displayChordSheet(data){
    this.chordSheetTitle = data[0].title;
    this.chordSheetVersion = data[0].version;
    this.chordSheetId = data[0]._id;
    this.chordSheetDate = data[0].date;
    this.chordSheetString = data[0].chordString;
    this.chordStringFormatted = chordpro.format(data[0].chordString);
    
    this.updateVisibility(data[0].isVisible);
  }
  
  
  
  
  
  updateChordSheet(){
    
    this.userCurrentChordSheetService.openUpdateChordSheet(true,this.chordSheetString);
  }
  
  
  
  
  
  
  deleteChordSheet(){
    this.http.delete("https://se3316a-jngo42.c9users.io/api/chordsheets/"+this.chordSheetId)
                   .map((res:Response) => res.json()) 
                   .catch(this.handleError).subscribe(data => console.log(data));
    this.router.navigate(['profile']);
  }
  
  
  back(){
    this.router.navigate(['userchordsheets']);
  }
  
  
  
  setTitle(title){
    console.log("new title: " + title);
    let body = JSON.stringify({'email': this.userEmail, 'title': this.chordSheetTitle, 'newTitle': title});
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option
    console.log(this.userEmail + " " + this.chordSheetTitle);
    
    this.http.put("https://se3316a-jngo42.c9users.io/api/chordsheet/updatetitle", body, options)
                   .map((res:Response) => res.json()) 
                   .catch(this.handleError).subscribe(data => this.chordSheetTitle = data);
                   
                   
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
