import { SelectionModel } from '@angular/cdk/collections';
import {Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { ClassificationAddComponent } from '../classification-add/classification-add.component';
import { ClassificationtModel } from '../../data/models/classification.model';
import { ClassificationtypeModel } from '../../data/models/classificationtype.model';
import { ClassificationService } from '../../data/services/classification.service';
import { ClassificationtypeService } from '../../data/services/classificationtype.service';




@Component({
  selector: 'app-classification-list',
  templateUrl: './classification-list.component.html',
  styleUrls: ['./classification-list.component.scss']
})
export class ClassificationListComponent implements OnInit {

  dialogRef: any;
  checkbox: boolean = false;
  isLoading: boolean;
  selection = new SelectionModel<ClassificationtModel>(true, []);
  classifications: ClassificationtModel[] = [];
  classifications_backup: ClassificationtModel[] = [];
  classificationtoadd: ClassificationtModel;
  classificationtoupdate: ClassificationtModel;
  classificationtypelist: ClassificationtypeModel[];
  selectedType: ClassificationtypeModel;
  manyselection: boolean = false;
  onlyoneselection: boolean = false;
  filter: string;
  selectedclassification: ClassificationtModel = new ClassificationtModel();
  classificationsselectedchild: ClassificationtModel[];


  constructor(private service_type: ClassificationtypeService, private service: ClassificationService, public dialog: MatDialog, private snackbar: MatSnackBar) { }

  ngOnInit(): void {



    this.service.getClassification().subscribe((cl)=>{
      this.classifications = cl;
      this.classifications_backup = cl;
    },()=>{
      alert('error when trying to get classification, please retry later !')
    });

    this.service_type.getClassificationtype().subscribe((ty)=>{
      this.classificationtypelist = ty;
    },()=>{
      alert('error when trying to get type classification, please retry later !')
    });

    this.service.classificationttoadd.subscribe((cl)=>{
      this.AddClassification(cl);
    });
    this.service.classificationtoupdate.subscribe((cl)=>{
      this.classificationtoupdate = cl;
      this.UpdateClassification(cl);
    });


  }

  ngAfterViewInit() {
   
  }


  handleChildButtonClick(value:any) {
    if(value && value.length)
    {
      this.classificationsselectedchild = value;
   
    }
    else{
      this.classificationsselectedchild = [];
    }
    
  }



    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;

      let filtred_classification = this.classifications_backup;
      if(this.selectedType)
      { 
        filtred_classification = this.classifications_backup.filter(cl=>cl.classificationTypeDto.id === this.selectedType.id)
      } 
      if(filterValue)
      {
        filtred_classification = filtred_classification.filter(cl=>cl.designation.toLocaleLowerCase().includes(filterValue) 
        ||(cl.parent_designation!=null && cl.parent_designation.toLocaleLowerCase().includes(filterValue) )
        || cl.classificationTypeDto.designation.toLocaleLowerCase().includes(filterValue) 
        );
      }   
     

      this.classifications = filtred_classification.slice(0);
     
    }

    DisplayAddClassification(){
     
    //   this.dialogRef = this.dialog.open(ClassificationAddComponent, {width: '1200px',height:'300px', disableClose:true,
    // data: {}});
    this.dialogRef = this.dialog.open(ClassificationAddComponent);
    
    }
    DisplayUpdateClassification(){
     
      if(!this.classificationsselectedchild || (this.classificationsselectedchild && this.classificationsselectedchild[1]) )
      {
        alert('please select one item');
      }
      else{
        this.dialogRef = this.dialog.open(ClassificationAddComponent, {width: '800px',height:'300px', disableClose:true,
        data: {}});
        
      
        this.dialogRef.componentInstance.classification = this.classificationsselectedchild[0];
      }
     
    }

    TypeChanged(data:any )
    {
      let filtred_classification = this.classifications_backup;
      if(data && data.value)
      { 
        filtred_classification = this.classifications_backup.filter(cl=>cl.classificationTypeDto.id === data.value.id)
      } 
      if(this.filter)
      {
        filtred_classification = filtred_classification.filter(cl=>
          cl.designation.toLocaleLowerCase().includes(this.filter) 
                ||(cl.parent_designation!=null && cl.parent_designation.toLocaleLowerCase().includes(this.filter) )
                || cl.classificationTypeDto.designation.toLocaleLowerCase().includes(this.filter) 
                );
      }   
     

      this.classifications = filtred_classification.slice(0);
    }
    AddClassification(classification: ClassificationtModel)
    {
      this.service.addClassification(classification).subscribe(()=>{
        this.RefreshGrid();
        this.snackbar.open('Classification was added','',{duration: 1500});
      },(err)=>{
        alert('error when add classification');
        console.error(err);
      })
   
    }
    RefreshGrid()
    {
      this.isLoading = true;
      this.service.getClassification().subscribe((cl)=>{
        this.classifications = cl;
        this.classifications_backup = cl;
        this.isLoading = false;
        if(this.filter)
      {
        this.classifications = this.classifications.filter(cl=>
          cl.designation.toLocaleLowerCase().includes(this.filter) 
                ||(cl.parent_designation!=null && cl.parent_designation.toLocaleLowerCase().includes(this.filter) )
                || cl.classificationTypeDto.designation.toLocaleLowerCase().includes(this.filter) 
                );
      }  
      if(this.selectedType)
      { 
        this.classifications = this.classifications.filter(cl=>cl.classificationTypeDto.id === this.selectedType.id)
      } 
      },()=>{
        alert('error when trying to get classification, please retry later !')
      });
    }

    UpdateClassification(cl: ClassificationtModel)
    {
      this.service.updateClassificatione(cl.id,cl).subscribe(()=>{
      this.snackbar.open('Classification was updated','',{duration: 1500});
      this.RefreshGrid();
      this.dialogRef.close();
      this.selection.clear();
  
    },()=>{
      alert('error on update please try later');
    });
    this.RefreshGrid();
    }

    DeleteClassification(){
      if(!this.classificationsselectedchild[0])
      {
        alert('please select at least one item');
      }
      
      else {
        let num = this.classificationsselectedchild.length;
        let confirmed =confirm('you have selected '+num+' item(s), are sure you want to delete ?'); 
        if(confirmed){
          let list_ids = '';
          for(let i=0;i<num;i++)
          {
            
            list_ids += this.classificationsselectedchild[i].id.toString()+',';
          }
      
          this.service.deleteClassification(list_ids).subscribe(()=>{
         
            alert(num.toString()+' item(s) deleted ');
            this.RefreshGrid();
          },()=>{
            alert('an error happened when delete classification !');
            this.selection.clear();
          });
       //this.filter="";
      // this.selectedType = new ClassificationtypeModel();
        
        }
      
      }
}
}
