import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentCurvesComponent } from './component/component-curves/component-curves.component';
import { ComponentrootComponent } from './componentroot/componentroot.component';


const routes: Routes = [
  { path: '', component: ComponentrootComponent },
  {path: 'curves', component: ComponentCurvesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentRoutingModule { }