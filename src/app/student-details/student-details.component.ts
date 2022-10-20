import {HttpClient} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {AuthService} from "../_services/auth.service";
import {UsernameService} from "../_services/username.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {


constructor( private http:HttpClient,private userNameService: UsernameService){}
  myObj:any
name:any
  public firstname: String | undefined;


  ngOnInit(): void { console.log("printing the username found from token = "+this.userNameService.getUserName())
const username = this.userNameService.getUserName()
    this.http
      .get("http://localhost:8089/student/"+username)
      .subscribe(response=> {
              this.name = JSON.stringify(response);
         this.myObj = JSON.parse(this.name);
         this.firstname = this.myObj.firstName
              console.log("Printing student = "+this.myObj.firstName)    });




  }



}
