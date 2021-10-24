import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ClassificationtypeModel } from '../models/classificationtype.model';
import { environment } from 'src/environments/environment';

@Injectable()
// @Injectable({
//   providedIn: 'root'
// })
export class ClassificationtypeService {
  apiUrl = environment.apiurl;
 

  classificationtypetoadd = new Subject<ClassificationtypeModel>();
  classificationtypetoupdate = new Subject<ClassificationtypeModel>();
  refreshGrid = new Subject<ClassificationtypeModel>();
  constructor(private http: HttpClient) { }


  getClassificationtype(): Observable<ClassificationtypeModel[]> {
    return this.http.get<ClassificationtypeModel[]>(`${this.apiUrl}/classificationtype`);
  }

  addClassificationtype(object_to_add:ClassificationtypeModel): Observable<ClassificationtypeModel> {
    const body = JSON.stringify(object_to_add);
  const headers = new HttpHeaders().set('Content-Type', 'application/json');
  return this.http.post<ClassificationtypeModel>(`${this.apiUrl}/classificationtype`, body, {headers});
  }
  
  deleteClassificationtype(_id: string): Observable<ClassificationtypeModel> {

    return this.http.delete<ClassificationtypeModel>(`${this.apiUrl}/classificationtype/${_id}`);
  }
  updateClassificationtype(id: number, classificationtype: ClassificationtypeModel): Observable<ClassificationtypeModel> {

    const body = JSON.stringify(classificationtype);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
  
    return this.http.put<ClassificationtypeModel>(`${this.apiUrl}/classificationtype/${id}`, body, {headers});

  
  }
  

}
