import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Log, Bloqueo } from 'src/app/models/log';
@Injectable({
  providedIn: 'root'
})
export class LogsService {

  constructor(private http: HttpClient) { }
  private url_logs = 'http://localhost:3000/logs';
  private url_bloqueos = 'http://localhost:3000/bloqueos';
  verLogs(): Observable<Log[]> {

    return this.http.get<any[]>(this.url_logs);
  }
  verBloqueos(): Observable<Bloqueo[]> {
    const logsUrl = 'http://localhost:3000/bloqueos';
    return this.http.get<any[]>(this.url_bloqueos);
  }

}
