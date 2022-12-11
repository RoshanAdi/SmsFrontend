import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../JwtTokenSetup/_services/auth.service";
import {TokenStorageService} from "../JwtTokenSetup/_services/token-storage.service";
import {Router} from "@angular/router";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = 'i dont know';
  constructor(private http:HttpClient,private authService: AuthService, private tokenStorage: TokenStorageService,private router: Router,) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;

    }
  }
  SubmitLogin(LoginData: NgForm) {
    console.log("username pawrd = "+LoginData)
    this.authService.login(LoginData)
      .subscribe(
        token => {
          console.log("token received from login = "+token.token)
          this.tokenStorage.saveToken(token.token);
          this.tokenStorage.saveRefreshToken(token.token);
          this.tokenStorage.saveUser(token);
          console.log("token received from login = "+token.token)
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.redirect();

        },
        err => {
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        }
      );
  }
  redirect(){
    this.router.navigate(['/StudentDetails']);
  }

  }

