import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";

import { BrowserModule } from '@angular/platform-browser';

import {FormsModule} from "@angular/forms";
import {StudRegComponent} from "./stud-reg/stud-reg.component";


const routes: Routes=[
 // {path:'list',component:MyBlog1Component},
 {path:'create',component:StudRegComponent}
];

@NgModule({
  declarations: [StudRegComponent],
  imports: [CommonModule, RouterModule.forRoot(routes), BrowserModule, FormsModule],
  exports: [RouterModule,StudRegComponent ]
})
export class AppRoutingModule { }
