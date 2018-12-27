import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { existentialTypeParam, thisExpression } from 'babel-types';
import { promise } from 'protractor';
import { resolve, reject } from 'q';
import PasswordField from 'material-ui-password-field'
import { AdminService } from 'src/app/Admin/admin.service';
import { SuperAdminService } from 'src/app/SuperAdmin/super-admin.service';
import { LoginService } from 'src/app/LoginModule/login.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import {AppComponent} from '../../../app.component'

@Component({
  selector: 'app-super-admin-home',
  templateUrl: './super-admin-home.component.html',
  styleUrls: ['./super-admin-home.component.css']
})
export class SuperAdminHomeComponent implements OnInit {
  matcher;
  loginForm: FormGroup;
  PingUserName: String='';
  PingRole : String='';
  EmailID:String='';
  password:String='';
loginFlag:boolean=false;
  show =  false;
    ActiveUserCount:string='0';
    DactiveUser:string='0';
    roleStr:string='Administrat';
    pingUserID:string;
    newRole:string;
    loop1:Boolean=true;

  private formSubmitAttempt: boolean;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private api: LoginService,
    private formBuilder: FormBuilder,
    public snackbar: MatSnackBar,
    public superAdminService:SuperAdminService,
    private _flashMessagesService:FlashMessagesService ,
    public PingAdminFlag:AppComponent,  
  ) {}

  ngOnInit() {
    this._flashMessagesService.show(' Your Trial Period For Ping Has Expired Within '+this.PingAdminFlag.LicenseCount,{cssClass:'alert-danger',timeout:5000});     
    this.api.getPingUsersCount().subscribe(res=>{
      console.log(res);
      this.ActiveUserCount=res.body;

    })
    this.api.getDactivePingUsersCount().subscribe(res=>{
      console.log(res);
      this.DactiveUser=res.body;              
    })

  }
  showActiveUsers()
  {
    this.router.navigate(['/admin/allUserList'])
  }
  showDactiveUsers()
  {
    this.router.navigate(['/admin/inActiveUsers'])
  }
  showAlertList()
  {
    this.router.navigate(['/admin/sAlertList'])
  }
}
