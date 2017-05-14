import { Component, OnInit } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import {Router, Routes} from '@angular/router';
import {LoginService} from '../login.service';
import {UserCurrentChordSheetService} from '../user-current-chord-sheet.service';

import {Observable} from 'rxjs/Rx';

import 'rxjs/Rx';

@Component({
  selector: 'app-display-user-chord-sheets',
  templateUrl: './display-user-chord-sheets.component.html',
  styleUrls: ['./display-user-chord-sheets.component.css']
})
export class DisplayUserChordSheetsComponent implements OnInit {

  loginService;
  userCurrentChordSheetService;
  
  titleList:string[] = [];
  versionList:string[] = [];
  
  chordSheetCounter;
  nextPageCounter;
  dataLength;
  subtractLength;

  constructor(private router:Router, public http:Http, _loginService: LoginService, _userCurrentChordSheeService: UserCurrentChordSheetService) { 
    this.loginService = _loginService;
    this.userCurrentChordSheetService = _userCurrentChordSheeService;
    console.log("email: "+this.loginService.getUserEmail());
    this.displayUserChordSheets();
    this.chordSheetCounter = 0;
    this.nextPageCounter = 9;
    this.subtractLength = 9;
  }
  
  
  displayUserChordSheets(){
    this.http.get("https://se3316a-jngo42.c9users.io/api/chordsheets")
                    .map((res:Response) => res.json())
                    .catch(this.handleError).subscribe(
                                                        data => this.findUserChordSheets(data)
                                                      );
  }
  
  findUserChordSheets(data){
    
    this.dataLength = data.length;
    console.log("datalength: " + this.dataLength);
    var counter = 0;
    var j = this.nextPageCounter;
    
    for(let i = this.chordSheetCounter; i < j && i < data.length; i++){
      
      if(this.loginService.getUserEmail() == data[i].email){
        
        this.titleList[counter] = data[i].title;
        this.versionList[counter] = data[i].version;
        counter++;
      }
      else{
        this.subtractLength++;
        this.nextPageCounter++;
        this.chordSheetCounter++;
        j = this.nextPageCounter;
      }
      
    }
    console.log("next clicked");
  }
  
  
  
  openEditView(divNum){
    console.log("clicked");
    if(this.titleList[divNum] != undefined){
     this.userCurrentChordSheetService.openUserChordSheet(this.titleList[divNum], this.versionList[divNum]);
    }
  }
  
  
  

  ngOnInit() {
  }
  
  clearTiles(){
    for(let i = 0; i < this.titleList.length; i++){
      this.titleList[i] = null;
      this.versionList[i] = null;
    }
  }
  
  
  nextPage(){
    console.log("next page: " + this.nextPageCounter);
    if(this.nextPageCounter < this.dataLength){
      this.chordSheetCounter = this.chordSheetCounter + 9;
      this.nextPageCounter  =  this.nextPageCounter + 9;
      this.clearTiles();
      this.displayUserChordSheets();
    }
    console.log("next page2: " + this.nextPageCounter);
  }
  
  previousPage(){
    console.log("subtract length: " + this.subtractLength);
    if(this.chordSheetCounter >=this.subtractLength){
      this.chordSheetCounter = this.chordSheetCounter - this.subtractLength;
    }
    else{
      this.chordSheetCounter = 0;
    }
    
    if(this.nextPageCounter >= 18){
      this.nextPageCounter = this.nextPageCounter - this.subtractLength;
    }
    else{
      this.nextPageCounter = 9;
    }
    this.clearTiles();
    this.displayUserChordSheets();
    console.log("previous page: " + this.nextPageCounter);
    this.subtractLength = 9;
  }
  
  back(){
    this.router.navigate(['profile']);
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
