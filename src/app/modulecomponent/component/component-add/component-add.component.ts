import { Component,Input, Output,EventEmitter, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, mergeMap, tap, map } from 'rxjs/operators';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AnalogService } from '../../data/service/analog.service';
import { AnalogModel } from '../../data/model/analog.model';
import { ComponentService } from '../../data/service/component.service';
import { ComponentModel } from '../../data/model/component.model';
import { MesurementModel } from '../../data/model/mesurement.model';
import { Router } from '@angular/router';
import { ClassificationtypeService } from 'src/app/moduleclassification/data/services/classificationtype.service';
import { ClassificationtypeModel } from '../../../moduleclassification/data/models/classificationtype.model'
import { MatSnackBar } from '@angular/material/snack-bar';
import { formatDate } from '@angular/common';
import { ClassificationService } from 'src/app/moduleclassification/data/services/classification.service';
import { ClassificationtModel } from '../../../moduleclassification/data/models/classification.model';
import { MesurementService } from '../../data/service/mesurement.service';
import {startWith} from 'rxjs/operators';
import { Company } from './company';

@Component({
  selector: 'app-component-add',
  templateUrl: './component-add.component.html',
  styleUrls: ['./component-add.component.scss']
})
export class ComponentAddComponent implements OnInit {

  // companyName: string;
  // initialSelection: Company = {companyName: "Apple"};
  // companyForm: FormGroup;

 

  componentRef: string;
  initialSelection: ComponentModel = {renaultpartnumber: "243427Y009"};

  filteredComponents: Observable<ComponentModel[]>;
  @Output() optionSelected = new EventEmitter();
  componentdata: Observable<ComponentModel[]>;

  components: ComponentModel[] = [
  //   {renaultpartnumber:"243427Y009"},
  // {renaultpartnumber:"280884BA0A"},
  // {renaultpartnumber:"242970378R"}
];

  post: any = '';
  allMesurements: Mesurement[];
  allComponent: ComponentModel[];
  allClassificationType: ClassificationtypeModel[];

  componentslist: ComponentModel[];
  selectedParent: ComponentModel;
  componentForm: FormGroup;
  mesurement: MesurementModel;
  classification: ClassificationtModel;
  clmdl: ClassificationtModel = new ClassificationtModel();
  public classificationtlist: ClassificationtModel[];
  classificationSelected: ClassificationtModel;
  mesurementslist: MesurementModel[];
  mesurementSelected: MesurementModel;
  
  constructor(private formBuilder: FormBuilder, private fb: FormBuilder,
    private dialogRef: MatDialogRef<ComponentAddComponent>,
    @Inject(MAT_DIALOG_DATA) public component: ComponentModel,
    private analogService: AnalogService,
    private componentService: ComponentService,
    private router: Router,
    private classificationtypeService: ClassificationtypeService,
    private snackbar: MatSnackBar,
    private classificationservice: ClassificationService,
    private mesurementservice: MesurementService) { 
      this.componentForm = this.setComponent(this.initialSelection.renaultpartnumber);
    }

  ngOnInit(): void {
    this.allMesurements = [
      { id: 1, unit: 'm' }, { id: 2, unit: 'kg' }
    ];

    this.componentService.getComponents().subscribe((cm) => {
      this.allComponent = cm;
      this.componentdata = of(this.components);
    }, (err) => {
      alert('error when trying to get components, please retry later !');
      console.error(err);
    });

    this.classificationservice.getClassification().subscribe(cl => {
      this.classificationtlist = cl;
      if(this.component){
        this.classificationSelected = cl.find(c => c.id == this.component.id_classification)!;
        console.log(this.classificationSelected);
      }
    }, error =>{
      console.log("ERROR");
    },
    () =>{
      console.log('Classification selectionnée');
      console.log(this.classificationSelected);
      if(this.classificationSelected)
       this.componentForm.get('FamilyType')?.setValue(this.classificationSelected);
    }
    );

    this.mesurementservice.getMesurement().subscribe( me =>{
      this.mesurementslist = me;
       if(this.component){
         this.mesurementSelected = me.find(m => m.id == this.component.id_mesurementunit)!;
       }
    }, error =>{ console.log('Error')},
    () => {
      console.log('Mesurements selectionné')
      console.log(this.mesurementSelected);
      this.componentForm.get('unit')?.setValue(this.mesurementSelected);
    }
    );

    // this.filteredStreets = this.componentForm.valueChanges.pipe(
    //   startWith(''),
    //   map(value => this._filter(value))
    // );
    this.initForm();
    this.filteredComponents = this.componentForm.get("component").valueChanges.pipe(
      tap(val => console.log('inside valueChanges Observable, val is: ', val)),
      debounceTime(200))
      .pipe(mergeMap(val => this.filter(val)));
    //this.setDefaultValue();
  }

