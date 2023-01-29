import {HttpClient} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {AuthService} from "../JwtTokenSetup/_services/auth.service";
import {UsernameService} from "../JwtTokenSetup/_services/username.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {TokenStorageService} from "../JwtTokenSetup/_services/token-storage.service";
import jwt_decode from "jwt-decode";
import {ReportComponent} from "../report/report.component";
const USER_KEY = 'auth-user';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {
  public marks: any;


constructor(private tokenStorage: TokenStorageService,private http:HttpClient,private userNameService: UsernameService, ){}
  myObj:any
userDetails:any
  subjects:any
  public firstName: String | undefined;
  public fullName: String | undefined;
  public lastName: String | undefined;
  public username: String | undefined;
  public age: String | undefined;
  public birthDate: String | undefined;
  public address: String | undefined;
  public tp: String | undefined;
  public nIc: String | undefined;
  public role: String | undefined;
  public  ShowInputFields = false
  public  HideDetails = true
public StudentUser = false
  public TeacherUser = false
  currentUser: any;
public marksString:any
  public URL:string="http://localhost:8089/"

  ngOnInit(): void { console.log("printing the username found from token = "+this.userNameService.getUserName())
    const user = window.sessionStorage.getItem(USER_KEY);
    this.currentUser = jwt_decode(String(user));
    let Role = String(this.currentUser.roles)
        console.warn("role found on token = "+Role.slice(5, ))


    const username = this.userNameService.getUserName()
    this.http
      .get(this.URL+Role.slice(5, )+"/"+username)
      .subscribe(response=> {
              this.userDetails = JSON.stringify(response);
        console.error(JSON.stringify(response))
         this.myObj = JSON.parse(this.userDetails);
         this.firstName = this.myObj.firstName
        this.fullName = this.myObj.fullName
        this.lastName = this.myObj.lastName
        this.username = this.myObj.username
        this.role = this.myObj.role
        this.birthDate = this.myObj.birthDate
        this.tp = this.myObj.tp
        this.address = this.myObj.address
        this.age = this.myObj.age
        this.nIc = this.myObj.nIc
        this.subjects=this.myObj.subjects
        this.marks = this.myObj.marks
        this.marksString = JSON.stringify(this.marks)
              console.log("Printing student = "+this.myObj.firstName)    });

if (Role.slice(5, )=='Student'){
  this.StudentUser = true;
}
    if (Role.slice(5, )=='Teacher'){
      this.TeacherUser = true;
    }


  }

  LoadEdit(){
    this.ShowInputFields = true;
    this.HideDetails = false;
  }
  Update(UpdateData: NgForm) {
    const user = window.sessionStorage.getItem(USER_KEY);
    this.currentUser = jwt_decode(String(user));
    let Role = String(this.currentUser.roles)
    this.http.put(this.URL+Role.slice(5, )+'/'+this.username, UpdateData)

  .subscribe((result) => {
    console.warn("result", result)                ////remove
  })


    window.location.reload();

  }
  width(mark:string){
    var mySubString = mark.split("/",2)
   return ((Number(mySubString[0])/Number(mySubString[1]))*100)
  }
}
