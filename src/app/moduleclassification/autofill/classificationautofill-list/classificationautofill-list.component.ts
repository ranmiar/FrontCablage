import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ClassificationautofillAddComponent } from '../classificationautofill-add/classificationautofill-add.component';
import { ClassificationtAutoFillModel } from '../../data/models/classificationautofill.model';
import { ClassificationautofillService } from '../../data/services/classificationautofill.service';
import { Store } from '@ngrx/store';
import { getShowLabel, State,getselectedclassificationautofill, getclassificationautofill } from '../../state/classification.reducer';
import * as ClassificationAction from '../../state/classification.action';

@Component({
  selector: 'app-classificationautofill-list',
  templateUrl: './classificationautofill-list.component.html',
  styleUrls: ['./classificationautofill-list.component.scss']
})
export class ClassificationautofillListComponent implements OnInit {

  classificationsautofill: ClassificationtAutoFillModel[] = [];
  dataSource: MatTableDataSource<ClassificationtAutoFillModel>;
  displayedColumns: string[] = [ 'select','leader','leaderType','dependent','dependentType'];
  selection = new SelectionModel<ClassificationtAutoFillModel>(true, []);
  dialogRef: any;
  checkbox: boolean = false;
  isLoading: boolean;
  manyselection: boolean = false;
  onlyoneselection: boolean = false;
  checkedngrx: boolean;
  _selectedlist: ClassificationtAutoFillModel[];
  selectedclassificationautofill: ClassificationtAutoFillModel = new ClassificationtAutoFillModel();

  constructor(private store:Store<State>, private service: ClassificationautofillService, public dialog: MatDialog, private snackbar: MatSnackBar) { }


  @ViewChild(MatSort,{static: true}) sort: MatSort;
  @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;
  
  ngOnInit(): void {
     
    this.service.getClassificationAutoFill().subscribe((classificationautofill)=>{
      this.classificationsautofill = classificationautofill;

      this.dataSource = new MatTableDataSource<ClassificationtAutoFillModel>(classificationautofill);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.store.dispatch(ClassificationAction.getclassificationautofill({classificationautofill}))
    },()=>{
      alert('error when trying to get classification autofill, please retry later !')
    });

    this.service.autofilltoadd.subscribe((autofill)=>this.AddAutoFill(autofill));

    this.store.select(getShowLabel).subscribe((show)=>{
      
        this.checkedngrx =show;
      
    })
    this.store.select(getselectedclassificationautofill).subscribe((cl)=>{
      this._selectedlist = cl;   
  })

  this.store.select(getclassificationautofill).subscribe((cl)=>{
    this.dataSource =  new MatTableDataSource<ClassificationtAutoFillModel>(cl);  
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
})
  }
  checkedChange()
  {
    this.store.dispatch(ClassificationAction.showLabel());
    //this.checkedngrx = !this.checkedngrx;
  }
  AddAutoFill(autofill: ClassificationtAutoFillModel): void {
    this.service.addClassificationAutoFill(autofill).subscribe(()=>{
      this.snackbar.open('Classification Auto Fill was added','',{duration: 1500});
     this.RefreshListFromStore();
      this.dialogRef.close();
    },(err)=>{
      alert('error when add autofill');
      console.error(err);
    })
  }
  
 
  RefreshListFromStore()
  {
    this.service.getClassificationAutoFill().subscribe((classificationautofill)=>{
      this.store.dispatch(ClassificationAction.getclassificationautofill({classificationautofill}))
      this.dataSource =  new MatTableDataSource<ClassificationtAutoFillModel>(classificationautofill);  
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  
    },(err)=>{
      console.error(err);
      alert('error on getting autofill');
    }
    );
   
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

  checkboxLabel(row?: ClassificationtAutoFillModel): string {
   
    if (!row) {
    
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }

    let classificationautofill: ClassificationtAutoFillModel[] = this.selection.selected;
    this.store.dispatch(ClassificationAction.setselectedclassificationautofill({classificationautofill}))
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  DisplayAddAutoFill(){


    this.dialogRef = this.dialog.open(ClassificationautofillAddComponent, {width: '700px',height:'500px', disableClose:true,
    data: {}});
    
  
    this.dialogRef.componentInstance.classificationsautofill = this.classificationsautofill;
  }
  DisplayUpdate(){
    this.dialogRef = this.dialog.open(ClassificationautofillAddComponent, {width: '700px',height:'500px', disableClose:true,
    data: {}});
    
 
    this.dialogRef.componentInstance.classificationsautofill = this.classificationsautofill; 
  }

Delete(num:any,ids:any){

  this.dataSource =  new MatTableDataSource<ClassificationtAutoFillModel>();  
  this.service.deleteClassificationAutoFill(ids).subscribe(()=>{
    alert(num+' item(s) deleted ');
  
    this.store.select(getclassificationautofill).subscribe((classificationautofill)=>{
      this.dataSource =  new MatTableDataSource<ClassificationtAutoFillModel>(classificationautofill);  
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.RefreshListFromStore();
      this.selection.clear();
  })
   // 
            
  },()=>{
    alert('an error happened when delete !');
    this.dataSource =  new MatTableDataSource<ClassificationtAutoFillModel>(this.classificationsautofill);  
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    this.selection.clear();
  });
}




  DeleteClassificationAutoFill(){

    if(!this._selectedlist || !this._selectedlist[0])
    {
      alert('please select at least one item');
    }
    
    else {
      //this.dataSource.data = [];
      let num = this.selection.selected.length;
      let confirmed =confirm('you have selected '+num+' item(s), are sure you want to delete ?'); 
      if(confirmed){
    
        let list_ids = '';
        for(let i=0;i<num;i++)
        {
        
          list_ids += this.selection.selected[i].id.toString()+',';
        }
        this.Delete(num,list_ids);     
      
      }
    
    }
      }

}