  initForm() {
    this.componentForm = this.formBuilder.group({
      'RnPartNumber': [null, Validators.required],
      'NissanPartNumber': [null],
      'Designation': [null, Validators.required],
      'birthDate': [null],
      'replaceBy': [null],
      'analog': [null],
      'AllianceSpecific': [null],
      'PNcomment': [null],
      'TechnicalFile': [null],
      'NPDM': [null],
      'MGV': [null],
      'Sharepoint': [null],
      'unit': [null],
      'CustomCode': [null],
      'UnitIndexedMaterial': [null],
      'ProportionalIndexedMaterial': [null],
      'Responsible': [null],
      'FamilyType': [null],
      //'street': [undefined],
      'name': [{value: '', disabled: false}, Validators.required],
      'component':['2222222'],
    });


  }

  setDefaultValue() {
    const toSelect = this.allMesurements.find(m => m.id = 1);
    this.componentForm.get('unit')?.setValue(toSelect);
    this.componentForm.get('RnPartNumber')?.setValue(this.component.renaultpartnumber);
    this.componentForm.get('Designation')?.setValue(this.component.designation);
    this.componentForm.get('birthDate')?.setValue(this.component.birthdate);
  }

  get unit() {
    return this.componentForm.get('unit');
  }

  get analog() {
    return this.componentForm.get('analog');
  }

  get replaceBy() {
    return this.componentForm.get('replaceBy');
  }
  get familyType() {
    return this.componentForm.get('FamilyType');
  }
  closepopup() {
    this.dialogRef.close();
  }
  getErrorRnPartNumber() {

    return this.componentForm.get("RnPartNumber")?.hasError('required') ? 'Field is required ' : '';
  }

  onSubmitComponent() {
    // console.log(this.componentForm?.value);
    // console.log(this.componentForm.get("unit")?.value.id);
    // console.log(this.componentForm.get("unit")?.value.unit);
    // console.log("Renault part number:" + this.componentForm.get("RnPartNumber")?.value)
    const newComponent = new ComponentModel();
    const measuerement = new MesurementModel();
    newComponent.renaultpartnumber = this.componentForm.get("RnPartNumber")?.value;
    newComponent.nissanpartnumber = this.componentForm.get("NissanPartNumber")?.value;
    newComponent.designation = this.componentForm.get("Designation")?.value;
    newComponent.birthdate = this.componentForm.get("birthDate")?.value;
    newComponent.id_analog = 3;
    measuerement.id = this.componentForm.get("unit")?.value.id;
    measuerement.unit = this.componentForm.get("unit")?.value.unit;
    newComponent.replaceBy = this.componentForm.get("replaceBy")?.value.id;
    newComponent.mesurement = measuerement;
    this.componentService.addComponent(newComponent);
    this.router.navigate(['/components'])
  }
  onMesurementChange() {
    console.log(this.unit?.value);
    //this.Unit.setValue(e.target.value, {
    //   onlySelf: true
    // })
  }
  onAnalogChange() {
    console.log(this.analog?.value);
  }

  // private _filter(value: string): string[] {
  //   const filterValue = this._normalizeValue(value);
  //   return this.streets.filter(street => this._normalizeValue(street).includes(filterValue));
  // }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  // Getter method to access formcontrols
  /* Date */
  date(e: any) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.componentForm.get("birthDate")?.setValue(convertDate, { onlyself: true })
  }

  onSelected(event: any) {
    console.log("In app component: "+event);
    this.componentRef = event;
   /* let newSelection = { 
      companyName: this.companyName,
      description: "additional data"
    };*/
   // this.companyForm.get('company').setValue(this.companyName);
  }

  setComponent(comp: string): FormGroup {
    return this.fb.group({ component: comp }) as FormGroup;
  }

  private filter(value: string | ComponentModel): Observable<ComponentModel[]> {
    const val = (typeof value === 'string') ? value : value.renaultpartnumber;
    console.log('inside filter, value is: ', value);
    if (val) {
        return this.componentdata.pipe(map((cos: ComponentModel[]) => {
            return cos.filter((co: ComponentModel) => {
                return (co.renaultpartnumber.toLowerCase().search((typeof val === 'string') ? val.toLowerCase() : (<ComponentModel> val).renaultpartnumber.toLowerCase()) !== -1)
            });
        }));
    } else {
        return this.componentdata;
    }
   
  }
  

  onSelectionChanged(event: any) {
    console.log('event: option selected is ', event);
     this.optionSelected.emit(event);
  }

  displayCo(component?: string): string {
    console.log(component)
      return component ? component : '';
  }

}

export class Mesurement {
  id: number;
  unit: string;
}
