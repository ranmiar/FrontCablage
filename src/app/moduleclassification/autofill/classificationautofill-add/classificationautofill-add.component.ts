import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ClassificationtModel } from '../../data/models/classification.model';
import { ClassificationtAutoFillModel } from '../../data/models/classificationautofill.model';
import { ClassificationtypeModel } from '../../data/models/classificationtype.model';
import { ClassificationService } from '../../data/services/classification.service';
import { ClassificationautofillService } from '../../data/services/classificationautofill.service';
import { ClassificationtypeService } from '../../data/services/classificationtype.service';

@Component({
  selector: 'app-classificationautofill-add',
  templateUrl: './classificationautofill-add.component.html',
  styleUrls: ['./classificationautofill-add.component.scss']
})
export class ClassificationautofillAddComponent implements OnInit {

  classificationsautofill: ClassificationtAutoFillModel[] = [];
  filtredautofill: ClassificationtAutoFillModel[] = [];
 selectedautofill: ClassificationtAutoFillModel;

  classificationtypes: ClassificationtypeModel[];
  classifications: ClassificationtModel[];
  leaderlist: ClassificationtModel[];
  dependentlist: ClassificationtModel[];
  selectedtypeleader: ClassificationtypeModel;
  selectedleader: ClassificationtModel;
  selecteddependant: ClassificationtModel;
  selectedtypedependent: ClassificationtypeModel;

  title: string;
  AddAutoFillForm: FormGroup;

  constructor(private servicetype: ClassificationtypeService, private service: ClassificationService, private serviceautofill: ClassificationautofillService, private dialogRef: MatDialog) { }

  ngOnInit(): void {
    this.servicetype.getClassificationtype().subscribe((cl)=>{
      this.classificationtypes = cl;
    },(err)=>{
      alert('error on getting classification type');
      console.error(err);
    });

    this.service.getClassification().subscribe((cl)=>{
      this.classifications = cl;
      this.leaderlist = cl;
      this.dependentlist = cl;
    },(err)=>{
      alert('error on getting classification type');
      console.error(err);
    });


   

    this.AddAutoFillForm = new FormGroup({
      selectedleader: new FormControl('', { validators: [Validators.required] }),
      selecteddependant: new FormControl('', { validators: [Validators.required] }),
      selectedtypeleader: new FormControl(''),
      selectedtypedependent: new FormControl('',),
    });

  }
  AddAutoFill(data: any){
    let autofill: ClassificationtAutoFillModel = new ClassificationtAutoFillModel();
    autofill.idDependentClassification = this.selecteddependant.id;
    autofill.idLeaderClassification = this.selectedleader.id;
    this.serviceautofill.autofilltoadd.next(autofill);

  }
  closepopup(){
    this.dialogRef.closeAll();
  }
  LeaderChanged(data: any)
  {

    this.filtredautofill = this.classificationsautofill.filter(cl=>cl.idLeaderClassification == this.selectedleader.id);
  }

  DependentTypeChanged(data:any)
  {
    if(data && data.value)
    {

      this.dependentlist = this.classifications.filter(cl=>cl.classificationTypeDto.id === data.value.id);
    }
    else {
      this.dependentlist = this.classifications;
    }
  }

  LeaderTypeChanged(data:any)
  {
    if(data && data.value)
    {
      this.leaderlist = this.classifications.filter(cl=>cl.classificationTypeDto.id === data.value);
    }
    else {
      this.leaderlist = this.classifications;
    }
  }
}
