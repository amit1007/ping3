import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { BrowserModule } from '@angular/platform-browser';
import {Ng2TelInputModule} from 'ng2-tel-input';
import { HttpClientModule } from '@angular/common/http';
import { SimpleNotificationsModule } from 'angular2-notifications';
// import { AlertsModule } from 'angular-alert-module';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { AngularWebStorageModule } from 'angular-web-storage';
import { ChartsModule } from 'ng2-charts';
// material import
import {
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatIconModule,
  MatSelectModule,
  MatButtonModule,
  MatCardModule, MatTooltipModule,
  MatListModule, MatToolbarModule,
  MatFormFieldModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatSlideToggle,
  MatSlideToggleModule, MatRadioModule,
  MatTabsModule, MatCheckboxModule, MatProgressBarModule, MatExpansionModule, 
  MatStepperModule, MatDialogModule, MatAutocompleteModule} from '@angular/material';
  //Components
  import { UserRegisterComponent } from './user-register/user-register.component';
  
import { UserDetailsComponent } from './user-register/user-details/user-details.component';
import { EditUserDetailsComponent } from './user-register/edit-user-details/edit-user-details.component';
import { CreateDeliveryChannelComponent } from './DeliveryChannel/create-delivery-channel/create-delivery-channel.component';
import { DeliveryChannelDetailsComponent } from './DeliveryChannel/delivery-channel-details/delivery-channel-details.component';
import { EditDeliveryChannelComponent } from './DeliveryChannel/edit-delivery-channel/edit-delivery-channel.component';
import { EditDatasourceComponent } from './Datasource/edit-datasource/edit-datasource.component';
import { DatasourceDetailsComponent } from './Datasource/datasource-details/datasource-details.component';
import { CreateDatasourceComponent } from './Datasource/create-datasource/create-datasource.component';
import { CreateChannelTypeComponent } from './MasterForms/ChannelMaster/ChannelType/create-channel-type/create-channel-type.component';
import { ChannelTypeDetailsComponent } from './MasterForms/ChannelMaster/ChannelType/channel-type-details/channel-type-details.component';
import { CreateChannelNameComponent } from './MasterForms/ChannelName/create-channel-name/create-channel-name.component';
import { ChannelNameDetailsComponent } from './MasterForms/ChannelName/channel-name-details/channel-name-details.component';
import { SuperAdminHomeComponent } from './SuperAdmin/super-admin-home/super-admin-home.component';
import { ShowAllUserListComponent } from './SuperAdmin/show-all-user-list/show-all-user-list.component';
import { ShowInActiveUsersComponent } from './SuperAdmin/show-in-active-users/show-in-active-users.component';
import { AlertListComponent } from './SuperAdmin/alert-list/alert-list.component';
import { LicenseDetailsComponent } from './LicenseDetails/license-details/license-details.component';
// import { SuperAdminDashboardComponent } from '../SuperAdmin/super-admin-dashboard/super-admin-dashboard.component';


@NgModule({
  declarations: [
      
    UserRegisterComponent,
    UserDetailsComponent,
    EditUserDetailsComponent,
    CreateDeliveryChannelComponent,
    DeliveryChannelDetailsComponent,
    EditDeliveryChannelComponent,
    CreateDatasourceComponent,
    EditDatasourceComponent,
    DatasourceDetailsComponent,
    CreateChannelTypeComponent,
    ChannelTypeDetailsComponent,
    CreateChannelNameComponent,
    ChannelNameDetailsComponent,
    SuperAdminHomeComponent,
    ShowAllUserListComponent,
    ShowInActiveUsersComponent,
    AlertListComponent,
    LicenseDetailsComponent,
    
  ],
  entryComponents:[
    UserRegisterComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule ,
    ReactiveFormsModule,   
    Ng2TelInputModule, 
    HttpClientModule,    
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatToolbarModule,
    MatStepperModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatListModule, MatTooltipModule,
    AngularWebStorageModule , ChartsModule, MatSnackBarModule,
    MatRadioModule, MatTabsModule, MatCheckboxModule,MatProgressBarModule, MatExpansionModule,
     AmazingTimePickerModule,
    NgxMatSelectSearchModule,
    SimpleNotificationsModule.forRoot(),
    // AlertsModule.forRoot(),
     FlashMessagesModule.forRoot()
  
    ],
  providers: [],
  bootstrap: []
})
export class AdminModule { }