import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stud-reg',
  templateUrl: './stud-reg.component.html',
  styleUrls: ['./stud-reg.component.css']
})
export class StudRegComponent implements OnInit {

  StudentAge: string | undefined
  status: boolean | undefined;

  constructor() { }

  ngOnInit(): void {
  }
 findAge()
  { // @ts-ignore
    var birthDay = document.getElementById("StudentDOB").value;
    var DOB = new Date(birthDay);
    var today = new Date();
    var age = today.getTime() - DOB.getTime();
    age = Math.floor(age / (1000 * 60 * 60 * 24 * 365.25));
    this.StudentAge = age+' years';
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


}
