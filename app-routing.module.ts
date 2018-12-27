import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { FullLayoutComponent } from './Layouts/full/full-layout.component';
import { Full_ROUTES } from './shared/routes/full-layout.routes';
import { PartialLayoutComponent } from './Layouts/partial/partial-layout.component';
import { Partial_ROUTES } from './shared/routes/partial-layout.routes';




const appRoutes: Routes = [

  // {
  //   path: '',
  //   redirectTo: 'admin',
  //   pathMatch: 'full'
  // },
  { path: '', component: PartialLayoutComponent, children: Partial_ROUTES },
  { path: '', component: FullLayoutComponent, children: Full_ROUTES },

  // {
  //   path: '**',
  //   redirectTo: ''
  // },


  // { path: '',
  //   redirectTo: '/alert_examples',
  //   pathMatch: 'full'
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
