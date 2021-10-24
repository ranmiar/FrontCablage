import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ClassificationtAutoFillModel } from '../models/classificationautofill.model';

@Injectable()
export class ClassificationautofillService {

  autofilltoadd = new Subject<ClassificationtAutoFillModel>();

  constructor(private http: HttpClient) { }

  apiUrl = environment.apiurl;

  getClassificationAutoFill(): Observable<ClassificationtAutoFillModel[]> {
    return this.http.get<ClassificationtAutoFillModel[]>(`${this.apiUrl}/classificationautofill`);
  }

  addClassificationAutoFill(object_to_add:ClassificationtAutoFillModel): Observable<ClassificationtAutoFillModel> {
    const body = JSON.stringify(object_to_add);
  const headers = new HttpHeaders().set('Content-Type', 'application/json');
  return this.http.post<ClassificationtAutoFillModel>(`${this.apiUrl}/classificationautofill`, body, {headers});
  }
  
  deleteClassificationAutoFill(_id: string): Observable<ClassificationtAutoFillModel> {

    return this.http.delete<ClassificationtAutoFillModel>(`${this.apiUrl}/classificationautofill/${_id}`);
  }
  updateClassificationAutoFill(id: number, classificationt: ClassificationtAutoFillModel): Observable<ClassificationtAutoFillModel> {

    const body = JSON.stringify(classificationt);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
  
    return this.http.put<ClassificationtAutoFillModel>(`${this.apiUrl}/classificationautofill/${id}`, body, {headers});
      
  }

}
