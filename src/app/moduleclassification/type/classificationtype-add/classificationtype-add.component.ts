import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ClassificationtypeModel } from '../../data/models/classificationtype.model';
import { ClassificationtypeService } from '../../data/services/classificationtype.service';

@Component({
  selector: 'app-classificationtype-add',
  templateUrl: './classificationtype-add.component.html',
  styleUrls: ['./classificationtype-add.component.scss']
})
export class ClassificationtypeAddComponent implements OnInit {

  AddClassificationTypeForm: FormGroup ;
  classificationtype: ClassificationtypeModel = new ClassificationtypeModel();
  classificationtypenotupdated: ClassificationtypeModel = new ClassificationtypeModel();
  title: string;

  constructor( private dialogRef: MatDialog, private router: Router, private snackbar: MatSnackBar
    , private service: ClassificationtypeService) { }

  ngOnInit(): void {


      this.title =  this.classificationtype.id >0? 'Update classification type': 'Add classification type';
 this.classificationtypenotupdated = this.classificationtype;
    this.AddClassificationTypeForm = new FormGroup({
      designation: new FormControl('', { validators: [Validators.required] }),
    });
    
  }

  closepopup()
  {
    this.classificationtype = this.classificationtypenotupdated;
    this.service.refreshGrid.next(this.classificationtype);
    this.dialogRef.closeAll();
  }
  AddClassificationType(form: any)
  {
    if(this.classificationtype && this.classificationtype.id >0)
    {
      
      this.classificationtype.designation  = form.value.designation;
      this.service.classificationtypetoupdate.next(this.classificationtype);
     
    }
    else{
      this.classificationtype = new ClassificationtypeModel();
      this.classificationtype.designation  = form.value.designation;
      this.service.classificationtypetoadd.next(this.classificationtype);
      this.dialogRef.closeAll();
    }
   
   

  }

}
