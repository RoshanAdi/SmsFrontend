import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {FileUploadService} from "../Teacher-file-upload/file-upload.service";
import {HttpClient, HttpEventType, HttpResponse} from "@angular/common/http";
import {StudentFileUploadService} from "./Student-file-upload.service";
import {UsernameService} from "../../JwtTokenSetup/_services/username.service";

@Component({
  selector: 'app-student-file-upload',
  templateUrl: './student-file-upload.component.html',
  styleUrls: ['./student-file-upload.component.css']
})
export class StudentFileUploadComponent implements OnInit {

  selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];
  public savedFiles: any[] = []
  public blob: any

  fileInfos?: Observable<any>;
  public username: any;

  constructor(private userNameService: UsernameService,private uploadService: StudentFileUploadService,private http: HttpClient) { }

  ngOnInit(): void {
    this.username = this.userNameService.getUserName()
    this.ShowUploadedFiles()
  }

  selectFiles(event: any): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
  }

  upload(idx: number, file: File): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name };

    if (file) {
      this.uploadService.upload(file).subscribe({
        next: (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
            if(this.progressInfos[idx].value==100){
              this.ShowUploadedFiles()
            }
          } else if (event instanceof HttpResponse) {
            const msg = 'Uploaded the file successfully: ' + file.name;
            this.message.push(msg);

          }
        },
        error: (err: any) => {
          this.progressInfos[idx].value = 0;
          const msg = 'Could not upload the file: ' + file.name;
          this.message.push(msg);

        }
      });
    }
  }

  uploadFiles(): void {
    this.message = [];

    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }
    }
  }
  ShowUploadedFiles() {
    this.http
      .get("http://localhost:8089/Assignment/" + localStorage.getItem("AssignmentID"))
      .subscribe((data) => {
        this.savedFiles = JSON.parse(JSON.stringify(data)).studentFileDBList; //change
      });

  }

  downloadFile(id: string, fileName: string, fileType: string) {
    this.http
      .get<Blob>("http://localhost:8089/files/student/download/" + id, {responseType: 'blob' as 'json'})
      .subscribe((data) => {

        this.blob = new Blob([data], {type: fileType});

        var downloadURL = window.URL.createObjectURL(data);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = fileName;
        link.click();

      });

  }
}
