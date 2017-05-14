import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {DisplayChordSheetsComponent} from './display-chord-sheets/display-chord-sheets.component';
import {DisplayCurrentChordSheetComponent} from './display-current-chord-sheet/display-current-chord-sheet.component';
import {DisplayUserChordSheetsComponent} from './display-user-chord-sheets/display-user-chord-sheets.component';
import {UserCurrentChordSheetComponent} from './user-current-chord-sheet/user-current-chord-sheet.component';
import {SecurityComponent} from './security/security.component';
import {DMCATakedownPolicyComponent} from './dmcatakedown-policy/dmcatakedown-policy.component';
import {CreateChordSheetComponent} from './create-chord-sheet/create-chord-sheet.component';
import {RegisterUserComponent} from './register-user/register-user.component';

export const router: Routes = [
    
    {path: '', component: DisplayChordSheetsComponent},
    {path: 'login', component: LoginComponent},
    {path: 'apper', component: AppComponent},
    {path: 'profile', component: UserProfileComponent},
    {path: 'currentChordSheet', component: DisplayCurrentChordSheetComponent},
    {path: 'userchordsheets', component: DisplayUserChordSheetsComponent},
    {path: 'usercurrentchordsheet', component: UserCurrentChordSheetComponent},
    {path: 'securitypolicy', component: SecurityComponent},
    {path: 'dmcatakedown', component: DMCATakedownPolicyComponent},
    {path: 'createchordsheet', component: CreateChordSheetComponent},
    {path: 'registeruser', component: RegisterUserComponent}
    
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
    
    