import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ClassificationtAutoFillModel } from '../../data/models/classificationautofill.model';

@Component({
  selector: 'app-autofilllist-child',
  templateUrl: './autofilllist-child.component.html',
  styleUrls: ['./autofilllist-child.component.scss']
})
export class AutofilllistChildComponent implements OnInit, OnChanges {
  dataSource: MatTableDataSource<ClassificationtAutoFillModel>;
  displayedColumns: string[] = [ 'leader','dependent'];
  @ViewChild(MatSort,{static: true}) sort: MatSort;
  @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;
  @Input()filtredautofill: ClassificationtAutoFillModel[];
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {

    this.dataSource = new MatTableDataSource<ClassificationtAutoFillModel>(this.filtredautofill);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {

    this.dataSource = new MatTableDataSource<ClassificationtAutoFillModel>(this.filtredautofill);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
