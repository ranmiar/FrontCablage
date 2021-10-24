import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ComponentModel } from '../model/component.model';
import { BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs';
import { ComponentcurvesModel } from '../model/componentcurves.model';

@Injectable()
export class ComponentService {

  private componentSelected : ComponentModel[];
  componentSelectedSubject = new Subject<ComponentModel[]>();

  apiUrl = environment.apiurl;
  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();

  setComponentSelected(componentSelected : ComponentModel[]){
    this.componentSelected = componentSelected;
  } 
  getComponentSelected():ComponentModel[] {
     return this.componentSelected;
  } 
  emitComponentSelectedSubject(){
    this.componentSelectedSubject.next(this.componentSelected.slice());
  }

  constructor(private http: HttpClient) { }

  getComponents(): Observable<ComponentModel[]> {
    return this.http.get<ComponentModel[]>(`${this.apiUrl}/component`);
  }

  getComponentsWithPrice(): Observable<ComponentModel[]> {
    return this.http.get<ComponentModel[]>(`${this.apiUrl}/component/price`);
  }
  getComponentsbyclassification(id: number): Observable<ComponentModel[]> {
    return this.http.get<ComponentModel[]>(`${this.apiUrl}/component?classificationid=${id}`);
  }

  addComponent(component: ComponentModel) {
    const body = JSON.stringify(component);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log('curl'+this.apiUrl);
    console.log('Appel ws'+body);
    this.http.post<ComponentModel>(`${this.apiUrl}/component`, body, {headers}).subscribe();
    // this.http.post<ComponentModel>(`${this.apiUrl}/component`, body, {headers}).subscribe(
    //   {
    //     next: data => {
    //         console.log(data)
    //     },
    //     error: error => {
    //         console.error('There was an error!', error);
    //     }
    // }
    // );
  }

  getComponentsforCurves(id: number): Observable<ComponentcurvesModel[]> {
    return this.http.get<ComponentcurvesModel[]>(`${this.apiUrl}/component/curves/${id}`);
  }

  groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
         const key = keyGetter(item);
         const collection = map.get(key);
         if (!collection) {
             map.set(key, [item]);
         } else {
             collection.push(item);
         }
    });
    return map;
}
  
}
