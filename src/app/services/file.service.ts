import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FileService {

  imageUploadApi = 'https://localhost:8443/images';

  constructor(private http: HttpClient) { }

  upload(file: File){
    let formData = new FormData();
    formData.append("file", file, "test" + ".jpg");
    return this.http.post(this.imageUploadApi + '/upload', formData);
  }

  get(filename: string){
    return this.http.get(this.imageUploadApi + '/' + filename);
  }
}
