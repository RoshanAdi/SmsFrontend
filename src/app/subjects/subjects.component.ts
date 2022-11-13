import {Component, Input, OnInit} from '@angular/core';
import {HttpClient, HttpEventType} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import jwt_decode from "jwt-decode";
import {UsernameService} from "../JwtTokenSetup/_services/username.service";
const USER_KEY = 'auth-user';


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
  public showUpdateInputField: boolean = false;
  public showUpdateAssignmentFields: boolean = false;
  public currentAssignmentId:number = 0;
  public showAddAssignmentButton:boolean = false;
  public showMcqCreate:boolean = false;
  public ShowAssiUpdateFields:boolean=false;
public AssignmentIdForMcq:number=0;
  public mcqList: any[] = [];
  public username:any
  CurrentNameObj:any
 currentName:any
  public subjects:any[]=[]
  public TeacherEnrolledSubjects:any[]=[]
  public firstName: String | undefined;
   currentUser: any;
   public HideTeacherEnrollButton:boolean = true

  @Input()
  requiredFileType: string | undefined;
  public showFileUploadField:boolean = false;
  public blob:any;

public fileDBList:any[]=[]

  constructor(private http:HttpClient,private userNameService: UsernameService) {

  }

  ngOnInit(): void {
    this.http
      .get("http://localhost:8089/Subject/List")
      .subscribe(response => {
        this.name = JSON.stringify(response);
        this.myObj = JSON.parse(this.name);

      })
    this.showSubjectList = true;
    this.showSelectedSubject = false;

    const user = window.sessionStorage.getItem(USER_KEY);  //taking the current user to allow accessing subjects if this current user has created the subject. otherwise user need to enroll
    this.currentUser = jwt_decode(String(user));
    let Role = String(this.currentUser.roles)
    this.username = this.userNameService.getUserName()
    this.http
      .get("http://localhost:8089/"+Role.slice(5, )+"/"+this.username)
      .subscribe(response=> {
        this.currentName = JSON.stringify(response);
        this.CurrentNameObj = JSON.parse(this.currentName);
        this.firstName = this.CurrentNameObj.firstName
        this.subjects = this.CurrentNameObj.subjects
        this.TeacherSubjects()
      });


  }

loadSubject(id: any){
  this.http
    .get("http://localhost:8089/Subject/"+id)
    .subscribe(response=> {
      this.name1 = JSON.stringify(response);
      this.myObj1 = JSON.parse(this.name1);

      })
  this.showSubjectList = false;
  this.showSelectedSubject = true;
  this.subjectId = id;
  localStorage.setItem("SubId",String(this.subjectId))
  this.showAddAssignmentButton = true;

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
  deleteAssi(id:number){
    this.http.delete('http://localhost:8089/Assignment/delete/'+id)
      .subscribe((result) => {
        console.warn("result", result)
      })
    window.location.reload();

  }
  deleteSub(id:number){
    this.http.delete('http://localhost:8089/Subject/delete/'+id)
      .subscribe((result) => {
        console.warn("result", result)
      })
    window.location.reload();
  }
  showUpdateFieldsAssi(currentId:number){

    this.showUpdateAssignmentFields = true;
    this.currentAssignmentId = currentId;
    this.showAddAssignmentButton = false;
    localStorage.setItem("AssiId", String(this.currentAssignmentId))
  }
  showMcq(id:number){
    this.showMcqCreate = true
    this.AssignmentIdForMcq = id;
    this.showFileUploadField = false
  }


  showFileUploadFields(){
    this.showFileUploadField = true;
    this.showMcqCreate = false

  }
  showAssiUpdateFields(){
    this.ShowAssiUpdateFields=true;

  }
  EnrollTeacher(id:number){
    this.http.put('http://localhost:8089/Teacher/Enroll/'+id,id)
      .subscribe((result) => {
        console.warn("result", result)

      })
    window.location.reload()
  }
  checkTeacher(createdBy:String,subId:number){
  if (this.TeacherEnrolledSubjects.includes(subId)){return false}
  else { return createdBy != this.username;}

  }
TeacherSubjects(){
  Object.entries(this.subjects).forEach(([key, value], index) => {
    Object.entries(value).forEach(([key, value], index) => {
      if(key=="subjectId"){this.TeacherEnrolledSubjects.push(value)}});});
 return this.TeacherEnrolledSubjects
}
  EnrollButton(subId:number){
    if (this.TeacherEnrolledSubjects.includes(subId)){return false}
else {return true}
  }
}


