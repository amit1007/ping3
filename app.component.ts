import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// import { ApiService } from './api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {User} from './../../models/User';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  LicenseCount:string;
  show =  false;
    userRole:boolean=true;
    roleStr:string='admin';
    pingUserID:string;
  title = 'app';
  pingAdminFlag:boolean=false;

  private config = { hour: 7, minute: 15, meriden: 'PM', format: 12 };
  constructor(
    private fb: FormBuilder,
    // private authService: AuthService,
    private router: Router,
    // private api: ApiService,
    private formBuilder: FormBuilder,
    public snackbar: MatSnackBar,
  ) { }

  ngOnInit(){
    // if(this.authService.LoginToken!=null)
    // {
    //   this.userRole=false;
    // }
    // else{
    //   this.userRole=false;
    // }
  }
}

