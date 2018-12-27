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
  selector: 'app-license-expired',
  templateUrl: './license-expired.component.html',
  styleUrls: ['./license-expired.component.css']
})
export class
 LicenseExpiredComponent implements OnInit {
  frmLicense: FormGroup;
  constructor(
    private api: LoginService,
    private router: Router,
  ) { }

  ngOnInit() {
  }
  renewKey(){
    console.log("Create New Registery Key");
    this.api.RenewLicense().subscribe(res=>{
      console.log("New RegisteryKey In Registery",res)
      this.router.navigate(['/login']); 
    });  

  }

}
