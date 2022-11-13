import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import jwt_decode from "jwt-decode";
import {UsernameService} from "../../JwtTokenSetup/_services/username.service";
const USER_KEY = 'auth-user';
@Component({
  selector: 'app-subject',
  templateUrl: './create-subject.component.html',
  styleUrls: ['./create-subject.component.css']
})
export class CreateSubjectComponent implements OnInit {
  currentUser: any;
  public username:any;
  CurrentNameObj:any
  currentName:any
  public firstName: String | undefined;
  constructor(private http:HttpClient,private router: Router,private userNameService: UsernameService) { }

  ngOnInit(): void {     const user = window.sessionStorage.getItem(USER_KEY);
    this.currentUser = jwt_decode(String(user));
    this.username = this.userNameService.getUserName()
    console.error(this.username)
    this.http
      .get("http://localhost:8089/Teacher/"+this.username)
      .subscribe(response=> {
        this.currentName = JSON.stringify(response);
        this.CurrentNameObj = JSON.parse(this.currentName);
        this.firstName = this.CurrentNameObj.firstName });
    console.error(this.firstName)
  }
  Submit(CreateSub: NgForm) {
    console.log(CreateSub)                                            /// delete
    this.http.post('http://localhost:8089/Subject/Create', CreateSub)
      .subscribe((result) => {
        console.warn("result", result)                ////remove
      })
    this.router.navigate(['/Subjects']);


  }
}
