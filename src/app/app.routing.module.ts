import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";

import { BrowserModule } from '@angular/platform-browser';



import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {StudRegComponent} from "./UserRegistraion/stud-reg/stud-reg.component";
import {LoginComponent} from "./login/login.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { SuccessNoticeComponent } from './UserRegistraion/success-notice/success-notice.component';
import { VerifiedNoticeComponent } from './UserRegistraion/verified-notice/verified-notice.component';
import { FailedNoticeComponent } from './UserRegistraion/failed-notice/failed-notice.component';
import {StudentDetailsComponent} from "./student-details/student-details.component";
import {AuthInterceptor} from "./JwtTokenSetup/_helpers/auth.interceptor";
import {TeacherRegistrationComponent} from "./UserRegistraion/teacher-registration/teacher-registration.component";
import {CreateSubjectComponent} from "./subjects/CreateSubject/create-subject.component";
import {SubjectsComponent} from "./subjects/subjects.component";
import {FileUploadModule} from "ng2-file-upload";
import {NgxWebstorageModule} from "ngx-webstorage";
import {FileUploadComponent} from "./subjects/file-upload/file-upload.component";
import {McqComponent} from "./subjects/mcq/mcq.component";
import {CreateAssingementComponent} from "./subjects/create-assingement/create-assingement.component";
import {SubjectsStudentViewComponent} from "./subjects/subjects-student-view/subjects-student-view.component";
import {ShowMarksComponent} from "./subjects/show-marks/show-marks.component";








const routes: Routes=[
 {path:'verify',component:SuccessNoticeComponent},
 {path:'Student',component:StudRegComponent},
  {path:'Login',component:LoginComponent},
  {path:'regSuccess',component:VerifiedNoticeComponent},
  {path:'regFail',component:FailedNoticeComponent},
  {path:'StudentDetails',component:StudentDetailsComponent},
  {path:'Teacher',component:TeacherRegistrationComponent},
  {path:'Subjects',component:SubjectsComponent},
  {path:'Subjects/create',component:CreateSubjectComponent},
  {path:'Subject/view',component:SubjectsStudentViewComponent},
  {path:'showMarks',component:ShowMarksComponent},




];

@NgModule({
  declarations: [StudRegComponent,LoginComponent, SuccessNoticeComponent, VerifiedNoticeComponent,FailedNoticeComponent,StudentDetailsComponent,TeacherRegistrationComponent,CreateSubjectComponent,SubjectsComponent,FileUploadComponent,McqComponent,CreateAssingementComponent,SubjectsStudentViewComponent,ShowMarksComponent],
  imports: [CommonModule, RouterModule.forRoot(routes), BrowserModule, FormsModule,HttpClientModule,
    ReactiveFormsModule,FileUploadModule,NgxWebstorageModule.forRoot(),],

  exports: [RouterModule,StudRegComponent,LoginComponent,SuccessNoticeComponent,VerifiedNoticeComponent,FailedNoticeComponent,StudentDetailsComponent,TeacherRegistrationComponent,CreateSubjectComponent,SubjectsComponent,FileUploadComponent,McqComponent,CreateAssingementComponent,SubjectsStudentViewComponent,ShowMarksComponent]
})
export class AppRoutingModule { }
