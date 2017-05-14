import { Component, OnInit } from '@angular/core';
import {UserCurrentChordSheetService} from '../user-current-chord-sheet.service';
import {LoginService} from '../login.service';
import {Router, Routes} from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  
  userCurrentChordSheetService;

  constructor(loginService: LoginService, private router: Router, private _userCurrentChordSheetService:UserCurrentChordSheetService) { 
    console.log(loginService.isLogined());
    if(!loginService.isLogined()){
      this.router.navigate(['']);
    }
    console.log("user Component");
    
    this.userCurrentChordSheetService = _userCurrentChordSheetService;
    
    
  }//end constructor

  ngOnInit() {
  }
  
  
  OpenChordSheetView(){
    
  }
  
  publicChordSheetPage(){
    this.router.navigate(['']);
  }
  
  userChordSheetPage(){
    this.router.navigate(['userchordsheets']);
  }
  
  createChordSheetPage(){
    this.userCurrentChordSheetService.setUpdateStatus(false);
    this.router.navigate(['createchordsheet']);
    
  }

}
