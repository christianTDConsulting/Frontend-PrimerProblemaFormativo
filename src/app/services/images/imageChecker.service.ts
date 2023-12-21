import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Imagen } from 'src/app/models/images';

@Injectable({
  providedIn: 'root'
})
export class ImageCheckerService {

  private uploadUrl = 'http://localhost:3000/uploadImage';
  private imagesUrl = 'http://localhost:3000/images';

  constructor(private http: HttpClient) {}

  // Método para subir la imagen
  uploadImages(imageFiles: File[]): Observable<any> {
    const formData = new FormData();
    for (let i = 0; i < imageFiles.length; i++) {
      formData.append('image', imageFiles[i]); 
    }
    console.log(formData);

    return this.http.post(this.uploadUrl, formData);
  }
  getImages(): Observable<Imagen[]> {
    return this.http.get<Imagen[]>(this.imagesUrl);
  }

}
