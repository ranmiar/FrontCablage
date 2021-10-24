import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './shared/material/material.module';
import { SideNavComponent } from './shared/side-nav/side-nav.component';
import { ToolBarComponent } from './shared/tool-bar/tool-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { ChartsModule } from 'ng2-charts';
import { ComponentCurvesComponent } from './modulecomponent/component/component-curves/component-curves.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    ToolBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ChartsModule,
    StoreModule.forRoot({}, {}),
  ],
  providers:  [{provide: LocationStrategy, useClass: HashLocationStrategy}, DatePipe],
  bootstrap: [AppComponent]
})

export class AppModule { 

}
