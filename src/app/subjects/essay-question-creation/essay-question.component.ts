import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-essay-question',
  templateUrl: './essay-question.component.html',
  styleUrls: ['./essay-question.component.css']
})
export class EssayQuestionComponent implements OnInit {
  public URL:string="http://localhost:8089/"
  public QuestionsList: any;
  public questionsList: any;
  public popQuestion: any;
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.LoadEssay()
  }
  submitQuestions(questions:NgForm){
    if (JSON.stringify(questions.value).length>30){
      console.warn(JSON.stringify(questions.value).length)
    this.http.post(this.URL+'EssayQuestion/create/'+localStorage.getItem("AssiId"), questions.value)
      .subscribe((result) => {
      })
    this.reset(questions)}
    this.LoadEssay()
  }

  reset(form:NgForm): void {
    form.reset();

  }
  LoadEssay(){
    for (let i = 0; i < 2; i++){   //this is to overcome updating delay after deletion
    this.http
      .get(this.URL+"EssayQuestions/"+localStorage.getItem("AssiId"))
      .subscribe(response=> {
        this.QuestionsList = JSON.stringify(response);
        this.questionsList = JSON.parse(this.QuestionsList);
        this.questionsList.pop(this.popQuestion)
        console.error(this.QuestionsList)
      })}
    return this.questionsList;
  }

  DeleteQuestion(id:number,index:number){
    this.http.delete(this.URL+'EssayQuestions/delete/'+id)
      .subscribe((result) => {
        this.popQuestion = index
      })
this.LoadEssay()
  }

}
