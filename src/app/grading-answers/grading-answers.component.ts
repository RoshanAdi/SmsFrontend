import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {UsernameService} from "../JwtTokenSetup/_services/username.service";
import {NgForm} from "@angular/forms";
import {ThisReceiver} from "@angular/compiler";

@Component({
  selector: 'app-grading-answers',
  templateUrl: './grading-answers.component.html',
  styleUrls: ['./grading-answers.component.css']
})
export class GradingAnswersComponent implements OnInit {
  public CurrentSubject : any;
  public subjectList : any;
  public showSubjectList: boolean = true;
  public  showSelectedSubject:boolean = false;
  public subjectId!: number;
  private username: any;
  public CurrentTeacher: any;
  public firstName: any;
  public EssayAnswers: any;
  public showSubmissions: boolean = false;
 public Assignment: any;
  public shortAnswerList: any[]=[];
  public usernamesList: string[] = [];
  public AssignmentId: any;
  public marks:number = 0
  public counter:number=1
  public Save:string="Save"

  constructor(private router: Router, private http: HttpClient, private userNameService: UsernameService, @Inject(LOCALE_ID) private locale: string) {
  }
  ngOnInit(): void {
    this.username = this.userNameService.getUserName()

    this.http
      .get("http://localhost:8089/Teacher/"+this.username)
      .subscribe(response=> {
        this.CurrentTeacher = JSON.parse(JSON.stringify(response));
        this.firstName = this.CurrentTeacher.firstName
        this.subjectList = this.CurrentTeacher.subjects
      });
    this.showSubjectList = true;
    this.showSelectedSubject = false;




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
public answer:any[]=[]

  public stringifyanswer:any
  public stringfyAssi:any

  ShowSubmissions(assigmentID:number){
    this.http
      .get("http://localhost:8089/Assignment/"+assigmentID)
      .subscribe(response=> {
        this.Assignment = JSON.parse(JSON.stringify(response));
this.stringfyAssi = JSON.stringify(response)
      })

    this.http
      .get("http://localhost:8089/EssayAnswers/"+assigmentID)
      .subscribe(response=> {
        this.EssayAnswers = JSON.parse(JSON.stringify(response));
        this.shortAnswerList =  JSON.parse(JSON.stringify(response));


        this.showSubmissions = true
        this.showSelectedSubject = false;
        this.stringifyanswer=JSON.stringify(response)
        this.AssignmentId = assigmentID
        this.removeDuplicates()
       })


      }
      removeDuplicates(){
        let dic = new Map<string, string>();
        let anserList:any[]=[]
        anserList = this.shortAnswerList
        Object.entries(anserList).forEach(([key, value], index) => {
          dic.set(value?.username,value?.id)
        })
        this.usernamesList = Array.from(dic.keys())
        this.calTotalMarks()
      }

  submitMarks(Marks:NgForm){
    this.Save="Update"
    this.http.post('http://localhost:8089/marks/EssayQuestions/'+this.marks,Marks.value)
      .subscribe((result) => {

      })

}


  calTotalMarks(){
    let essayList:any[]=[]
    essayList = this.Assignment?.essayList
    Object.entries(essayList).forEach(([key, value], index) => {



      this.marks = Number(value?.marks)+Number(this.marks)
    })
    console.error(this.marks)


    /*this.marks=Number(marks)+Number(this.marks)*/
  }

  NotMarkedYet(marksupdateId :String){

    let marksSet:any[]=[]
    marksSet= this.Assignment?.marksSet
    for (var i = 0; i < marksSet.length; i++) {
      if (marksSet[i]?.marksupdateId ==marksupdateId)
        break;
      else { if (marksSet.length-1==i){return true}

      }
    }

return false;
  }
  finishGrading(){
    window.location.reload()
  }
}
