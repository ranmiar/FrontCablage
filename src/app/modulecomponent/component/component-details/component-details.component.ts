import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ComponentModel } from '../../data/model/component.model';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { OfferModel } from '../../data/model/offer.model';

@Component({
  selector: 'app-component-details',
  templateUrl: './component-details.component.html',
  styleUrls: ['./component-details.component.scss']
})
export class ComponentDetailsComponent implements OnInit {

  displayedColumns: string[] = ['renaultpartnumber', 'designation', 'TTA', 'TechnicalClassification', 'StrategicClassification', 'nissanpartnumber', 'unit', 'birthdate', 'alliancespecific', 'comment', 'technicalfile', 'npdm', 'mgv', 'sharepoint', 'creationdate', 'updatedate', 'updateAuthor', 'responsible'];
  displayedColumnsOffer: string[] = [ 'programme', 'unitprice', 'validitydate', 'harnessfactory', 'harnessmaker', 'priceType', 'sizeextentionmin', 'sizeextentionmax', 'manufacturingcountryname', 'economicareacode'];
  dataSource: MatTableDataSource<OfferModel>;
  offreModelList: OfferModel[];
  
  constructor(
    private dialogRef: MatDialogRef<ComponentDetailsComponent>,
   @Inject(MAT_DIALOG_DATA) public component: ComponentModel)
 { 
 }

  ngOnInit(): void {
    console.log("Composant transféré");
    console.log(this.component);
    this.component.id_mesurementunit;
    console.log("offre transféré");
    console.log(this.component.offer);
    if(this.component.offer){
      this.offreModelList = this.component?.offer;
      this.dataSource =  new MatTableDataSource<OfferModel>(this.component?.offer);
      //this.offreModelList = this.component.offer
      console.log("Data source");
      console.log(this.dataSource);
    }
  }

  closepopup() {
    this.dialogRef.close();
  }

}
