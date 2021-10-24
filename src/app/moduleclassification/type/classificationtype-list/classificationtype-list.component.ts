import { SelectionModel } from '@angular/cdk/collections';
import {Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorDefaultOptions, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ClassificationtypeAddComponent } from '../classificationtype-add/classificationtype-add.component';
import { ClassificationtypeModel } from '../../data/models/classificationtype.model';
import { ClassificationtypeService } from '../../data/services/classificationtype.service';

@Component({
  selector: 'app-classificationtype-list',
  templateUrl: './classificationtype-list.component.html',
  styleUrls: ['./classificationtype-list.component.scss']
})
export class ClassificationtypeListComponent implements OnInit {

  dialogRef: any;
  checkbox: boolean = false;
  isLoading: boolean;
  selection = new SelectionModel<ClassificationtypeModel>(true, []);
  classificationtypes: ClassificationtypeModel[] = [];
  classificationtypesbackup: ClassificationtypeModel[] = [];
  displayedColumns: string[] = ['select', 'designation' ];
  dataSource: MatTableDataSource<ClassificationtypeModel>;
  classificationtypetoadd: ClassificationtypeModel;
  classificationtypetoupdate: ClassificationtypeModel;
  manyselection: boolean = false;
  onlyoneselection: boolean = false;
  selectedclassificationtype: ClassificationtypeModel = new ClassificationtypeModel();
 
  constructor(private service: ClassificationtypeService, public dialog: MatDialog, private snackbar: MatSnackBar) { }
 

  

  @ViewChild(MatSort,{static: true}) sort: MatSort;
  @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;

  ngOnInit(): void {
    this.service.getClassificationtype().subscribe((cl)=>{
      this.classificationtypes = cl;
      this.classificationtypesbackup = cl;
      this.dataSource = new MatTableDataSource<ClassificationtypeModel>(this.classificationtypes);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },()=>{
      alert('error when trying to get classification type, please retry later !')
    });
    this.service.classificationtypetoadd.subscribe((cl)=>{
      this.classificationtypetoadd = cl;
      this.AddClassificationType();
    });
    this.service.classificationtypetoupdate.subscribe((cl)=>{

      this.UpdateClassificationType(cl);
    });
  
    this.service.refreshGrid.subscribe((cl)=>{
      this.RefreshGrid();
    });
  }

  ngAfterViewInit() {
   
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

   /** The label for the checkbox on the passed row */
   checkboxLabel(row?: ClassificationtypeModel): string {
    if (!row) {
    
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    this.manyselection = (this.selection && this.selection.select && this.selection.selected.length>1)? true:false;
    this.onlyoneselection = (this.selection && this.selection.select && this.selection.selected.length == 1)? true:false;
    this.selectedclassificationtype = this.selection && this.selection.select && this.selection.selected.length == 1 ?
    this.selection.selected[0] : new ClassificationtypeModel();
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  DisplayAddClassificationType(){
    this.dialog.open(ClassificationtypeAddComponent, {width: '1000px', disableClose:true});
  }
  DisplayClassificationType(){
    if(this.manyselection || !this.onlyoneselection )
    {
      alert('please select one item');
    }
    else{
  this.dialogRef = this.dialog.open(ClassificationtypeAddComponent, {width: '1000px', disableClose:true,
    data: {}});
    
    this.dialogRef.componentInstance.classificationtype = this.selectedclassificationtype;
  
   
    }
  
   
    }
  AddClassificationType()
  {
    this.service.addClassificationtype(this.classificationtypetoadd).subscribe(()=>{
      
      this.RefreshGrid();
      this.snackbar.open('Classification Type was added','',{duration: 1500});
      this.dialogRef.close();
    },()=>{
      alert('error when adding classification type')});
   
  }
  UpdateClassificationType(classificationtype: ClassificationtypeModel)
  {
    let id = this.dataSource.data.findIndex(ut=>ut.id === classificationtype.id);
    this.dataSource.data.slice(id,1);
    //this.dataSource.data.push(classificationtype);
    this.dataSource._updateChangeSubscription();
    this.service.updateClassificationtype(classificationtype.id,classificationtype).subscribe(()=>{
    this.snackbar.open('Classification Type was updated','',{duration: 1500});
    this.dialogRef.close();

  },()=>{
    alert('error on update please try later');
  });
}
 
  DeleteClassificationType(){
if(!this.manyselection && !this.onlyoneselection)
{
  alert('please select at least one item');
}

else {
  let num = this.selection.selected.length;
  let confirmed =confirm('you have selected '+num+' item(s), are sure you want to delete ?'); 
  if(confirmed){
    let list_ids = '';
    for(let i=0;i<num;i++)
    {
      
      list_ids += this.selection.selected[i].id.toString()+',';
    }

    this.service.deleteClassificationtype(list_ids).subscribe(()=>{
   
      alert(num.toString()+' item(s) deleted ');
      this.RefreshGrid();
    },()=>{
      alert('an error happened when delete !');
      this.selection.clear();
    });
 
  
  }

}
  }
  RefreshGrid()
  {
    this.isLoading = true;
    this.service.getClassificationtype().subscribe((cl)=>{
      this.classificationtypes = cl;
      this.dataSource.data = cl;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.selection.clear();
      this.isLoading = false;
    },()=>{
      alert('error when trying to get classification type, please retry later !')
    });
  }
  RefreshFrontEnd(){
    let id = this.dataSource.data.findIndex(ut=>ut.id === this.selectedclassificationtype.id);
    this.dataSource.data.slice(id,1);

    this.dataSource._updateChangeSubscription();
   
}

  

}
