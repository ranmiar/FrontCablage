import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-componentroot',
  templateUrl: './componentroot.component.html',
  styleUrls: ['./componentroot.component.scss']
})
export class ComponentrootComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  tiles: Grid[] = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];
}


export interface Grid {
  color: string;
  cols: number;
  rows: number;
  text: string;
}