import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AnalogModel } from '../model/analog.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AnalogService {
  apiUrl = environment.apiurl;

  constructor(private http: HttpClient) { }

  getAllAnalog(): AnalogModel[]{
    return  [
        {id:3, designation:'A'},
        {id:4,designation:'B'},
        {id:5, designation:'C'},
        {id:6,designation:'D'},
        {id:7, designation:'E'},
        {id:8,designation:'F'}
       ];
   }
}
