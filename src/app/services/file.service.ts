import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FileService {

  imageUploadApi = 'https://greenway-backend.herokuapp.com/images';

  constructor(private http: HttpClient) { }

  upload(file: File, filename: string){
    let formData = new FormData();
    formData.append("file", file, filename + ".jpg");
    return this.http.post(this.imageUploadApi + '/upload', formData);
  }

  get(filename: string){
    return this.http.get(this.imageUploadApi + '/' + filename + ".jpg");
  }

  delete(filename: string){
    return this.http.delete(this.imageUploadApi + '/' + filename + ".jpg");
  }
}
