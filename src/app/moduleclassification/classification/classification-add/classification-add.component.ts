import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { dynamicSort } from 'src/app/shared/functions.component';
import { ClassificationtModel } from '../../data/models/classification.model';
import { ClassificationtypeModel } from '../../data/models/classificationtype.model';
import { ClassificationService } from '../../data/services/classification.service';
import { ClassificationtypeService } from '../../data/services/classificationtype.service';

@Component({
  selector: 'app-classification-add',
  templateUrl: './classification-add.component.html',
  styleUrls: ['./classification-add.component.scss']
})
export class ClassificationAddComponent implements OnInit {

  classificationslist: ClassificationtModel[];
  classificationstypes: ClassificationtypeModel[];
  classification: ClassificationtModel = new ClassificationtModel();
  selectedParent: ClassificationtModel;

  AddClassificationForm: FormGroup;
  title: string;

  constructor(private service_type: ClassificationtypeService, private dialogRef: MatDialog,
    private service: ClassificationService, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
   
  
   if(!this.classification.classificationTypeDto)
   {
     this.classification.classificationTypeDto = new ClassificationtypeModel();
   }
   this.service_type.getClassificationtype().subscribe((types)=>{
     this.classificationstypes = types;
   },(err)=>{
     alert('error on getting classifications types !!');
     console.error(err);
   })

   this.AddClassificationForm = new FormGroup({
    designation: new FormControl('', { validators: [Validators.required] }),
    selectedParent: new FormControl('', ),
    types: new FormControl('', { validators: [Validators.required] }),
    level:new FormControl('', )
  });
  this.title =  this.classification.id >0? 'Update classification ': 'Add classification ';

  if(this.classification && this.classification.id > 0)
  {
    //this.AddClassification
    this.service.getClassificationbytype(this.classification.classificationTypeDto.id).subscribe((cl)=>{
      this.classificationslist = cl;
    },(err)=>{
      alert('error on getting list of possible parents');
      console.error(err);
    });
  }


  }
  TypeChanged(selected: any)
  {
   this.classification.classificationTypeDto.id = selected.value;

   this.service.getClassificationbytype(selected.value).subscribe((cl)=>{
     this.classificationslist = cl;
   },(err)=>{
     alert('error on getting list of possible parents');
     console.error(err);
   });
  }

  AddClassification(form: any)
  {
    if(this.classification && this.classification.id > 0)
    {   
     this.service.classificationtoupdate.next(this.classification);
    }
    else {    
      this.classification.designation = form.value.designation;
      this.classification.idParent = form.value.selectedParent;
      this.classification.level = form.value.level;
      this.classification.classificationTypeDto = new ClassificationtypeModel();
      this.classification.classificationTypeDto.id = form.value.types;
        this.service.classificationttoadd.next(this.classification);
          this.dialogRef.closeAll();
    
    } 
  }
  closepopup()
  {
   this.dialogRef.closeAll();
  }
  

}
