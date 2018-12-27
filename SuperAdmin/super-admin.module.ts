import { NgModule } from '@angular/core';
import { SuperAdminRoutingModule } from './super-admin-routing.module';
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
// import { MzCardModule } from 'ngx-materialize'

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
import { CreateSuperUserComponent } from './create-super-user/create-super-user.component';
import { SuperAdminDashboardComponent } from './super-admin-dashboard/super-admin-dashboard.component';
import { CreateDataSourceComponent } from './create-data-source/create-data-source.component';
import { LicenseExpiredComponent } from './LicenseScreens/license-expired/license-expired.component';
import { from } from 'rxjs';
    @NgModule({
        declarations: [
         CreateSuperUserComponent,
         SuperAdminDashboardComponent,
         CreateDataSourceComponent,
         LicenseExpiredComponent
        ],
        entryComponents:[
        ],
        imports: [
          CommonModule,
          SuperAdminRoutingModule,
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
        //    MzCardModule
        
          ],
        providers: [],
        bootstrap: []
      })
      export class SuperAdminModule { }