import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { MesurementModel } from '../model/mesurement.model';

@Injectable({
  providedIn: 'root'
})
export class MesurementService {

  apiUrl = environment.apiurl;

  constructor(private http: HttpClient) { }

  getMesurement(): Observable<MesurementModel[]>{
    return this.http.get<MesurementModel[]>(`${this.apiUrl}/mesurement`);
  }
}
