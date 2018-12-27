import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateSuperUserComponent } from './create-super-user/create-super-user.component';
import { SuperAdminDashboardComponent } from './super-admin-dashboard/super-admin-dashboard.component';
import { CreateDataSourceComponent } from './create-data-source/create-data-source.component';
import { LicenseExpiredComponent } from './LicenseScreens/license-expired/license-expired.component';

const routes: Routes = [
    //User start
    {
        path: '',
        component: SuperAdminDashboardComponent,  
        pathMatch:'full'     
    } ,
    {
        path: 'createSuperUser',
        component: CreateSuperUserComponent,  
        pathMatch:'full'     
    } ,
    {
        path: 'DatasourceMaster',
        component: CreateDataSourceComponent,  
        pathMatch:'full'     
    },
    {
        path: 'LicenseExpired',
        component: LicenseExpiredComponent,  
        pathMatch:'full'     
    }     
      
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminRoutingModule { }