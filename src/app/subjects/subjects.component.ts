import {Component, Input, OnInit} from '@angular/core';
import {HttpClient, HttpEventType} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {finalize, Observable, Subscription} from "rxjs";
import {FileUploader} from "ng2-file-upload";
import {TokenStorageService} from "../_services/token-storage.service";
import {addWarning} from "@angular-devkit/build-angular/src/utils/webpack-diagnostics";
import {LocalStorageService} from "ngx-webstorage";


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
  public Assignment4Mcq:any;
  public assignment4Mcq:any;
  public showSubjectList: boolean = true;
  public  showSelectedSubject:boolean = false;
  public subjectId!: number;
  public showCreateAssign: boolean = false;
  public showButton: boolean = false;
  public showUpdateInputField: boolean = false;
  public showUpdateAssignmentFields: boolean = false;
  public currentAssignmentId:number = 0;
  public showAddAssignmentButton:boolean = false;
  public showMcqCreate:boolean = false;
public AssignmentIdForMcq:number=0;
  public showSavedMcq:boolean= false;
  public mcqList: any[] = [];
  public immediateMcq:any[]=[];
  @Input()
  requiredFileType: string | undefined;
  public showFileUploadField:boolean = false;
  public blob:any;
  public formData = new FormData();
  ReqJson: any = {};



public fileDBList:any[]=[]
  public savedFiles:any[]=[]






  constructor(private http:HttpClient) {

  }

  /*uploader:
    FileUploader = new FileUploader(
    { url: "http://localhost:8089/files/upload/"+this.getAssiId(), authToken:"Bearer "+this.token.getToken(),additionalParameter: this.token, removeAfterUpload: true,  disableMultipart: false});
*/



  ngOnInit(): void {
    this.http
      .get("http://localhost:8089/Subject/List")
      .subscribe(response => {
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




  //adding assi id to obtain at file uploader


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
    this.http
      .get("http://localhost:8089/Assignment/"+this.currentAssignmentId)
      .subscribe(response=> {
        this.Assignment4Mcq = JSON.stringify(response);
        this.assignment4Mcq = JSON.parse(this.Assignment4Mcq);
        this.mcqList = this.assignment4Mcq.mcqList

      })
    this.showSavedMcq= true;
    localStorage.setItem("AssiId", String(this.currentAssignmentId))
  }
  showMcq(id:number){
    this.showMcqCreate = true
    this.AssignmentIdForMcq = id;
  }

  public choiceCount:number = 2;


  Choices: String[] = ["choice1","choice2"];



  submitMcq(value: NgForm): void {
    this.http.post('http://localhost:8089/Mcq/create/'+this.AssignmentIdForMcq, value.value)
      .subscribe((result) => {
        console.warn("result", result)                ////remove
      })
    this.immediateMcq = Object.entries(value)
    this.saveMcqLoad()
    value.reset()


  }

  reset(form:NgForm): void {
    this.Choices.splice(0,this.Choices.length)
    this.Choices.push("choice1","choice2")
    this.choiceCount = 2;
    form.reset();

  }
  addNewChoice(){

    this.choiceCount = this.choiceCount+1
    this.Choices.push("choice"+this.choiceCount)


  }
  saveMcqLoad(){
    this.http
      .get("http://localhost:8089/Assignment/"+this.AssignmentIdForMcq)
      .subscribe(response=> {
        this.Assignment4Mcq = JSON.stringify(response);
        this.assignment4Mcq = JSON.parse(this.Assignment4Mcq);
        this.mcqList = this.assignment4Mcq.mcqList
        this.mcqList.push(this.immediateMcq)
        console.warn(this.mcqList)
      })
this.showSavedMcq= true;
return this.mcqList;
  }
  DeleteMcq(id:number){
    this.http.delete('http://localhost:8089/Mcq/delete/'+id)
      .subscribe((result) => {
        console.warn("result", result)
      })
    window.location.reload();
  }
  showFileUploadFields(){
    this.showFileUploadField = true;
  }
/*
  ShowUploadedFiles(){
    this.http
      .get("http://localhost:8089/Assignment/"+this.currentAssignmentId)
      .subscribe((data) => {
        this.savedFiles = JSON.parse(JSON.stringify(data)).fileDBList;
      });

  }
  downloadFile(id:string,fileName:string,fileType:string){
    this.http
      .get<Blob>("http://localhost:8089/files/download/"+id,{responseType: 'blob' as 'json'})
      .subscribe((data) => {

        this.blob = new Blob([data], {type: fileType});

        var downloadURL = window.URL.createObjectURL(data);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = fileName;
        link.click();

      });
  }

*/


}


