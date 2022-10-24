import {HttpClient} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {AuthService} from "../_services/auth.service";
import {UsernameService} from "../_services/username.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";


@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {


constructor( private http:HttpClient,private userNameService: UsernameService, private router: Router,){}
  myObj:any
name:any
  public firstName: String | undefined;
  public fullName: String | undefined;
  public lastName: String | undefined;
  public username: String | undefined;
  public age: String | undefined;
  public birthDate: String | undefined;
  public address: String | undefined;
  public tp: String | undefined;
  public  ShowInputFields = false
  public  HideDetails = true




  ngOnInit(): void { console.log("printing the username found from token = "+this.userNameService.getUserName())
const username = this.userNameService.getUserName()
    this.http
      .get("http://localhost:8089/student/"+username)
      .subscribe(response=> {
              this.name = JSON.stringify(response);
         this.myObj = JSON.parse(this.name);
         this.firstName = this.myObj.firstName
        this.fullName = this.myObj.fullName
        this.lastName = this.myObj.lastName
        this.username = this.myObj.username
        this.birthDate = this.myObj.birthDate
        this.tp = this.myObj.tp
        this.address = this.myObj.address
        this.age = this.myObj.age
              console.log("Printing student = "+this.myObj.firstName)    });




  }

  LoadEdit(){
    this.ShowInputFields = true;
    this.HideDetails = false;
  }
  Update(UpdateData: NgForm) {
    //console.log("Modified = "+UpdateData.firstName)
    this.http.put('http://localhost:8089/student/'+this.username, UpdateData)

  .subscribe((result) => {
    console.warn("result", result)                ////remove
  })




      //console.log('http://localhost:8089/student/'+this.username)
    window.location.reload();

  }
}
