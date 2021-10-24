import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentrootComponent } from './componentroot/componentroot.component';
import { ComponentRoutingModule } from './component-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material/material.module';
import { ComponentTableComponent } from './component/component-table/component-table.component';
import { ComponentListComponent } from './component/component-list/component-list.component';
import { ComponentService } from './data/service/component.service';
import { ClassificationService } from '../moduleclassification/data/services/classification.service';
import { PriceTableComponent } from './price/price-table/price-table.component';
import { PriceListComponent } from './price/price-list/price-list.component';
import { PriceService } from './data/service/price.service';
import { ComponentAddComponent } from './component/component-add/component-add.component';
import { ComponentDetailsComponent } from './component/component-details/component-details.component';
import { ComponentCurvesComponent } from './component/component-curves/component-curves.component';

import { AnalogService } from './data/service/analog.service';
import {A11yModule} from '@angular/cdk/a11y';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import {MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {ClassificationtypeService} from '../moduleclassification/data/services/classificationtype.service';
import { MesurementService } from './data/service/mesurement.service';
import { ChartsModule } from 'ng2-charts';
import { MatFormFieldModule } from '@angular/material/form-field';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//import { HelloComponent } from './component/component-add/hello.component';
import { componentInput } from './component/component-add/component-input.component';
import { HasPriceTableComponent } from './component/has-price-table/has-price-table.component';
import { HasEconomicAreaTableComponent } from './component/has-economic-area-table/has-economic-area-table.component';
import { TableRowComponent } from './component/table-row/table-row.component';

@NgModule({
  declarations: [ComponentrootComponent, ComponentTableComponent, ComponentListComponent, PriceTableComponent, PriceListComponent, ComponentAddComponent, ComponentDetailsComponent, ComponentCurvesComponent
    ,componentInput, HasPriceTableComponent, HasEconomicAreaTableComponent, TableRowComponent
  ],
  imports: [
    CommonModule,
    ComponentRoutingModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    A11yModule,
    ClipboardModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    PortalModule,
    ScrollingModule, 
    ChartsModule,
    MatFormFieldModule, 
    //BrowserAnimationsModule
  ],
  providers:[ComponentService,ClassificationService,PriceService,AnalogService,ClassificationtypeService,MesurementService,{ provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }],
  entryComponents: [PriceTableComponent]
})
export class ComponentModule { }
