import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ComponentModel } from '../model/component.model';
import { PriceModel } from '../model/price.model';

@Injectable()
export class PriceService {
  apiUrl = environment.apiurl;

  constructor(private http: HttpClient) { }

  getPrices(): Observable<PriceModel[]> {
    return this.http.get<PriceModel[]>(`${this.apiUrl}/price`);
  }

  getPricesByComponent(id: number): Observable<PriceModel[]> {
    return this.http.get<PriceModel[]>(`${this.apiUrl}/price?componentid=${id}`);
  }
}
