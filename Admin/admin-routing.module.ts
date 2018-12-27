import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserDetailsComponent } from './user-register/user-details/user-details.component';
import { EditUserDetailsComponent } from './user-register/edit-user-details/edit-user-details.component';
import { CreateDeliveryChannelComponent } from './DeliveryChannel/create-delivery-channel/create-delivery-channel.component';
import { DeliveryChannelDetailsComponent } from './DeliveryChannel/delivery-channel-details/delivery-channel-details.component';
import { EditDeliveryChannelComponent } from './DeliveryChannel/edit-delivery-channel/edit-delivery-channel.component';
import { CreateDatasourceComponent } from './Datasource/create-datasource/create-datasource.component';
import { EditDatasourceComponent } from './Datasource/edit-datasource/edit-datasource.component';
import { DatasourceDetailsComponent } from './Datasource/datasource-details/datasource-details.component';
import { CreateChannelTypeComponent } from './MasterForms/ChannelMaster/ChannelType/create-channel-type/create-channel-type.component';
import { ChannelNameDetailsComponent } from './MasterForms/ChannelName/channel-name-details/channel-name-details.component';
import { CreateChannelNameComponent } from './MasterForms/ChannelName/create-channel-name/create-channel-name.component';
import { ChannelTypeDetailsComponent } from './MasterForms/ChannelMaster/ChannelType/channel-type-details/channel-type-details.component';
import { SuperAdminHomeComponent } from './SuperAdmin/super-admin-home/super-admin-home.component';
import { ShowAllUserListComponent } from './SuperAdmin/show-all-user-list/show-all-user-list.component';
import { ShowInActiveUsersComponent } from './SuperAdmin/show-in-active-users/show-in-active-users.component';
import { AlertListComponent } from './SuperAdmin/alert-list/alert-list.component';
import { LicenseDetailsComponent } from './LicenseDetails/license-details/license-details.component';


const routes: Routes = [

    // {
    //     path: 'supDashboard ',
    //     component: SuperAdminDashboardComponent,  
    //     pathMatch:'full'     
    // },
    //User start
    {
        path: 'createUser',
        component: UserRegisterComponent,  
        pathMatch:'full'     
    },
    {
        path: 'userDetails',
        component: UserDetailsComponent,  
        pathMatch:'full'     
    },
    {
        path: 'editUserDetails/:id',
        component: EditUserDetailsComponent,  
        pathMatch:'full'     
    },
    //**************************************** */
    //Delivery Channel start
    {
        path: 'createDeliveryChannel',
        component: CreateDeliveryChannelComponent,  
        pathMatch:'full'     
    },
    {
        path: 'deliveryChannelDetails',
        component: DeliveryChannelDetailsComponent,  
        pathMatch:'full'     
    },
    {
        path: 'editDeliveryChannel/:id',
        component: EditDeliveryChannelComponent,  
        pathMatch:'full'     
    },
    //************************************************ */
    //Datasource part
    {
        path: 'createDataSource',
        component: CreateDatasourceComponent,  
        pathMatch:'full'     
    },
    {
        path: 'editDataSource/:id',
        component: EditDatasourceComponent,  
        pathMatch:'full'     
    },
    {
        path: 'dataSourceDetails',
        component: DatasourceDetailsComponent,  
        pathMatch:'full'     
    },
    //Admin Master forms Routing
    {
        path: 'createChannelType',
        component: CreateChannelTypeComponent,  
        pathMatch:'full'     
    },
    {
        path: 'channelTypeDetails',
        component: ChannelTypeDetailsComponent,  
        pathMatch:'full'     
    },

    {
        path: 'createChannelName',
        component: CreateChannelNameComponent,  
        pathMatch:'full'     
    },
    {
        path: 'channelNameDetails',
        component: ChannelNameDetailsComponent,  
        pathMatch:'full'     
    },
    //Super Admin Dashboard
    {
        path: 'sAdminHome',
        component: SuperAdminHomeComponent,  
        pathMatch:'full'     
    },
    {
        path: 'allUserList',
        component: ShowAllUserListComponent,  
        pathMatch:'full'     
    },
    {
        path: 'inActiveUsers',
        component: ShowInActiveUsersComponent,  
        pathMatch:'full'     
    },
    {
        path: 'sAlertList',
        component: AlertListComponent,  
        pathMatch:'full'     
    },
    //License Details
    
    {
        path: 'LicenseDetails',
        component: LicenseDetailsComponent,  
        pathMatch:'full'     
    }


    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }