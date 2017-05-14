import { Component, OnInit } from '@angular/core';
import { Headers, Http } from '@angular/http';
import {Router, Routes} from '@angular/router';
import {CurrentChordSheetService} from '../current-chord-sheet.service';

@Component({
  selector: 'app-display-chord-sheets',
  templateUrl: './display-chord-sheets.component.html',
  styleUrls: ['./display-chord-sheets.component.css']
})
export class DisplayChordSheetsComponent implements OnInit {

  titleList:string[] = [];
  userList:string[] = [];
  versionList:number[] = [];
  chordSheetCounter;
  nextPageCounter;
  

  chordSheetLength;
  subtractLength;
  currentChordSheetService;


  constructor(public http:Http, _currentChordSheetService : CurrentChordSheetService, private router:Router) { 
    this.displayChordSheets();
    this.chordSheetCounter = 0;
    this.nextPageCounter = 9;
    this.subtractLength = 9;
    this.currentChordSheetService = _currentChordSheetService;
  }

  ngOnInit() {
  }
  
  
  
  displayChordSheets(){
    
    
    this.http.get("https://se3316a-jngo42.c9users.io/api/chordsheets")
      .toPromise()
      .then(
        response => this.populateChordSheetLists(response.json())
        )
      .catch(this.handleError);
    
  }
  
  
  populateChordSheetLists(chordSheets){
    
   var counter = 0;
    var j = this.nextPageCounter;
    for(let i = this.chordSheetCounter; i < j && i < chordSheets.length; i++){
      console.log(chordSheets[i].isVisible);
      if(chordSheets[i].isVisible){
        this.titleList[counter] = chordSheets[i].title;
        this.userList[counter] = chordSheets[i].email;
        this.versionList[counter] = chordSheets[i].version;
        console.log(counter);
        counter++;
      }
      else{
        this.subtractLength++;
        this.chordSheetCounter++;
        this.nextPageCounter++;
        j = this.nextPageCounter;
      }
    }
    this.chordSheetLength = chordSheets.length;
  }
  
  
  
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
  
  
  clearTiles(){
    for(let i = 0; i < this.userList.length; i++){
      this.titleList[i] = null;
      this.userList[i] = null;
      this.versionList[i] = null;
    }
  }
  
  
  previousPage(){

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
    this.displayChordSheets();
    this.subtractLength = 9;
  }
  
  nextPage(){

    if(this.chordSheetLength > this.nextPageCounter){
      this.chordSheetCounter = this.chordSheetCounter + 9;
      this.nextPageCounter  =  this.nextPageCounter + 9;
    }

    this.clearTiles();
    this.displayChordSheets();
    
  }
  
  openViewer(divNum){
    if(this.titleList[divNum] != undefined){
      this.currentChordSheetService.openChordSheetViewer(this.userList[divNum], this.titleList[divNum], this.versionList[divNum]);
    }
  }
  
  loginPage(){
    this.router.navigate(['login']);
  }
  
  registerPage(){
    this.router.navigate(['registeruser']);
  }

}
