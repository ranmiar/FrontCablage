import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ComponentModel } from '../../data/model/component.model';
import { PriceModel } from '../../data/model/price.model';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-component-table',
  templateUrl: './component-table.component.html',
  styleUrls: ['./component-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class ComponentTableComponent implements OnInit {
  expandedEconomicArea: {[key: string]: boolean} = {};
  rows: Row[] = [
    {
      id: "1",
      text1: "text 1.1",
      text2: "text 1.2"
    },
    {
      id: "2",
      text1: "text 2.1",
      text2: "text 2.2",
      children: [
        {
          id: "2.1",
          text1: "text 2.1.1",
          text2: "text 2.1.2",
        },
        {
          id: "2.2",
          text1: "text 2.2.1",
          text2: "text 2.2.2",
        },
      ]
    },
    {
      id: "3",
      text1: "text 3.1",
      text2: "text 3.2"
    },
    {
      id: "4",
      text1: "text 4.1",
      text2: "text 4.2",
      children: [
        {
          id: "4.1",
          text1: "text 4.1.1",
          text2: "text 4.1.2",
        },
        {
          id: "4.2",
          text1: "text 4.2.1",
          text2: "text 4.2.2",
        },
      ]
    },
  ];

  displayedColumns: string[] = ['select', 'renaultpartnumber', 'designation', 'TTA', 'TechnicalClassification', 'StrategicClassification', 'nissanpartnumber', 'unit', 'birthdate', 'alliancespecific', 'comment', 'technicalfile', 'npdm', 'mgv', 'sharepoint', 'creationdate', 'updatedate', 'updateAuthor', 'responsible'];
  displayedColumnsOffer: string[] = ['economicareacode','id_price','id_offer','harnessmaker', 'programme','dateofrecept','factoryCountry','harnessfactory','nominationOffre','sizeExtensionMin','sizeExtensionMax','validitydate','tier1pn','tier2pn','harnesspartnumber','pricelinecomment','manufacuringCountry','purchasingCountry','destinationCountry','currency','priceType','wCOHSCutomCodes','customrate','incotermcode','unitprice','proportionalprice','creationdateprice','updatedateprice','priceUpdateAuthor','collector'];

 // ,'unitprice', 'validitydate', 'harnessfactory', 'harnessmaker', 'priceType', 'sizeextentionmin', 'sizeextentionmax', 'manufacturingcountryname', 'economicareacode'];
  dataSource: MatTableDataSource<ComponentModel>;
  //dataSourcePrice: Price[] = [{ name: 'Prix', description: 'Test prix' }];
  expandedElement: ComponentModel | null;

  manyselection: boolean = false;
  onlyoneselection: boolean = false;
  selection = new SelectionModel<ComponentModel>(true, []);
  selectedcomponent: ComponentModel;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('sortPrice') sortPrice: MatSort;
  @Input() components: ComponentModel[];
  @Output() componentselected = new EventEmitter<ComponentModel[]>();
  dialogRef: any;

  constructor(public dialog: MatDialog) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource<ComponentModel>(this.components);
    console.log(  this.components);
     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sortPrice;
    this.selection.clear();
  }

  ngOnInit(): void {
    //this.components.sort((x, y) => +new Date(x.price.validitydate) - +new Date(y.price.validitydate))
    //.sort((x, y) => +new Date(x.price.validitydate) - +new Date(y.price.validitydate))
    //this.dataSource = new MatTableDataSource<ComponentModel>( this.components);
    //console.log('INITIALISATION AFFICHAGE');

   
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    // this.selection.clear();
  }

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  //  this.selection.clear();
  // }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = (this.dataSource && this.dataSource.data) ? this.dataSource.data.length : 0;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: ComponentModel): string {
    if (!row) {

      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    this.fillselected();
  //  localStorage.setItem('selectedComponent', this.componentselected);
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  fillselected() {
    let num = this.selection.selected.length;
    let list_selected: ComponentModel[] = [];
    for (let i = 0; i < num; i++) {
      list_selected.push(this.selection.selected[i]);
    }
    this.componentselected.next(list_selected);
    localStorage.setItem('selectedComponent', JSON.stringify(list_selected));
  }
  applyFilter(filterValue: string) {
    // this.innerTables.forEach((table, index) => (table.dataSource as MatTableDataSource<Address>).filter = filterValue.trim().toLowerCase());
  }


  isRowClickable(rowIndex: number): boolean {
    return this.rows[rowIndex].children && this.rows[rowIndex].children.length > 0
  }

  
}
export interface Row {
  id: string,
  text1: string,
  text2: string,
  children?: Row[]
}