import {Component, ElementRef, Inject, LOCALE_ID, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UsernameService} from "../../JwtTokenSetup/_services/username.service";
import {NgForm} from "@angular/forms";
import {dateTimestampProvider} from "rxjs/internal/scheduler/dateTimestampProvider";
import {formatDate, getLocaleDateFormat, KeyValue} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-subjects-student-view',
  templateUrl: './subjects-student-view.component.html',
  styleUrls: ['./subjects-student-view.component.css']
})
export class SubjectsStudentViewComponent implements OnInit {
  public URL:string="http://localhost:8089/"
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
  public days: any;
  constructor(private router: Router,private http:HttpClient,private userNameService: UsernameService,@Inject(LOCALE_ID) private locale: string) { }

  ngOnInit(): void {this.http
    .get(this.URL+"Subject/List")
    .subscribe(response => {
      this.subjectList = JSON.parse(JSON.stringify(response));

    })
    this.showSubjectList = true;
    this.showSelectedSubject = false;
    clearInterval(this.interval);
    this.username = this.userNameService.getUserName()
    localStorage.setItem("username",this.username)
    this.http
      .get(this.URL+"Student/Subjects/"+this.username)
      .subscribe(response=> {
        this.currentName = JSON.stringify(response);
        this.CurrentNameObj = JSON.parse(this.currentName);
        console.error(this.currentName)/*{this.CurrentNameObj.push(["subjects","null"])}*/
        if (this.CurrentNameObj.subjects==null){this.subjects.push("subjectId","null");this.StudentSubjects()}
        else {
        this.subjects = this.CurrentNameObj.subjects
        this.StudentSubjects()}
      });

  }
  StudentSubjects(){
    console.error(JSON.stringify(this.subjects))

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
    this.http.put(this.URL+'Student/Enroll/'+id,id)
      .subscribe((result) => {

      })
    window.location.reload()
  }

  loadSubject(id: any){
    this.http
      .get(this.URL+"Subject/"+id)
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
    clearInterval(this.interval);
  }
  ShowAssignmentContent(endTime:string,assigmentID:number){
    this.AssignmentId = assigmentID
    this.EndTime = endTime

    this.LoadEssay()
    this.http
      .get(this.URL+"Assignment/"+assigmentID)
      .subscribe(response=> {
               this.assignment4Mcq = JSON.parse(JSON.stringify(response));
        this.savedFiles = this.assignment4Mcq.fileDBList;
        localStorage.setItem("AssignmentID",String(assigmentID))
        this.fileLength = JSON.stringify(this.savedFiles)
        this.mcqList = this.assignment4Mcq.mcqList
this.startTimer()



      })

    this.http
      .get(this.URL+"marks/"+this.username+assigmentID.toString())
      .subscribe(response=> {
        if(response==null){this.showSelectedSubject =false
          this.showAssignmentContent = true
          alert("Your First Attempt!")
        }
        else {
      this.marksToCheckAttempt = JSON.parse(JSON.stringify(response));
        if (this.marksToCheckAttempt?.attempt<=Number(this.assignment4Mcq?.noOfAttempts)){
        this.showSelectedSubject =false
        this.showAssignmentContent = true
        alert("Attempt "+ this.marksToCheckAttempt?.attempt+". Only "+ this.assignment4Mcq?.noOfAttempts+" attempts are allowed!.")
 }
      else {alert("Only "+ this.assignment4Mcq?.noOfAttempts+" attempts are allowed!. You have already attended"+this.assignment4Mcq?.noOfAttempts+" times")
        this.showAssignmentContent = false}}
      })
    return this.assignment4Mcq;

  }

  downloadFiles(id: string, fileName: string, fileType: string) {
    this.http
      .get<Blob>(this.URL+"files/download/" + id, {responseType: 'blob' as 'json'})
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
    clearInterval(this.interval);
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
/*    localStorage.setItem("marks",this.marks.toString()+"/"+this.mcqList.length.toString() )*/
    this.http.put(this.URL+'marks/'+this.AssignmentId+'/'+this.username,this.MarksArray)
      .subscribe((result) => {

      })
alert("Marks = "+this.marks.toString()+"/"+this.mcqList.length.toString() )
    this.reload()
   /* this.router.navigate(['/showMarks']);*/
  }

  checkDate(startTime:string,endTime:string,assigmentID:number){
    let Start = new Date(startTime).getTime()
    let End = new Date(endTime).getTime()
    let CurrentTime = new Date().getTime()


return CurrentTime >= Start && CurrentTime <= End

  }
  public timeLeft: any;
  public interval: string | number | NodeJS.Timer | undefined;
  @ViewChild('myButton') myButton : any
  @ViewChild('EssayButton') EssayButton : any

  startTimer() {
    let end = new Date(this.EndTime).getTime()
    this.timeLeft = Number(end - new Date().getTime())/(1000)

   this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
        this.counter = new Date((this.timeLeft) * 1000).toISOString().substring(11, 19)
        this.days = new Date((this.timeLeft) * 1000).toISOString().substring(9, 10)
      }
      else {
        let el: HTMLElement = this.myButton?.nativeElement as HTMLElement;
        el?.click()
        let essay: HTMLElement = this.EssayButton?.nativeElement as HTMLElement;
        essay?.click()
        clearInterval(this.interval);
      }
    },1000)
  }

  public QuestionsList: any;
  public questionsList: any;


 LoadEssay() {

    this.http
      .get(this.URL+"EssayQuestions/"+this.AssignmentId)
      .subscribe(response => {
        this.QuestionsList = JSON.stringify(response);
        this.questionsList = JSON.parse(this.QuestionsList);
        console.error(this.QuestionsList)
      })
    return this.questionsList;

  }
  public newArray:any[]=[]
  public answerArray:any
;
  EssaySubmit(Answers:NgForm){
/*    Object.entries(Answers.value).find(([key, value]) => {
      console.error("key = "+key+" value = "+value)

    });*/
/*   this.newArray.push({essayAnswersList:Answers.value})*/
    clearInterval(this.interval);

/*
  this.answerArray = JSON.parse(JSON.stringify(Answers.value))*/
this.answerArray=JSON.parse(JSON.stringify(Answers.value))
    console.error("json string = "+JSON.stringify(this.answerArray))
    console.error(this.username)
    this.http
      .post(this.URL+"EssayQuestions/answerSubmit/"+this.AssignmentId+'/'+this.username,JSON.stringify(this.answerArray))
      .subscribe(response => {

      })
    alert("Submitted for grading")
this.reload()
  }


}
