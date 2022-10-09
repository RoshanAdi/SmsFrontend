import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }
  SubmitLogin(LoginData: NgForm) {
    this.http.post('http://localhost:8080/login', LoginData)
      .subscribe((result) => {
        console.warn("result", result)
      })


  }
}
