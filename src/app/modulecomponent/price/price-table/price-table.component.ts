import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PriceModel } from '../../data/model/price.model';

@Component({
  selector: 'app-price-table',
  templateUrl: './price-table.component.html',
  styleUrls: ['./price-table.component.scss']
})
export class PriceTableComponent implements OnInit {
  
  displayedColumns: string[] = ['select', 'unitprice','sizeExtensionMin','sizeExtensionMax','validityDate','tieronepn','tiertwopn','harnessNumber','pricelinecomment','customrate'
,'proportionalprice' ];
  dataSource: MatTableDataSource<PriceModel>;
  @ViewChild(MatSort,{static: true}) sort: MatSort;
  @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;
  @Input() prices: PriceModel[];
  @Output() priceselected = new EventEmitter<PriceModel[]>();
  selection = new SelectionModel<PriceModel>(true, []);
  dialogRef:any;
  ispopup: boolean;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<PriceModel>(this.prices);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.selection.clear();
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource<PriceModel>(this.prices);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.selection.clear();
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = (this.dataSource && this.dataSource.data)? this.dataSource.data.length : 0;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }
  checkboxLabel(row?: PriceModel): string {
    if (!row) {
    
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
   
    this.fillselected()
    
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  fillselected()
  {
    let num = this.selection.selected.length;
    let list_selected: PriceModel[] = [];
    for(let i=0;i<num;i++)
    {
      list_selected.push(this.selection.selected[i]);
    }
    this.priceselected.next(list_selected);
  }
  closepopup()
  {
    this.dialog.closeAll();
  }

}
