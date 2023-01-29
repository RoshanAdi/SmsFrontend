import {Component, Input, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-mcq',
  templateUrl: './mcq.component.html',
  styleUrls: ['./mcq.component.css']
})
export class McqComponent implements OnInit {
  public URL:string="http://localhost:8089/"
  public Assignment4Mcq:any;
  public assignment4Mcq:any;
  public showMcqCreate:boolean = false;
  public AssignmentIdForMcq:number=0;
  public showSavedMcq:boolean= false;
  public mcqList: any[] = [];
  public immediateMcq: string | undefined;
  @Input()
  requiredFileType: string | undefined;
  public blob:any;



  public fileDBList:any[]=[]
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.http
      .get(this.URL+"Assignment/"+localStorage.getItem("AssiId"))
      .subscribe(response=> {
        this.Assignment4Mcq = JSON.stringify(response);
        this.assignment4Mcq = JSON.parse(this.Assignment4Mcq);
        this.mcqList = this.assignment4Mcq.mcqList})
  }


  public choiceCount:number = 2;


  Choices: String[] = ["choice1","choice2"];



  submitMcq(value: NgForm): void {
    if(JSON.parse(JSON.stringify(value.value)).question.length>>2&&JSON.parse(JSON.stringify(value.value)).choice1.length>>0){
    this.http.post(this.URL+'Mcq/create/'+localStorage.getItem("AssiId"), value.value)
      .subscribe((result) => {
        console.warn("result", result)                ////remove
      })
    this.immediateMcq = JSON.parse(JSON.stringify(value.value))
    this.saveMcqLoad()
    value.reset()
    }

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
      .get(this.URL+"Assignment/"+localStorage.getItem("AssiId"))
      .subscribe(response=> {
        this.Assignment4Mcq = JSON.stringify(response);
        this.assignment4Mcq = JSON.parse(this.Assignment4Mcq);
        this.mcqList = this.assignment4Mcq.mcqList
        this.mcqList.push(this.immediateMcq)
        console.error(this.immediateMcq)
        console.warn(this.mcqList)
      })
    this.showSavedMcq= true;
    return this.mcqList;
  }
  DeleteMcq(id:number){
    this.http.delete(this.URL+'Mcq/delete/'+id)
      .subscribe((result) => {
        console.warn("result", result)
      })
    window.location.reload();
  }
}
