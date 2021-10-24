import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassificationRootComponent } from './classification-root/classification-root.component';

const routes: Routes = [
  { path: '', component: ClassificationRootComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassificationRoutingModule { }
