import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MailerService {


url: string = 'http://localhost:3000/email';
constructor(private http: HttpClient) { }

sendMail(email: string, file:any){
  const body = {
    email: email,
    file: file
  };
      
  // Define las cabeceras de la solicitud, si es necesario
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  const options = { headers: headers };
    //especificar tipo de datos
  return this.http.post<any>(this.url, body, options);
}

}
