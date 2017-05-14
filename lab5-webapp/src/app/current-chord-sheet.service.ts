import { Injectable } from '@angular/core';
import {Router, Routes} from '@angular/router';
import { Headers, Http, RequestOptions, Response } from '@angular/http';

import {Observable} from 'rxjs/Rx';

import 'rxjs/Rx';

import {DisplayCurrentChordSheetComponent} from './display-current-chord-sheet/display-current-chord-sheet.component';

@Injectable()
export class CurrentChordSheetService {
    
    userEmail;
    chordSheetTitle;
    version;
    
    constructor(private router: Router, private http:Http) {
        
    }
    
    openChordSheetViewer(email, title, _version){
        this.userEmail = email;
        this.chordSheetTitle = title;
        this.version = _version;
        this.router.navigate(['currentChordSheet']);
        console.log("routing");
    }
    
    
    
    getUserEmail(){
        return this.userEmail;
    }
    
    getChordSheetTitle(){
        return this.chordSheetTitle;
    }
    
    getVersion(){
      return this.version;
    }
    
    
    displayChordSheet(chordSheet){
        
        var sheetString = chordSheet[0].chordString;
        var chordString = "";
        var lyricString = "";
        var finalChordString = "";
        
        var chordDetected = false;
        var skipSpace = false;
        
        for(let i = 0; i < sheetString.length; i++){
          
          if(sheetString.charCodeAt(i) == 91){
            chordDetected = true;
            continue;
          }
          
          if(sheetString.charCodeAt(i) == 93){
            continue;
          }
          
          if(sheetString.charCodeAt(i) == 126){
            finalChordString = finalChordString + "\n" + chordString + "\n" + lyricString;
            chordString = "";
            lyricString = "";
            continue;
          }
          
          if(chordDetected){
            chordString = chordString + sheetString[i];
            skipSpace = true;
            chordDetected = false;
          }
          else{
            if(!skipSpace){
              chordString = chordString + " "; 
            }
            skipSpace = false;
           lyricString = lyricString + sheetString[i];
          }
          
        }//end for
        
        finalChordString = finalChordString + "\n" + chordString + "\n" + lyricString;
        return finalChordString;
    
  }
    
    

}
