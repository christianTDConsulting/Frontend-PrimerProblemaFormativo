import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {  ImagenCartel } from 'src/app/models/images';

@Injectable({
  providedIn: 'root'
})
export class ImageCheckerService {

  private uploadUrl = 'http://localhost:3000/uploadCartelImage';
  private imagesUrl = 'http://localhost:3000/images';

  constructor(private http: HttpClient) {}


  uploadImages(imageFiles: File[], model: File): Observable<any> {
    const formData = new FormData();


    for (let i = 0; i < imageFiles.length; i++) {
      formData.append('image', imageFiles[i]); 
    }
    formData.append('model', model);
    return this.http.post(this.uploadUrl, formData);
  }
  getImages(): Observable<ImagenCartel[]> {
    return this.http.get<ImagenCartel[]>(this.imagesUrl);
  }
 


}
