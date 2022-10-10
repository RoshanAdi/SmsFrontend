import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";

import { BrowserModule } from '@angular/platform-browser';



import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {StudRegComponent} from "./stud-reg/stud-reg.component";
import {LoginComponent} from "./login/login.component";
import {HttpClientModule} from "@angular/common/http";
import { SuccessNoticeComponent } from './success-notice/success-notice.component';
import { VerifiedNoticeComponent } from './verified-notice/verified-notice.component';
import { FailedNoticeComponent } from './failed-notice/failed-notice.component';


const routes: Routes=[
 {path:'verify',component:SuccessNoticeComponent},
 {path:'Student',component:StudRegComponent},
  {path:'Login',component:LoginComponent},
  {path:'regSuccess',component:VerifiedNoticeComponent},
  {path:'regFail',component:FailedNoticeComponent},

];

@NgModule({
  declarations: [StudRegComponent,LoginComponent, SuccessNoticeComponent, VerifiedNoticeComponent,FailedNoticeComponent,],
  imports: [CommonModule, RouterModule.forRoot(routes), BrowserModule, FormsModule,HttpClientModule,
    ReactiveFormsModule,],
  exports: [RouterModule,StudRegComponent,LoginComponent,SuccessNoticeComponent,VerifiedNoticeComponent,FailedNoticeComponent, ]
})
export class AppRoutingModule { }
