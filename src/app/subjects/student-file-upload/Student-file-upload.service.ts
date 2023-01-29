import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
import {SubjectsComponent} from "../subjects.component";

@Injectable({
  providedIn: 'root'
})
export class StudentFileUploadService {
  public URL:string="http://localhost:8089/"
  public fileDBList: any[] = []
  public savedFiles: any[] = []
  public blob: any


  constructor(private http: HttpClient) {
  }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', this.URL+"files/student/upload/" + localStorage.getItem("AssignmentID")+"/"+localStorage.getItem("username"), formData, {

      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }


}
