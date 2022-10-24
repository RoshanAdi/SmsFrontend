import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import {AuthInterceptor} from "../_helpers/auth.interceptor";
import jwt_decode from "jwt-decode";
const USER_KEY = 'auth-user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  private decodedToken: any;


  constructor(private token: TokenStorageService) { }

  ngOnInit(): void {
    //this.decodedToken = jwt_decode(<string><unknown>this.token);
    //const Token = localStorage.getItem("TOKEN_KEY");
    //console.log("Token from local storage = "+Token)
    const user = window.sessionStorage.getItem(USER_KEY);
    console.log("getting user from getuser func = "+user)
    this.currentUser = jwt_decode(String(user));

    console.log("decoded token = "+this.currentUser.sub)


  }
}
