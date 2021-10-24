import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassificationRoutingModule } from './classification-routing.module';
import { ClassificationRootComponent } from './classification-root/classification-root.component';
import { MaterialModule } from '../shared/material/material.module';
import { ClassificationListComponent } from './classification/classification-list/classification-list.component';
import { ClassificationtypeListComponent } from './type/classificationtype-list/classificationtype-list.component';
import { ClassificationautofillListComponent } from './autofill/classificationautofill-list/classificationautofill-list.component';
import { ClassificationtypeService } from './data/services/classificationtype.service';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClassificationAddComponent } from './classification/classification-add/classification-add.component';
import { ClassificationService } from './data/services/classification.service';
import { ClassificationautofillAddComponent } from './autofill/classificationautofill-add/classificationautofill-add.component';
import { ClassificationautofillService } from './data/services/classificationautofill.service';
import { AutofilllistChildComponent } from './autofill/autofilllist-child/autofilllist-child.component';
import { ClassificationtypeAddComponent } from './type/classificationtype-add/classificationtype-add.component';
import { ClassificationTableComponent } from './classification/classification-table/classification-table.component';
import { StoreModule } from '@ngrx/store';
import {classificationReducer} from './state/classification.reducer'


@NgModule({
  declarations: [
    ClassificationRootComponent, ClassificationListComponent, ClassificationtypeListComponent, ClassificationautofillListComponent, ClassificationtypeAddComponent, ClassificationAddComponent, ClassificationautofillAddComponent, AutofilllistChildComponent, ClassificationTableComponent],
  imports: [
    CommonModule,
    ClassificationRoutingModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forFeature('classification',classificationReducer)      
    
  ],
  providers: [ClassificationtypeService,ClassificationService,ClassificationautofillService],
  entryComponents: [ClassificationtypeAddComponent,ClassificationAddComponent,ClassificationautofillAddComponent]
})
export class ClassificationModule { }
