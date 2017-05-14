import { Injectable } from '@angular/core';
import {Router, Routes} from '@angular/router';

@Injectable()
export class UserCurrentChordSheetService {

    chordSheetTitle;
    chordSheetVersion;
    chordString;
    update;
    

  constructor(private router:Router) { }
  
  
  openUserChordSheet(title, version, date){
    this.chordSheetTitle = title;
    this.chordSheetVersion = version;
    
    this.router.navigate(['usercurrentchordsheet']);
  }
  
  getChordSheetVersion(){
    return this.chordSheetVersion;
  }
  
  
  getChordSheetTitle(){
    return this.chordSheetTitle;
  }
  
  getChordSheetString(){
    return this.chordString;
  }
  
  getUpdateStatus(){
    return this.update;
  }
  
  setUpdateStatus(status){
    this.update = status;
  }
  
  openUpdateChordSheet(updateStatus, _chordString){
    this.chordString = _chordString;
    this.update = updateStatus;
    this.router.navigate(['createchordsheet']);
  }

}



