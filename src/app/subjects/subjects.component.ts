import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {
 public name: any;
  public myObj: any;
  public name1: any;
  public myObj1: any;
  public showSubjectList: boolean = true;
  public  showSelectedSubject:boolean = false;
  public subjectId!: number;
  public showCreateAssign: boolean = false;
  public showButton: boolean = false;
  public showUpdateInputField: boolean = false;
  public showUpdateAssignmentFields: boolean = false;
  public currentAssignmentId:number = 0;
  public showAddAssignmentButton:boolean = false;



  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.http
      .get("http://localhost:8089/Subject/List")
      .subscribe(response=> {
        this.name = JSON.stringify(response);
        this.myObj = JSON.parse(this.name);


})
    this.showSubjectList = true;
    this.showSelectedSubject = false;

  }
load(id: any){

  this.http
    .get("http://localhost:8089/Subject/"+id)
    .subscribe(response=> {
      this.name1 = JSON.stringify(response);
      this.myObj1 = JSON.parse(this.name1);
      })
  this.showSubjectList = false;
  this.showSelectedSubject = true;
  this.subjectId = id;
  this.showAddAssignmentButton = true;



}
  Submit(CreateAssi: NgForm) {
    console.log(CreateAssi)                                            /// delete
    this.http.put('http://localhost:8089/Subject/Update/'+this.subjectId, CreateAssi)
      .subscribe((result) => {
        console.warn("result", result)                ////remove
      })
    window.location.reload();
    //this.router.navigate(['/Subjects']);


  }
  loadCreateAssi(){
    this.showCreateAssign = true;
 this.showAddAssignmentButton = false;

  }
  reload(){
    window.location.reload();

 }
  editSub(data : NgForm){

    this.http.put('http://localhost:8089/Subject/edit/'+this.subjectId, data)
      .subscribe((result) => {
        console.warn("result", result)
      })
    window.location.reload();



  }
  showInputFields(){
    this.showUpdateInputField = true;
  }
  editAssi(data: NgForm){
    this.http.put('http://localhost:8089/Assignment/edit/'+this.currentAssignmentId, data)
      .subscribe((result) => {
        console.warn("result", result)
      })
    window.location.reload();



  }
  showUpdateFieldsAssi(currentId:number){
    this.showUpdateAssignmentFields = true;
    this.currentAssignmentId = currentId;
  }
}


