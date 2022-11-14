import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-create-assingement',
  templateUrl: './create-assingement.component.html',
  styleUrls: ['./create-assingement.component.css']
})
export class CreateAssingementComponent implements OnInit {

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }
  Submit(CreateAssi: NgForm) {
    this.http.put('http://localhost:8089/Subject/Update/'+localStorage.getItem("SubId"), CreateAssi)
      .subscribe((result) => {
      })
    window.location.reload();

  }
}
