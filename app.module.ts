import { BrowserModule } from '@angular/platform-browser';
import { NgModule,Directive } from '@angular/core';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { ChartsModule } from 'ng2-charts';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import {Ng2TelInputModule} from 'ng2-tel-input';
import { CommonModule } from '@angular/common';

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

import { SimpleNotificationsModule } from 'angular2-notifications';
// import { AlertsModule } from 'angular-alert-module';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { AngularWebStorageModule } from 'angular-web-storage';
import { DataSource } from '@angular/cdk/table';
// import { PingUserRoleEditComponent } from './user-role-creation/ping-user-role-edit/ping-user-role-edit.component';
import { FileSelectDirective} from 'ng2-file-upload/ng2-file-upload';
import { FullLayoutComponent } from './Layouts/full/full-layout.component';
import { LoginComponent } from './LoginModule/login/login.component';
import { CreatePingAlertComponent } from './PingAlert/create-ping-alert/create-ping-alert.component';
import { SharedModule } from './shared/shared.module';
import { HeaderComponent, DialogOverviewExampleDialogComponent } from './shared/header/header.component';
import { PartialLayoutComponent } from './Layouts/partial/partial-layout.component';




// const appRoutes: Routes = [
//   { path: '',
//     redirectTo: '/PingLogin',
//     pathMatch: 'full'
//   },
// ];

@NgModule({
  declarations: [
    AppComponent,   
    FullLayoutComponent,
    PartialLayoutComponent,
    HeaderComponent,
    DialogOverviewExampleDialogComponent   
  ],
  imports: [
                // RouterModule.forRoot(appRoutes),
                AppRoutingModule,
                SharedModule,
                Ng2TelInputModule,
                CommonModule,
                BrowserModule,
                MatAutocompleteModule,
                FormsModule,
                ReactiveFormsModule,
                Ng2TelInputModule, 
                HttpClientModule,
                BrowserAnimationsModule,
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
                 FlashMessagesModule.forRoot(),
                SharedModule

],
  providers: [],
  entryComponents: [DialogOverviewExampleDialogComponent],
  bootstrap: [AppComponent]
})


export class AppModule { }
