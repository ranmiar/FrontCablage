import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ClassificationtModel } from 'src/app/moduleclassification/data/models/classification.model';
import { ClassificationService } from 'src/app/moduleclassification/data/services/classification.service';
import { ComponentModel } from '../../data/model/component.model';
import { ComponentService } from '../../data/service/component.service';
import { PriceService } from '../../data/service/price.service';
import { PriceListComponent } from '../../price/price-list/price-list.component';
import { PriceTableComponent } from '../../price/price-table/price-table.component';
import { ComponentAddComponent } from '../../component/component-add/component-add.component'
import { Observable } from 'rxjs';
import { MesurementModel } from '../../data/model/mesurement.model';
import { ComponentDetailsComponent } from '../component-details/component-details.component';
import { ComponentCurvesComponent } from '../component-curves/component-curves.component';

@Component({
  selector: 'app-component-list',
  templateUrl: './component-list.component.html',
  styleUrls: ['./component-list.component.scss']
})
export class ComponentListComponent implements OnInit {

  components: ComponentModel[] = [];
  components_backup: ComponentModel[] = [];
  private componentsselectedchild: ComponentModel[];
  selectedType: ClassificationtModel;
  filter: string;
  isLoading:boolean;
  selectedClassification: ClassificationtModel;
  classificationtlist: ClassificationtModel[];
  dialogRef: any;
  cmp: ComponentModel;
  measurementModel: MesurementModel;
  //dataComponentSelected = new Observable<ComponentModel[]>();

  constructor(private service: ComponentService,
    private serviceprice: PriceService,
    private serviceClassification: ClassificationService,
    public dialog: MatDialog
    , @Inject(MAT_DIALOG_DATA) public component: ComponentModel
  ) { }

  ngOnInit(): void {
    this.service.getComponentsWithPrice().subscribe((cm) => {
      this.components = cm;
      this.components_backup = cm;
      console.log(cm);
      this.components.forEach(c =>{ 
        const grouped = this.service.groupBy(c.offer, o =>o.economicareacode);
        console.log(grouped);
        });

      
      this.service.groupBy(this.components, c => c.O);
      localStorage.setItem('components', JSON.stringify(this.components));
    }, (err) => {
      alert('error when trying to get components, please retry later !');
      console.error(err);
    });
    
    this.serviceClassification.getClassification().subscribe((cl) => {
      this.classificationtlist = cl;
    });

    // this.service.getComponents().subscribe((cm) => {
    //   this.components = cm;
    // }, (err) => {
    //   alert('error when trying to get components, please retry later !');
    //   console.error(err);
    // });
  }

  ClassificationChanged(data: any) {
    if (data && data.value && data.value.id > 0) {
      this.service.getComponentsbyclassification(data.value.id).subscribe((cm) => {
        this.components = cm;
      }, (err) => {
        alert('error when trying to get components, please retry later !');
        console.error(err);
      });
    }
    else {
      this.components = this.components_backup;
    }
  }

  handleChildButtonClick(value: any) {
    if (value && value.length) {
     
      this.componentsselectedchild = value;
    }
    else {
      this.componentsselectedchild = [];
    }
    this.service.setComponentSelected(this.componentsselectedchild);
    //console.log(this.componentsselectedchild);
   // this.service.emitComponentSelectedSubject();
    // this.dataComponentSelected= new Observable(this.componentsselectedchild);
    //this.service.currentMessage.subscribe(this.componentsselectedchild) // this.componentsselectedchild
  }

