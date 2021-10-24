import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ClassificationtModel } from '../models/classification.model';

@Injectable()
export class ClassificationService {
    apiUrl = environment.apiurl;

    classificationttoadd = new Subject<ClassificationtModel>();
    classificationtoupdate = new Subject<ClassificationtModel>();
    refreshGrid = new Subject<ClassificationtModel>();
    constructor(private http: HttpClient) { }

    getClassification(): Observable<ClassificationtModel[]> {
        return this.http.get<ClassificationtModel[]>(`${this.apiUrl}/classification`);
      }

      getClassificationbytype(typeid: number): Observable<ClassificationtModel[]> {
        return this.http.get<ClassificationtModel[]>(`${this.apiUrl}/classification?typeid=${typeid}`);
      }

      addClassification(object_to_add:ClassificationtModel): Observable<ClassificationtModel> {
        const body = JSON.stringify(object_to_add);
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      return this.http.post<ClassificationtModel>(`${this.apiUrl}/classification`, body, {headers});
      }
      
      deleteClassification(_id: string): Observable<ClassificationtModel> {
    
        return this.http.delete<ClassificationtModel>(`${this.apiUrl}/classification/${_id}`);
      }
      updateClassificatione(id: number, classificationt: ClassificationtModel): Observable<ClassificationtModel> {
    
        const body = JSON.stringify(classificationt);
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
      
        return this.http.put<ClassificationtModel>(`${this.apiUrl}/classification/${id}`, body, {headers});
          
      }
}