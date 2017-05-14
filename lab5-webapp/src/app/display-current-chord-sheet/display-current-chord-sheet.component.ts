import { Component, OnInit } from '@angular/core';
import {CurrentChordSheetService} from '../current-chord-sheet.service';
import {Router, Routes} from '@angular/router';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
let chordpro = require('chordprojs');

import {Observable} from 'rxjs/Rx';

import 'rxjs/Rx';

@Component({
  selector: 'app-display-current-chord-sheet',
  templateUrl: './display-current-chord-sheet.component.html',
  styleUrls: ['./display-current-chord-sheet.component.css']
})
export class DisplayCurrentChordSheetComponent implements OnInit {
  
  currentChordSheetService;
  
  chordSheetEmail;
  chordSheetTitle;
  chordSheetVersion;
  chordSheetDate;
  chordStringFormatted;
  
  
  constructor(private router: Router, private http:Http, _currentChordSheetService: CurrentChordSheetService) {
    this.chordStringFormatted = "";
    this.currentChordSheetService = _currentChordSheetService;
    this.getUserChordSheet(this.currentChordSheetService.getUserEmail(), this.currentChordSheetService.getChordSheetTitle(), this.currentChordSheetService.getVersion());
    
  }

  ngOnInit() {}
  
  
  getUserChordSheet(email, title, version){
        
        let body = JSON.stringify({'email': email, 'title': title, 'version': version});
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option
        
        this.http.post("https://se3316a-jngo42.c9users.io/api/userchordsheet", body, options)
                         .map((res:Response) => res.json()) 
                         .catch(this.handleError).subscribe(data => this.setUpChordSheetView(data));
        
        
        
        
  }
  
    
    
    
  
  
  
  
  
  back(){
    this.router.navigate(['']);
  }
  
  setUpChordSheetView(chordSheet){
    this.chordSheetEmail = chordSheet[0].email;
    this.chordSheetTitle = chordSheet[0].title;
    this.chordSheetVersion = chordSheet[0].version;
    this.chordSheetDate = chordSheet[0].date;
    this.chordStringFormatted = chordpro.format(chordSheet[0].chordString);
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
