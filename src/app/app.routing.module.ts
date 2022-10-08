import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";

import { BrowserModule } from '@angular/platform-browser';

import {FormsModule} from "@angular/forms";
import {StudRegComponent} from "./stud-reg/stud-reg.component";
import {LoginComponent} from "./login/login.component";


const routes: Routes=[
 // {path:'Teacher',component:MyBlog1Component},
 {path:'Student',component:StudRegComponent},
  {path:'Login',component:LoginComponent}
];

@NgModule({
  declarations: [StudRegComponent,LoginComponent],
  imports: [CommonModule, RouterModule.forRoot(routes), BrowserModule, FormsModule],
  exports: [RouterModule,StudRegComponent,LoginComponent ]
})
export class AppRoutingModule { }
