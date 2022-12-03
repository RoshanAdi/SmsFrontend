import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UsernameService} from "../JwtTokenSetup/_services/username.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-subject-marks',
  templateUrl: './subject-marks.component.html',
  styleUrls: ['./subject-marks.component.css']
})
export class SubjectMarksComponent implements OnInit {
  public CurrentSubject : any;
  public subjectList : any;
  public showSubjectList: boolean = true;
  public  showSelectedSubject:boolean = false;
  public subjectId:any;
  private username: any;
  public EnrolledSubjects: any;

  public studentList: any;
  public showStudentList: boolean=false;
  public Save: string = "Save";
  constructor(private http: HttpClient, private userNameService: UsernameService,) { }

  ngOnInit(): void {
    this.username = this.userNameService.getUserName()
    this.http
      .get("http://localhost:8089/Teacher/"+this.username)
      .subscribe(response=> {
        this.EnrolledSubjects = JSON.parse(JSON.stringify(response));
         this.subjectList = this.EnrolledSubjects.subjects
      });
    this.showSubjectList = true;

  }
  LoadStudentsList(subjectId:number){
    this.subjectId = subjectId
    this.showSubjectList = false
    this.showStudentList=true
    this.http
      .get("http://localhost:8089/Subject/SubjectMarks/"+subjectId)
      .subscribe(response=> {
        this.CurrentSubject = JSON.parse(JSON.stringify(response));
this.studentList=JSON.parse(JSON.stringify(response))?.students;
      })
  }

  submitMarks(Marks:NgForm){
    this.Save = "Saved!"
    let MarksParse=JSON.parse(JSON.stringify(Marks.value))
    this.http.post('http://localhost:8089/Subject/MarksSubmit/'+this.subjectId,JSON.stringify(MarksParse))
      .subscribe((result) => {

      })

  }


}
