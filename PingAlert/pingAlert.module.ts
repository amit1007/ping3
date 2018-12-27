import { NgModule } from '@angular/core';
import { PingAlertRoutingModule } from './pingAlert-routing.module';
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

import { CreatePingAlertComponent } from './create-ping-alert/create-ping-alert.component';
import { AppModule } from '../app.module';
import { AlertInboxComponent } from './alert-inbox/alert-inbox.component';
import { AlertHistoryComponent } from './alert-history/alert-history.component';
import { EditPingAlertComponent } from './edit-ping-alert/edit-ping-alert.component';
import { ViewPingAlertComponent } from './view-ping-alert/view-ping-alert.component';
import { PingAlertDetailsComponent } from './ping-alert-details/ping-alert-details.component';
@NgModule({
  declarations: [
    CreatePingAlertComponent,
    AlertInboxComponent,
    AlertHistoryComponent,
    EditPingAlertComponent,
    ViewPingAlertComponent,
    PingAlertDetailsComponent
  ],
  imports: [
    CommonModule,
    
    PingAlertRoutingModule,
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
export class PingAlertModule { }