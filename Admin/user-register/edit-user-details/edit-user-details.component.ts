import { Component, OnInit } from '@angular/core';
import { Router ,ActivatedRoute} from '@angular/router';
import { trigger, style, animate, transition } from '@angular/animations';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormArray } from '@angular/forms';
import { ParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../../admin.service';
import { AppService } from '../../../app.service';

@Component({
  selector: 'app-edit-user-details',
  templateUrl: './edit-user-details.component.html',
  styleUrls: ['./edit-user-details.component.css']
})
export class EditUserDetailsComponent implements OnInit {
  matcher;
  pingUserRoleFrm: FormGroup;
  pingUserID: any = '';
  AAccess = [
    { id: 1, name: 'Use Qlik Security' },
    { id: 2, name: 'Manage in Ping' }
  ];


  RRole = [
    { id: 2, name: 'Administrator' },
    { id: 3, name: 'Connnection Manager' },
    { id: 4, name: 'User' }
  ];
  constructor(private route: ActivatedRoute,private commanAPI :AppService, private api: AdminService, private router: Router,
    private formBuilder: FormBuilder,public snackbar: MatSnackBar,    ) { }

    ngOnInit() {
      this.commanAPI.getLoggeddUser().subscribe(res=>{
        // console.log('route succesfully');
        // console.log(this.route.snapshot.params['id']);
        // this.onEdit(this.route.snapshot.params['id']);
    
        console.log('test route succesfully');
        console.log(this.route.snapshot.params['id']);
        this.onEdit(this.route.snapshot.params['id']);
  
      },err=>{
        console.log("Session Expired in Edit user")
        this.router.navigate(['/login'])
      })
     
      this.pingUserRoleFrm=this.formBuilder.group({
        // PingUserID:[null,Validators.required],
        // PingUserName:[null,Validators.required],
        // PingUserDirectory :[null,Validators.required],
        // PingUserAccess : [null,Validators.required],
        // PingMemberID :'',
        // PingGroupID : '',
        // PingRole : [null,Validators.required],
        // InsertBy : '',
        // EmailID:[null,Validators.required],
        // password:[null,Validators.required],

        PingUserID:'',
        PingUserName:'',
        PingUserDirectory :'',
        PingUserAccess : '',
        PingMemberID :'',
        PingGroupID : '',
        PingRole : '',
        InsertBy : '',
        EmailID:'',
        password:'',

      })
    }
    onEdit(id) {
      console.log('In Edit alert');
      console.log(id);
      this.api.getPingUserIDDetails(id).subscribe( res => {
        console.log('Get Edit Data');
        console.log(res);
  
        const id8 = res._id;
        console.log(id8);
        console.log(res.PingUserID);
        console.log(res.PingUserName);
        console.log(res.PingUserDirectory);
        console.log("Deliverto"+res.PingUserID);
        console.log("Data Sourse"+res.PingUserName);
  
  
         this.pingUserRoleFrm.get('PingUserID').setValue(res.PingUserID);
         this.pingUserRoleFrm.get('PingUserName').setValue(res.PingUserName);
         this.pingUserRoleFrm.get('PingUserDirectory').setValue(res.PingUserDirectory);
         this.pingUserRoleFrm.get('PingUserAccess').setValue(res.PingUserAccess);
  
         this.pingUserRoleFrm.get('PingMemberID').setValue(res.PingMemberID);
         this.pingUserRoleFrm.get('PingGroupID').setValue(res.PingGroupID);
         this.pingUserRoleFrm.get('PingRole').setValue(res.PingRole);
         this.pingUserRoleFrm.get('InsertBy').setValue(res.InsertBy);
         this.pingUserRoleFrm.get('EmailID').setValue(res.EmailID);
         this.pingUserRoleFrm.get('password').setValue(res.password);
     
      
          // this.frmAlert.setValue(res.frmCntDataSource);
        //  this.frmAlert.setValue(res.frmCntMeasures.pingMeasuresqLabel);
        //  this.frmAlert.setValue(res.frmCntApplication.AppName);
  
        //  this.frmAlert.setValue({
        //   frmCntAlertID: res.frmCntAlertID,
        //   frmCntAlertName: res.frmCntAlertName,
        //   frmCntRecipient: res.frmCntRecipient,  
        //   frmCntDeliverTo: res.frmCntDeliverTo,
        //   frmCntDataSource: res.frmCntDataSource,
        //   frmCntMeasures: res.frmCntMeasures,
        //   frmCntApplication: res.frmCntApplication,
        
        // });
      });
      
    }
    onFormSubmit(form:NgForm) {
      console.log(this.route.snapshot.params['id'])
      this.api.UpdatePingUserRole(this.route.snapshot.params['id'], form)
        .subscribe(res => {
            res['_id']=this.route.snapshot.params['id']
            let id = res['_id'];
            this.snackbar.open('Succesfully updated user Role', 'Close', {
              duration: 3000,
            });
            this.router.navigate(['admin/userDetails']);
          }, (err) => {
            this.snackbar.open('Something went wrong...!!', 'Close', {
              duration: 3000,
            });
            console.log(err);
          }
        );
    }
}
