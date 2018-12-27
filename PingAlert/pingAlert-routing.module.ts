import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatePingAlertComponent } from './create-ping-alert/create-ping-alert.component';
import { AlertInboxComponent } from './alert-inbox/alert-inbox.component';
import { AlertHistoryComponent } from './alert-history/alert-history.component';
import { EditPingAlertComponent } from './edit-ping-alert/edit-ping-alert.component';
import { ViewPingAlertComponent } from './view-ping-alert/view-ping-alert.component';
import { PingAlertDetailsComponent } from './ping-alert-details/ping-alert-details.component';

const routes: Routes = [    
    {
        path: 'createAlert',
        component: CreatePingAlertComponent,
    },   
    {
        path: 'alertInbox',
        component: AlertInboxComponent,               
    }, 
    {
        path: 'alertHistory',
        component: AlertHistoryComponent,               
    },
   
    {
        path: 'editAlert/:id',
        component: EditPingAlertComponent,               
    },
    
    {
        path: 'viewAlertDetails/:id',
        component: ViewPingAlertComponent,               
    },
    {
        path: 'historyDetails/:id',
        component: PingAlertDetailsComponent,               
    }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PingAlertRoutingModule { }