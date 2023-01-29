import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-teacher-registration',
  templateUrl: './teacher-registration.component.html',
  styleUrls: ['./teacher-registration.component.css']
})
export class TeacherRegistrationComponent implements OnInit {
  public URL:string="http://localhost:8089/"
  StudentAge: string | undefined
  status: boolean | undefined;


  constructor(private http:HttpClient,private router: Router, ) { }

  ngOnInit(): void {
  }

  VerifyPasswords() {
    // @ts-ignore
    if (document.getElementById('StudentPassword').value == document.getElementById('RepeatPw').value) {
      // @ts-ignore
      document.getElementById('message').style.color = 'green';
      // @ts-ignore
      document.getElementById('message').innerHTML = '  Matching';
      this.status = false
    } else {
      // @ts-ignore
      document.getElementById('message').style.color = 'red';
      // @ts-ignore
      document.getElementById('message').innerHTML = '  Not matching';
      this.status = true
    }
  }


  Submit(TeacherRegData: NgForm) {
    console.log(TeacherRegData)                                            /// delete
    this.http.post(this.URL+'teacher/register', TeacherRegData)
      .subscribe((result) => {
        console.warn("result", result)                ////remove
      })
    this.router.navigate(['/verify']);


  }
}


