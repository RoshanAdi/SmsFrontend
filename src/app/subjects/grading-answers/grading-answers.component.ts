import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {UsernameService} from "../../JwtTokenSetup/_services/username.service";
import {NgForm} from "@angular/forms";
import {ThisReceiver} from "@angular/compiler";

@Component({
  selector: 'app-grading-answers',
  templateUrl: './grading-answers.component.html',
  styleUrls: ['./grading-answers.component.css']
})
export class GradingAnswersComponent implements OnInit {
  public URL:string="http://localhost:8089/"
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
  private blob: any;
public showUpdateButton:boolean =false
  public savedFiles: any;
  public fileLength: any;
  public studentFileDBList: any;
  public studentFileListLength: any;
  constructor(private router: Router, private http: HttpClient, private userNameService: UsernameService, @Inject(LOCALE_ID) private locale: string) {
  }
  ngOnInit(): void {
    this.username = this.userNameService.getUserName()

    this.http
      .get(this.URL+"Teacher/"+this.username)
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
      .get(this.URL+"Subject/"+id)
      .subscribe(response=> {
        this.CurrentSubject = JSON.parse(JSON.stringify(response));
      })
    this.showSubjectList = false;
    this.showSelectedSubject = true;
    this.subjectId = id;
  }

  public stringifyanswer:any

public stringfyassiment:any
  ShowSubmissions(assigmentID:number){

    this.http
      .get(this.URL+"Assignment/"+assigmentID)
      .subscribe(response=> {
        this.Assignment = JSON.parse(JSON.stringify(response));

        this.stringfyassiment = JSON.stringify(response)
        this.savedFiles = this.Assignment.fileDBList;
        this.fileLength = JSON.stringify(this.savedFiles)

        this.studentFileDBList=this.Assignment?.studentFileDBList
        this.studentFileListLength = JSON.stringify( this.studentFileDBList)
        this.calTotalMarks()
      })



    this.http
      .get(this.URL+"EssayAnswers/"+assigmentID)
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


      }

  submitMarks(Marks:NgForm){
    this.showUpdateButton=true
    this.Save="Update"
    this.http.post(this.URL+'marks/EssayQuestions/'+this.marks,Marks.value)
      .subscribe((result) => {

      })

}


  calTotalMarks(){
    let essayList:JSON
    essayList = this.Assignment?.essayList
    console.error("essya list value = "+essayList)
    Object.entries(essayList).forEach(([key, value], index) => {



      this.marks = Number(value?.marks)+Number(this.marks)
    })
    console.warn("marks total = "+this.marks)


    /*this.marks=Number(marks)+Number(this.marks)*/
  }
  element: any;
  saveButtonDisable(username:String){
var counter = 0
    let marksSet:JSON
    marksSet= this.Assignment?.marksSet
    if(marksSet!=null||undefined) {
      Object.entries(marksSet).forEach(([key, value], index) => {
        if (value?.marksupdateId == (username + this.AssignmentId) && value?.marks == null) {
          counter = counter + 1
        }
      })
      return counter == 0;
    }
    else return true
  }
  finishGrading(){
    window.location.reload()
  }

  downloadProvidedFiles(id: string, fileName: string, fileType: string) {
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

  submitFileMarks(marks:NgForm){
    this.showUpdateButton=true
    this.http.post(this.URL+'marks/File/100',marks.value)
      .subscribe((result) => {

      })
  }
}
