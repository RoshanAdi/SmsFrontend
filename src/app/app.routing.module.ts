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
import {StudentDetailsComponent} from "./student-teacher-profile/student-details.component";
import {AuthInterceptor} from "./JwtTokenSetup/_helpers/auth.interceptor";
import {TeacherRegistrationComponent} from "./UserRegistraion/teacher-registration/teacher-registration.component";
import {CreateSubjectComponent} from "./subjects/CreateSubject/create-subject.component";
import {SubjectsComponent} from "./subjects/subjects.component";
import {FileUploadModule} from "ng2-file-upload";
import {NgxWebstorageModule} from "ngx-webstorage";
import {FileUploadComponent} from "./subjects/Teacher-file-upload/file-upload.component";
import {McqComponent} from "./subjects/mcq/mcq.component";
import {CreateAssingementComponent} from "./subjects/create-assingement/create-assingement.component";
import {SubjectsStudentViewComponent} from "./subjects/subjects-student-view/subjects-student-view.component";

import {EssayQuestionComponent} from "./subjects/essay-question-creation/essay-question.component";
import {GradingAnswersComponent} from "./subjects/grading-answers/grading-answers.component";
import {StudentFileUploadComponent} from "./subjects/student-file-upload/student-file-upload.component";
import {SubjectMarksComponent} from "./subject-marks/subject-marks.component";
import {ReportComponent} from "./report/report.component";
import {NgChartsModule} from "ng2-charts";
import {MatDividerModule} from "@angular/material/divider";
import {MatButtonModule} from "@angular/material/button";









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
  {path:'Submissions',component:GradingAnswersComponent},
  {path:'Subject/Marks',component:SubjectMarksComponent},
  {path:'Reports',component:ReportComponent},






];

@NgModule({
  declarations: [StudRegComponent,LoginComponent, SuccessNoticeComponent, VerifiedNoticeComponent,FailedNoticeComponent,StudentDetailsComponent,TeacherRegistrationComponent,CreateSubjectComponent,SubjectsComponent,FileUploadComponent,McqComponent,CreateAssingementComponent,SubjectsStudentViewComponent,EssayQuestionComponent,GradingAnswersComponent,StudentFileUploadComponent,SubjectMarksComponent,ReportComponent],
  imports: [CommonModule, RouterModule.forRoot(routes), BrowserModule, FormsModule, HttpClientModule,
    ReactiveFormsModule, FileUploadModule, NgxWebstorageModule.forRoot(), NgChartsModule, MatDividerModule, MatButtonModule],

  exports: [RouterModule,StudRegComponent,LoginComponent,SuccessNoticeComponent,VerifiedNoticeComponent,FailedNoticeComponent,StudentDetailsComponent,TeacherRegistrationComponent,CreateSubjectComponent,SubjectsComponent,FileUploadComponent,McqComponent,CreateAssingementComponent,SubjectsStudentViewComponent,EssayQuestionComponent,GradingAnswersComponent,StudentFileUploadComponent,SubjectMarksComponent,ReportComponent, NgChartsModule]
})
export class AppRoutingModule { }
