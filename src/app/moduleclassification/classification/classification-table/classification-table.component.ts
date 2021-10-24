import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ClassificationtModel } from '../../data/models/classification.model';
import { ClassificationAddComponent } from '../classification-add/classification-add.component';

@Component({
  selector: 'app-classification-table',
  templateUrl: './classification-table.component.html',
  styleUrls: ['./classification-table.component.scss']
})
export class ClassificationTableComponent implements OnInit, OnChanges {

  displayedColumns: string[] = ['select', 'designation','parent_designation','level','classificationType' ];
  dataSource: MatTableDataSource<ClassificationtModel>;
  manyselection: boolean = false;
  onlyoneselection: boolean = false;
  selection = new SelectionModel<ClassificationtModel>(true, []);
  selectedclassification: ClassificationtModel;
  @ViewChild(MatSort,{static: true}) sort: MatSort;
  @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;
  @Input() classifications: ClassificationtModel[];
  @Output() classificationselected = new EventEmitter<ClassificationtModel[]>();
  dialogRef:any;

  constructor(public dialog: MatDialog) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource<ClassificationtModel>(this.classifications);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.selection.clear();
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<ClassificationtModel>(this.classifications);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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

   checkboxLabel(row?: ClassificationtModel): string {
      if (!row) {
      
        return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
      }
      this.manyselection = (this.selection && this.selection.select && this.selection.selected.length>1)? true:false;
      this.onlyoneselection = (this.selection && this.selection.select && this.selection.selected.length == 1)? true:false;
      this.selectedclassification = this.selection && this.selection.select && this.selection.selected.length == 1 ?
      this.selection.selected[0] : new ClassificationtModel();
      this.fillselected()
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
    }

    DisplayAddClassification(){
      if(this.manyselection || !this.onlyoneselection )
      {
        alert('please select one item');
      }
      else{
        this.dialogRef = this.dialog.open(ClassificationAddComponent, {width: '500px',height:'300px', disableClose:true,
        data: {}});
        
      
        this.dialogRef.componentInstance.classification = new ClassificationtModel();
      }

    }

    fillselected()
    {
      let num = this.selection.selected.length;
      let list_selected: ClassificationtModel[] = [];
      for(let i=0;i<num;i++)
      {
        list_selected.push(this.selection.selected[i]);
      }
      this.classificationselected.next(list_selected);
    }
   
    

}
