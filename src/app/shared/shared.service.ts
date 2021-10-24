import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  public currentselectedmenu!: BehaviorSubject<string>;
  itemtochange = new Subject<string>();

  constructor() { }

  public get currentselectedmenuValue(): string {
    return this.currentselectedmenu.value;
}

public changeselectedmenu(selected: string){
this.currentselectedmenu.next(selected);
}
}
