import { Component, OnInit } from '@angular/core';
import {Router, Routes} from '@angular/router';

@Component({
  selector: 'app-dmcatakedown-policy',
  templateUrl: './dmcatakedown-policy.component.html',
  styleUrls: ['./dmcatakedown-policy.component.css']
})
export class DMCATakedownPolicyComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  
  back(){
    this.router.navigate(['']);
  }

}