  DisplayPrices() {
    if (this.componentsselectedchild && this.componentsselectedchild[0] && this.componentsselectedchild[0].id > 0) {
      this.serviceprice.getPricesByComponent(this.componentsselectedchild[0].id).subscribe((pr) => {
        this.dialogRef = this.dialog.open(PriceTableComponent, {
          width: '800px', height: '300px', disableClose: true,
          data: {}
        });
        this.dialogRef.componentInstance.prices = pr;
        this.dialogRef.componentInstance.ispopup = true;
      });

    }
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    let filtred_components = this.components_backup;
    if (this.selectedType) {
    }
    if (filterValue) {
      filtred_components = filtred_components.filter(cl => cl.renaultpartnumber.toLocaleLowerCase().includes(filterValue)
        || (cl.birthdate != null && cl.birthdate.toDateString().toLocaleLowerCase().includes(filterValue))
        || cl.alliancespecific != null && cl.alliancespecific.toLocaleLowerCase().includes(filterValue) || cl.comment != null && cl.comment.toLocaleLowerCase().includes(filterValue)
        || cl.technicalfile != null && cl.technicalfile.toLocaleLowerCase().includes(filterValue)
        || cl.npdm != null && cl.npdm.toLocaleLowerCase().includes(filterValue)
        || cl.mgv != null && cl.mgv.toLocaleLowerCase().includes(filterValue)
        || cl.sharepoint != null && cl.sharepoint.toLocaleLowerCase().includes(filterValue)

      );
    }
    console.log(filtred_components);
    this.components = filtred_components.slice(0);

  }    
  
  DisplayAddComponent() {
    this.dialogRef = this.dialog.open(ComponentAddComponent);
  }

  DeleteComponent() {
    if (!this.componentsselectedchild[0]) {
      alert('please select at least one item');
    }
    else 
    {
      let num = this.componentsselectedchild.length;
      console.log(this.componentsselectedchild);
      let confirmed = confirm('you have selected ' + num + ' item(s), are sure you want to delete ?');
      if (confirmed) {
        let list_ids = '';
        for (let i = 0; i < num; i++) {
          list_ids += this.componentsselectedchild[i].id.toString() + ',';
        }
        //this.service.deleteClassification(list_ids).subscribe(()=>{
        //   alert(num.toString()+' item(s) deleted ');
        //   this.RefreshGrid();
        // },()=>{
        //   alert('an error happened when delete classification !');
        //   this.selection.clear();
        // });

      }

    }
  }
  
  DisplayUpdateComponent() {}
  
  openDialog() {

    this.cmp = this.componentsselectedchild[0];
    console.log('Composant selectionné de la liste');
    console.log(this.cmp);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      renaultpartnumber: this.cmp.renaultpartnumber,
      nissanpartnumber: this.cmp.nissanpartnumber,
      classificationType: this.cmp.classificationType,
      tta: this.cmp.tta,
      technicalClassification: this.cmp.technicalClassification,
      strategicClassification: this.cmp.strategicClassification,
      birthdate: this.cmp.birthdate,
      alliancespecific: this.cmp.alliancespecific,
      comment: this.cmp.comment,
      technicalfile: this.cmp.technicalfile,
      npdm: this.cmp.npdm,
      mgv: this.cmp.mgv,
      sharepoint: this.cmp.sharepoint,
      replaceBy: this.cmp.replaceBy,
      designation: this.cmp.designation,
      creationDate: this.cmp.creationDate,
      id_mesurementunit: this.cmp.id_mesurementunit,
      id_classification: this.cmp.id_classification
    }
    this.dialog.open(ComponentAddComponent, dialogConfig);
    // this.dialogRef = this.dialog.open(ComponentAddComponent, {width: '800px',height:'300px', disableClose:true,
    //       data: {}});
    console.log(this.componentsselectedchild);
  }

  DisplayDetails() {
    this.cmp = this.componentsselectedchild[0];
    console.log('Afficher detail des Composants selectionnés de la liste');
    console.log(this.cmp);
    this.dialog.open(ComponentDetailsComponent, {data: this.cmp});
  }

  DisplayCurves(){
    this.cmp = this.componentsselectedchild[0];
    this.dialog.open(ComponentCurvesComponent, {data: this.cmp});
  }
}
