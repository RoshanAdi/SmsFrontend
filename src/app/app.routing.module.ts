import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";

import { BrowserModule } from '@angular/platform-browser';



import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {StudRegComponent} from "./stud-reg/stud-reg.component";
import {LoginComponent} from "./login/login.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { SuccessNoticeComponent } from './success-notice/success-notice.component';
import { VerifiedNoticeComponent } from './verified-notice/verified-notice.component';
import { FailedNoticeComponent } from './failed-notice/failed-notice.component';
import {StudentDetailsComponent} from "./student-details/student-details.component";
import {AuthInterceptor} from "./_helpers/auth.interceptor";
import {TeacherRegistrationComponent} from "./teacher-registration/teacher-registration.component";






const routes: Routes=[
 {path:'verify',component:SuccessNoticeComponent},
 {path:'Student',component:StudRegComponent},
  {path:'Login',component:LoginComponent},
  {path:'regSuccess',component:VerifiedNoticeComponent},
  {path:'regFail',component:FailedNoticeComponent},
  {path:'StudentDetails',component:StudentDetailsComponent},
  {path:'Teacher',component:TeacherRegistrationComponent},



];

@NgModule({
  declarations: [StudRegComponent,LoginComponent, SuccessNoticeComponent, VerifiedNoticeComponent,FailedNoticeComponent,StudentDetailsComponent,TeacherRegistrationComponent,],
  imports: [CommonModule, RouterModule.forRoot(routes), BrowserModule, FormsModule,HttpClientModule,
    ReactiveFormsModule,],

  exports: [RouterModule,StudRegComponent,LoginComponent,SuccessNoticeComponent,VerifiedNoticeComponent,FailedNoticeComponent,StudentDetailsComponent,TeacherRegistrationComponent,]
})
export class AppRoutingModule { }
