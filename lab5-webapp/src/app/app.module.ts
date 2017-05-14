import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {routes} from './app.router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CreateChordSheetComponent } from './create-chord-sheet/create-chord-sheet.component';
import { DisplayChordSheetsComponent } from './display-chord-sheets/display-chord-sheets.component';

import {LoginService} from './login.service';
import {CurrentChordSheetService} from './current-chord-sheet.service';
import {UserCurrentChordSheetService} from './user-current-chord-sheet.service';

import { DisplayCurrentChordSheetComponent } from './display-current-chord-sheet/display-current-chord-sheet.component';
import { DisplayUserChordSheetsComponent } from './display-user-chord-sheets/display-user-chord-sheets.component';
import { UserCurrentChordSheetComponent } from './user-current-chord-sheet/user-current-chord-sheet.component';
import { SecurityComponent } from './security/security.component';
import { DMCATakedownPolicyComponent } from './dmcatakedown-policy/dmcatakedown-policy.component';
import { RegisterUserComponent } from './register-user/register-user.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserProfileComponent,
    CreateChordSheetComponent,
    DisplayChordSheetsComponent,
    DisplayCurrentChordSheetComponent,
    DisplayUserChordSheetsComponent,
    UserCurrentChordSheetComponent,
    SecurityComponent,
    DMCATakedownPolicyComponent,
    RegisterUserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routes
  ],
  providers: [LoginService,CurrentChordSheetService, UserCurrentChordSheetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
