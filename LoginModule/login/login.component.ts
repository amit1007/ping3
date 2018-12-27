import { Component, OnInit,ViewChild , Output, EventEmitter} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../LoginModule/login.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { existentialTypeParam } from 'babel-types';
import { promise } from 'protractor';
import { resolve, reject } from 'q';
import PasswordField from 'material-ui-password-field'
import { AdminService } from 'src/app/Admin/admin.service';
import { SuperAdminService } from 'src/app/SuperAdmin/super-admin.service';
import { AppService } from 'src/app/app.service';
import {AppComponent} from '../../app.component'
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { state } from '@angular/animations';
import { FlashMessagesService } from 'angular2-flash-messages';

var states = {
  NotApplicable:0,   
   Active:1,
   Expired:2,
   Abort:3,
   LicenseExpired:3,
   KeyCreated:5,
   Keynotexits:6,
   KeyExits:7,
   KeyAdded:8,
   CounterExeed:9
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  
  matcher;
  loginForm: FormGroup;
  PingUserName: String='';
  PingRole : String='';
  EmailID:String='';
  password:String='';
  loginFlag:boolean=false;

    show =  false;
    puserRole:string='';
    userRole:boolean=false;
    roleStr:string='Administrat';
    pingUserID:string;
    newRole:string;
    loop1:Boolean=true;

  private formSubmitAttempt: boolean;

  AAccess = [
    { id: 1, name: 'Use Qlik Security' },
    { id: 2, name: 'Manage in Ping' }
  ];


  RRole = [
    { id: 2, name: 'Administrator' },
    { id: 3, name: 'Connnection Manager' },
    { id: 4, name: 'User' }
  ];
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

    this.api.CheckDateLocker().subscribe(res=>{
      console.log("DateLocker Status",res);
      if(res.LicenceStatus==states.Expired)
      {
        console.log("License Expired")
        this.router.navigate(['/SuperAdmin/LicenseExpired']);
      }
      else if(res.LicenceStatus==states.NotApplicable)
      {
        console.log("Key Not Added In to Registry")
        this.api.AddRegKey().subscribe(res=>{
          console.log("Licence Setup  "+res)
        })
      }
      else if(res.LicenceStatus==states.KeyExits)
      {
        console.log("Key Exist")
      }
      else if(res.LicenceStatus==states.CounterExeed)
      {
        console.log("counter Exeed")
        this.router.navigate(['/SuperAdmin/LicenseExpired']);
      }
      else if(res.LicenceStatus==states.Active)
      {
        this.PingAdminFlag.LicenseCount=res.CounterValue;
        console.log("License Active")
        this.commanAPI.getLoggeddUser().subscribe(res=>{
          if(res!=null)
          {
            this.router.navigate(['/pingAlert/alertInbox']);   
          }
          else
          {
            this.api.getPingUsersCount().subscribe(res=>{
              console.log(res);
                if(res.body>0)
                {
                      
                }
                else
                {
                  console.log("In Login Form")
                  this.router.navigate(['/SuperAdmin/createSuperUser'])
                }
               
            })
          }
          
        },err => {
          console.log("err");
          console.log(err);
          
          this.api.getPingUsersCount().subscribe(res=>{
            console.log(res);
              if(res.body>0)
              {
                this.router.navigate(['/login']); 
              }
              else
              {
                console.log("In Login Form")
                this.router.navigate(['/SuperAdmin/createSuperUser'])
              }
             
          })
        }) 
      }
    })
   
     
      
   

    this.loginForm = this.formBuilder.group({
      // id: '',
      // PingUserID:[this.uID,Validators.required],
      PingUserName: [null,Validators.required],
      PingUserDirectory : [null],
      PingUserAccess : new FormControl(this.AAccess),
      EmailID:[null],
      password:[null,Validators.required],
      // PingMemberID : '1',
      // PingGroupID : '1',
      //PingRole : new FormControl(this.RRole,Validators.required),
      // InsertBy : 'Qlik Admin',

    })
 
  }
  toggleCollapse(){
    
  }

  onFormSubmit(form:NgForm) {
    console.log('on submit');
    var redirectURL="";
    this.api.postPingUserLogin(form)
    .subscribe(res => {   
    
      // if(res.UserRole=='SuperAdmin')
      // {

      //   console.log("In Super USer");
      //   if(res.redirect === "/login"){
      //     redirectURL="/login";
      //     this.router.navigate(["/login"]); 
      //     this.snackbar.open('User name or password is wrong..!!', 'Close', {
      //       duration: 3000,
      //     });
      //   } else if (res.redirect === "/pingAlert/alertInbox") {
      //     redirectURL="/SuperAdmin/supDashboard";
      //     this.router.navigate(["/SuperAdmin"]); 
      //     this.snackbar.open('Succesfully Logged In', 'Close', {
      //       duration: 3000,
      //     });
      //   } else {
      //     this.snackbar.open('Network Error', 'Close', {
      //       duration: 3000,
      //     });
      //   } 
      // }
      if(res.UserRole=="SuperAdmin")
          {
            this.PingAdminFlag.pingAdminFlag=true;

            console.log("SuperUser")
            //this.router.navigate(['/admin/sAdminHome'])
            if(res.redirect === "/login"){
              redirectURL="/login";
              this.router.navigate(["/login"]); 
              this.snackbar.open('User name or password is wrong..!!', 'Close', {
                duration: 3000,
              });
            } else if (res.redirect === "/pingAlert/alertInbox") {
              this.PingAdminFlag.pingAdminFlag=true;
              redirectURL="/admin/sAdminHome";   
              this.router.navigate(["/admin/sAdminHome"]);   
             
              this.snackbar.open('Succesfully Logged In', 'Close', {
                duration: 3000,
              });              
              console.log("111"+this.PingAdminFlag.pingAdminFlag)
            } else {
              this.snackbar.open('Network Error', 'Close', {
                duration: 3000,
              });
            } 
          }
          else if(res.UserRole=="Administrator")
          {
            this.PingAdminFlag.pingAdminFlag=true;
            console.log("Normal Admin");
            if(res.redirect === "/login"){
                redirectURL="/login";
                this.router.navigate(["/login"]); 
                this.snackbar.open('User name or password is wrong..!!', 'Close', {
                  duration: 3000,
                });
              } else if (res.redirect === "/pingAlert/alertInbox") {
                redirectURL="/pingAlert/alertInbox";   
                this.router.navigate(["/pingAlert/alertInbox"]); 
                  
                this.snackbar.open('Succesfully Logged In', 'Close', {
                  duration: 3000,
                });
                
              } else {
                this.snackbar.open('Network Error', 'Close', {
                  duration: 3000,
                });
              } 

          }
          else
          {
            this.PingAdminFlag.pingAdminFlag=false;
            console.log("User");
            if(res.redirect === "/login"){
                redirectURL="/login";
                this.router.navigate(["/login"]); 
                this.snackbar.open('User name or password is wrong..!!', 'Close', {
                  duration: 3000,
                });
              } else if (res.redirect === "/pingAlert/alertInbox") {
                redirectURL="/pingAlert/alertInbox";   
                this.router.navigate(["/pingAlert/alertInbox"]);       
                this.snackbar.open('Succesfully Logged In', 'Close', {
                  duration: 3000,
                });
              } else {
                this.snackbar.open('Network Error', 'Close', {
                  duration: 3000,
                });
              } 
          }
   
        // if(res.redirect === "/login"){
        //   redirectURL="/login";
        //   this.router.navigate(["/login"]); 
        //   this.snackbar.open('User name or password is wrong..!!', 'Close', {
        //     duration: 3000,
        //   });
        // } else if (res.redirect === "/pingAlert/alertInbox") {
        //   redirectURL="/pingAlert/alertInbox";   
        //   this.router.navigate(["/pingAlert/alertInbox"]);       
        //   this.snackbar.open('Succesfully Logged In', 'Close', {
        //     duration: 3000,
        //   });
        // } else {
        //   this.snackbar.open('Network Error', 'Close', {
        //     duration: 3000,
        //   });
        // } 
      
        
       
      }, (err) => {
        this.snackbar.open('User name or password is wrong..!!', 'Close', {
          duration: 3000,
        });
        console.log(err);
      });
  }


}
