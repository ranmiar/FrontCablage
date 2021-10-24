import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'classifications',
  loadChildren: () =>
  import('./moduleclassification/classification.module').then(m=>m.ClassificationModule)
  },
  {path: 'components',
  loadChildren: () =>
  import('./modulecomponent/component.module').then(m=>m.ComponentModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
