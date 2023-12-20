import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageCheckerService {

  private uploadUrl = 'http://localhost:3000/uploadImage';

  constructor(private http: HttpClient) {}

  // Método para subir la imagen
  uploadImage(imageFile: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', imageFile);

   
    return this.http.post(this.uploadUrl, formData);
  }
}
