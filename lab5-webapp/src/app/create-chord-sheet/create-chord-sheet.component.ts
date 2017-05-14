import { Component, OnInit } from '@angular/core';
import {Router, Routes} from '@angular/router';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import {LoginService} from '../login.service';
import {UserCurrentChordSheetService} from '../user-current-chord-sheet.service';

import {Observable} from 'rxjs/Rx';

import 'rxjs/Rx';

let chordpro = require('chordprojs');

@Component({
  selector: 'app-create-chord-sheet',
  templateUrl: './create-chord-sheet.component.html',
  styleUrls: ['./create-chord-sheet.component.css']
})
export class CreateChordSheetComponent implements OnInit {
  
  loginService;
  userCurrentChordSheetService;
  
  textAreaValue;
  errorTag;
  titleValue;
  versionNum;
  
  saveByTitle;
  
  constructor(private http: Http, private router:Router, private _loginService: LoginService, private _userCurrentChordSheetService:UserCurrentChordSheetService) {
    this.loginService = _loginService;
    this.userCurrentChordSheetService = _userCurrentChordSheetService;
    this.saveByTitle = false;
    this.versionNum = 1;
    this.loadChordSheet();
  }

  ngOnInit() {
  }
  
  clearTextArea(){
    console.log(this.textAreaValue);
    
    var userConfirm = confirm("Are you sure you want to clear?");
    if(userConfirm == true){
      this.textAreaValue = "";
    }
  }
  
  
  
  toggleSaveTitle(){
    if(this.saveByTitle){
      document.getElementById("inputDiv").style.visibility = "visible";
      document.getElementById("toggleTitleBtn").innerHTML = "Enter your own title";
      this.saveByTitle = false;
    }
    else{
      document.getElementById("inputDiv").style.visibility = "hidden";
      document.getElementById("toggleTitleBtn").innerHTML = "Save by title";
      this.saveByTitle = true;
    }
  }
  
  
  loadChordSheet(){
    if(this.userCurrentChordSheetService.getUpdateStatus()){
      this.textAreaValue = this.userCurrentChordSheetService.getChordSheetString();
      this.titleValue = this.userCurrentChordSheetService.getChordSheetTitle();
      this.versionNum = this.userCurrentChordSheetService.getChordSheetVersion();
      this.versionNum++;
    }
  }
  
  back(){
    this.router.navigate(['profile']);
  }
  
  save(){
    
    if(this.validateChordSheet(this.textAreaValue) && this.validTitle() && this.validSaveByTitle()){
      
      
      this.errorTag = "";
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1; //January is 0
      var yyyy = today.getFullYear();
      
      var currentDate = dd +'/' + mm + '/' + yyyy;
      
      let body = JSON.stringify({'email': this.loginService.getUserEmail(), 'title': this.titleValue, 'version':this.versionNum, 'chordString': this.textAreaValue, 'isVisible': true, 'userDate': currentDate });
      let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
      let options = new RequestOptions({ headers: headers }); // Create a request option
        
      this.http.post("https://se3316a-jngo42.c9users.io/api/chordsheets", body, options)
                      .map((res:Response) => res.json()) 
                      .catch(this.handleError).subscribe(data =>console.log(data));
      
      this.back();
      
    }
  }
  
  
  validateChordSheet(chordString){
    
    var correctColon = 0;
    var colonLength = 0;
    var bracketList:string[] = [];
    var squareBracket:string[] = [];
    
    
    if(chordString == undefined){
      this.errorTag = "Empty text field";
      return false;
    }
    
    
    for(let i =0; i < chordString.length; i++){
      
      if(chordString.charCodeAt(i) == 91){
        squareBracket.push(chordString[i]);
      }
      
      if(chordString.charCodeAt(i) == 93){
        if(squareBracket.pop() == undefined){
          this.errorTag = "missing [ or ] bracket";
          return false;
        }
      }
      
      if(chordString.charCodeAt(i) == 123){
        bracketList.push(chordString[i]);
        colonLength= colonLength + 2;
      }
      
      if(chordString.charCodeAt(i) == 58){
        correctColon++;
      }
      
      console.log(correctColon + " " + colonLength);
      if(chordString.charCodeAt(i) == 125){
        colonLength--;
        if(bracketList.pop() == undefined || correctColon != colonLength){
          this.errorTag = "missing { or } bracket OR invalid colon";
          return false;
        }
      }
      
    }//end for
    console.log("length:" + squareBracket.length);
    if(bracketList.length != 0 || correctColon != colonLength || squareBracket.length != 0){
      this.errorTag = "Invalid bracket or colon";
      return false;
    }
    this.errorTag = "";
    return true;
    
  }
  
  
  validTitle(){
    
    
    if((this.titleValue == undefined || this.titleValue.length == 0) && !this.saveByTitle){
      this.errorTag = "Empty title";
      return false;
    }
    
    return true;
    
  }
  
  validSaveByTitle(){
    
    if((chordpro.parse(this.textAreaValue).title == undefined || chordpro.parse(this.textAreaValue).title.length == 0) && this.saveByTitle){
      this.errorTag = "Empty title";
      return false;
    }
    if(this.saveByTitle){
      this.titleValue = chordpro.parse(this.textAreaValue).title;
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
