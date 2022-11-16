import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UsernameService} from "../../JwtTokenSetup/_services/username.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-subjects-student-view',
  templateUrl: './subjects-student-view.component.html',
  styleUrls: ['./subjects-student-view.component.css']
})
export class SubjectsStudentViewComponent implements OnInit {
  public CurrentSubject : any;
  public subjectList : any;
  public showSubjectList: boolean = true;
  public  showSelectedSubject:boolean = false;
  public subjectId!: number;
  public username:any
  CurrentNameObj:any
  currentName:any
  public subjects:any[]=[]
  public firstName: String | undefined;
  public StudentEnrolledSubjects:any[]=[]
  public assignment4Mcq:any;
  public mcqList: any[] = [];
  public showAssignmentContent: boolean = false;
  public savedFiles: any;
  public AssignmentId: number | undefined;
  private blob: any;
  constructor(private http:HttpClient,private userNameService: UsernameService) { }

  ngOnInit(): void {this.http
    .get("http://localhost:8089/Subject/List")
    .subscribe(response => {
      this.subjectList = JSON.parse(JSON.stringify(response));

    })
    this.showSubjectList = true;
    this.showSelectedSubject = false;

    this.username = this.userNameService.getUserName()
    this.http
      .get("http://localhost:8089/Student/Subjects/"+this.username)
      .subscribe(response=> {
        this.currentName = JSON.stringify(response);
        this.CurrentNameObj = JSON.parse(this.currentName);
        this.subjects = this.CurrentNameObj.subjects
        this.StudentSubjects()
      });

  }
  StudentSubjects(){
    Object.entries(this.subjects).forEach(([key, value], index) => {
      Object.entries(value).forEach(([key, value], index) => {
        if(key=="subjectId"){this.StudentEnrolledSubjects.push(value)}});});
    return this.StudentEnrolledSubjects
  }
  EnrollButton(subId:number){
    if (this.StudentEnrolledSubjects.includes(subId)){return false}
    else {return true}
  }
  EnrollStudent(id:number){
    this.http.put('http://localhost:8089/Student/Enroll/'+id,id)
      .subscribe((result) => {
        console.warn("result", result)

      })
    window.location.reload()
  }

  loadSubject(id: any){
    this.http
      .get("http://localhost:8089/Subject/"+id)
      .subscribe(response=> {
        this.CurrentSubject = JSON.parse(JSON.stringify(response));

      })

    this.showSubjectList = false;
    this.showSelectedSubject = true;
      this.subjectId = id;



  }
  checkStud(id:any){
    return !this.StudentEnrolledSubjects.includes(id);

  }
  reload(){
    window.location.reload();

  }
  ShowAssignmentContent(assigmentID:number){
    this.http
      .get("http://localhost:8089/Assignment/"+assigmentID)
      .subscribe(response=> {
        this.assignment4Mcq = JSON.parse(JSON.stringify(response));
        this.savedFiles = this.assignment4Mcq.fileDBList;
        this.mcqList = this.assignment4Mcq.mcqList
        this.showSelectedSubject =false
        this.showAssignmentContent = true
        this.AssignmentId = assigmentID

      })

    return this.assignment4Mcq;

  }

  downloadFiles(id: string, fileName: string, fileType: string) {
    this.http
      .get<Blob>("http://localhost:8089/files/download/" + id, {responseType: 'blob' as 'json'})
      .subscribe((data) => {

        this.blob = new Blob([data], {type: fileType});

        var downloadURL = window.URL.createObjectURL(data);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = fileName;
        link.click();

      });

  }

  submitMcq(mcq:NgForm){

  }
}
