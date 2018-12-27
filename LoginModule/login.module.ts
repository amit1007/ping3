import { NgModule } from '@angular/core';
import { LoginRoutingModule } from './login-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { BrowserModule } from '@angular/platform-browser';
import {Ng2TelInputModule} from 'ng2-tel-input';
import { HttpClientModule } from '@angular/common/http';
import { SimpleNotificationsModule } from 'angular2-notifications';

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
import { LoginComponent } from './login/login.component';
  //Components
@NgModule({
  declarations: [      
   LoginComponent,  
  ],
 
  imports: [
    CommonModule,
    LoginRoutingModule,
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
    FlashMessagesModule.forRoot()
  
    ],
  providers: [  ],
  bootstrap: []
})
export class LoginModule { }