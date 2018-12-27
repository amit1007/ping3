import { Component, OnInit,ViewChild , Output, EventEmitter} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../../LoginModule/login.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { existentialTypeParam } from 'babel-types';
import { promise } from 'protractor';
import { resolve, reject } from 'q';
import PasswordField from 'material-ui-password-field'
import { AdminService } from 'src/app/Admin/admin.service';
import { SuperAdminService } from 'src/app/SuperAdmin/super-admin.service';
import { AppService } from 'src/app/app.service';
import {AppComponent} from '../../../app.component'
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { state } from '@angular/animations';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-license-details',
  templateUrl: './license-details.component.html',
  styleUrls: ['./license-details.component.css']
})
export class LicenseDetailsComponent implements OnInit {
  RenewStatus:boolean=false;
  userID:string;
  UserName:string
  KeyStatus:string;
  ActivationDate:string;
  UserRole:string;
  ExpirationDate:string;
  DaysCounter:string;
  DaysRemainig:string;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private api: LoginService,
    private formBuilder: FormBuilder,
    public snackbar: MatSnackBar,
    public superAdminService:SuperAdminService,
    private commanAPI:AppService,
    public PingAdminFlag:AppComponent,
    private _flashMessagesService:FlashMessagesService 
  ) {}

  ngOnInit() {
    this.commanAPI.getLoggeddUser().subscribe(res=>{
      this.userID=res.PingUserID
      this.UserName=res.PingUserName     
      this.UserRole=res.PingRole
      this.api.CheckDateLocker().subscribe(resLic=>{
        console.log("License Data",resLic)
      this.KeyStatus=resLic.LicenceStatus
        this.ActivationDate=resLic.InstallationDate
        this.ExpirationDate=resLic.ExpiryDate
        this.DaysCounter=resLic.DayCounter
        this.DaysRemainig=resLic.DaysRemaining
        if(this.KeyStatus!="active")
        {
          this.RenewStatus=false;
        }
        else
        {
          this.RenewStatus=true;
        }
      });
    },err=>{

      console.log(err)
    });
  }

  renewKey(){
    console.log("Create New Registery Key");
    this.api.RenewLicense().subscribe(res=>{
      console.log("New RegisteryKey In Registery",res)
      this.router.navigate(['/login']); 
    });  

  }

}
