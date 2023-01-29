import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpEventType, HttpResponse} from "@angular/common/http";
import {FileUploadService} from "./file-upload.service";
import {SubjectsComponent} from "../subjects.component";

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})

export class FileUploadComponent implements OnInit {
  public URL:string="http://localhost:8089/"
  selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];
  public savedFiles: any[] = []
  public blob: any

  fileInfos?: Observable<any>;

  constructor(private uploadService: FileUploadService,private http: HttpClient) { }

  ngOnInit(): void {
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
      .get(this.URL+"Assignment/" + localStorage.getItem("AssiId"))
      .subscribe((data) => {
        this.savedFiles = JSON.parse(JSON.stringify(data)).fileDBList;
      });

  }

  downloadFile(id: string, fileName: string, fileType: string) {
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
}
