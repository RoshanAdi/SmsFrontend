import {HttpClient} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {


constructor( private http:HttpClient){}
 details:any[] = [];

  ngOnInit(): void {
  }


  StudentDetails(){


    this.http
      .get("http://localhost:8089/student")
      .subscribe((details:any)=>{
     this.details = details });
    alert(JSON.stringify(this.details))

  }

}
