import {Component, ElementRef, Inject, LOCALE_ID, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UsernameService} from "../../JwtTokenSetup/_services/username.service";
import {NgForm} from "@angular/forms";
import {dateTimestampProvider} from "rxjs/internal/scheduler/dateTimestampProvider";
import {formatDate, getLocaleDateFormat} from "@angular/common";
import {Router} from "@angular/router";

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
  public mcqs: any;
  public marksToCheckAttempt: any;
  public marks: any;
  public startTime:any;
  private MarksArray: any;
  public StartTime:any
  public EndTime:any
  public currentTime: any;
  public counter: any;
  public fileLength: any;
  constructor(private router: Router,private http:HttpClient,private userNameService: UsernameService,@Inject(LOCALE_ID) private locale: string) { }

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
        this.fileLength = JSON.stringify(this.savedFiles)
        this.mcqList = this.assignment4Mcq.mcqList



        this.AssignmentId = assigmentID

      })
    this.http
      .get("http://localhost:8089/marks/"+this.username+assigmentID.toString())
      .subscribe(response=> {
        if(response==null){this.showSelectedSubject =false
          this.showAssignmentContent = true
          alert("Your First Attempt!")
          this.startTimer()
        }
        else {
      this.marksToCheckAttempt = JSON.parse(JSON.stringify(response));
        if (this.marksToCheckAttempt.attempt<=Number(this.assignment4Mcq.noOfAttempts)){
        this.showSelectedSubject =false
        this.showAssignmentContent = true
        alert("Attempt "+ this.marksToCheckAttempt.attempt+". Only "+ this.assignment4Mcq.noOfAttempts+" attempts are allowed!.")
           this.startTimer()  }
      else {alert("Only "+ this.assignment4Mcq.noOfAttempts+" attempts are allowed!. You have already attended"+this.assignment4Mcq.noOfAttempts+" times")
        this.showAssignmentContent = false}}
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
    this.mcqs = mcq.value;
    this.marks = 0
    Object.entries(this.mcqs).forEach(([mcq, mcqvalue], index1) => {
      Object.entries(this.mcqList).forEach(([keyy, value], index2) => {
        Object.entries(value).forEach(([key, valuee], index) => {

        if(key==="ans1"&& mcqvalue==="1" && valuee===true && index1==index2){this.marks = this.marks+1; console.error("key = "+key+" value = "+valuee+" mcqvalue = "+mcqvalue);console.warn(this.marks)}
          if(key==="ans2"&& mcqvalue==="2" && valuee===true && index1==index2){this.marks = this.marks+1; console.error("key = "+key+" value = "+valuee+" mcqvalue = "+mcqvalue);console.warn(this.marks)}
          if(key==="ans3"&& mcqvalue==="3" && valuee===true && index1==index2){this.marks = this.marks+1; console.error("key = "+key+" value = "+valuee+" mcqvalue = "+mcqvalue);console.warn(this.marks)}
          if(key==="ans4"&& mcqvalue==="4" && valuee===true && index1==index2){this.marks = this.marks+1 ;console.error("key = "+key+" value = "+valuee+" mcqvalue = "+mcqvalue);console.warn(this.marks)}
          if(key==="ans5"&& mcqvalue==="5" && valuee===true && index1==index2){this.marks = this.marks+1; console.error("key = "+key+" value = "+valuee+" mcqvalue = "+mcqvalue);console.warn(this.marks)}
          if(key==="ans6"&& mcqvalue==="6" && valuee===true && index1==index2){this.marks = this.marks+1; console.error("key = "+key+" value = "+valuee+" mcqvalue = "+mcqvalue);console.warn(this.marks)}
        });});});
    this.MarksArray = {"marks":this.marks.toString()+"/"+this.mcqList.length.toString(),"marksupdateId":this.username+this.AssignmentId}
    localStorage.setItem("marks",this.marks.toString()+"/"+this.mcqList.length.toString() )
    this.http.put('http://localhost:8089/marks/'+this.AssignmentId+'/'+this.username,this.MarksArray)
      .subscribe((result) => {

      })

    this.router.navigate(['/showMarks']);
  }

  checkDate(startTime:string,endTime:string,assigmentID:number){
    let Start = new Date(startTime).getTime()
    let End = new Date(endTime).getTime()
    let CurrentTime = new Date().getTime()
this.StartTime = Start
    this.EndTime = End
    this.currentTime = CurrentTime

return CurrentTime >= Start && CurrentTime <= End

  }
  public timeLeft: any;
  public interval: string | number | NodeJS.Timer | undefined;
  @ViewChild('myButton') myButton : any


  startTimer() {
    this.timeLeft = Number(this.EndTime - this.currentTime)/(1000)

    this.interval = setInterval(() => {
      this.counter = new Date((this.timeLeft) * 1000).toISOString().substring(11, 19)
      if(100<this.EndTime && this.EndTime <=this.currentTime){
               let el: HTMLElement = this.myButton.nativeElement as HTMLElement;
        el.click()
        clearInterval(this.interval);

      }

else {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      }

      else { let el: HTMLElement = this.myButton.nativeElement as HTMLElement;
        el.click()
        clearInterval(this.interval);
      }}
    },1000)
  }


}
