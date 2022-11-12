import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-subject',
  templateUrl: './create-subject.component.html',
  styleUrls: ['./create-subject.component.css']
})
export class CreateSubjectComponent implements OnInit {

  constructor(private http:HttpClient,private router: Router,) { }

  ngOnInit(): void {
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
