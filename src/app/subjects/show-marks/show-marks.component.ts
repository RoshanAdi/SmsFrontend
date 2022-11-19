import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-marks',
  templateUrl: './show-marks.component.html',
  styleUrls: ['./show-marks.component.css']
})
export class ShowMarksComponent implements OnInit {
public marks:any
  constructor() { }

  ngOnInit(): void {
  this.marks = localStorage.getItem("marks")
  }

}
