import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../../../../admin.service';
import { AppService } from '../../../../../app.service';


@Component({
  selector: 'app-create-channel-type',
  templateUrl: './create-channel-type.component.html',
  styleUrls: ['./create-channel-type.component.css']
})
export class CreateChannelTypeComponent implements OnInit {
  matcher;
  ChannelType: FormGroup;
  PingUserID: string;
  ChannelTypeID: String;
  ChannelTypeName: String;   
    InsertBy : String='QlikAdmin';   
    UpdateBy : String; 
    count: number=0;
    LoginUserID: string = 'User101';
    userID: string = '';
    uID: any =  '';
    LoggedUserName :string='';
    LoggedUSerID:string='';
    usercount:String='';
    constructor(private router: Router,private commanApi:AppService,  private api: AdminService, private formBuilder: FormBuilder,public snackbar: MatSnackBar,) { }
  
    ngOnInit() {
      this.commanApi.getLoggeddUser().subscribe( res => {
        this.LoggedUserName=res.PingUserName;
        this.LoggedUSerID=res.PingUserID; 
        this.ChannelType.get('InsertBy').setValue(res.PingUserName) 
        this.ChannelType.get('LoginUserID').setValue(res.PingUserID)
       // console.log("USr Name"+this.LoggedUserName+"  Id"+this.LoggedUSerID) 
        this.api.getChannelTypes()
      .subscribe(res => {
        this.count=res.length;
        this.count=this.count+1;
        this.userID = 'ChannelType-' + this.count ;
        this.uID = this.ChannelType.get('ChannelTypeID').setValue(this.userID);
  
      }, err => {
        console.log(err);
        this.usercount='0';
      });
  
     
                            
      
      },err => {
        console.log("err");
        console.log(err);
        this.router.navigate(['/login']);
      })
      this.ChannelType = this.formBuilder.group({
        // id: '',
        ChannelTypeID:[this.uID,Validators.required],
        ChannelTypeName: [null,Validators.required],
        InsertBy : '',
        LoginUserID:'',    
      })  
       
    }
    onFormSubmit(form:NgForm) {
      console.log('Form Submited ',form);
      this.api.postChannelType(form)
        .subscribe(res => {
            //let id = res['_id'];
            this.snackbar.open('Succesfully Submitted Channel Type Details', 'Close', {
              duration: 3000,
            });
            this.router.navigate(['/admin/channelTypeDetails']);
            console.log("Channel Type Record Successfully  Saved....");
          }, (err) => {
            this.snackbar.open('Something went wrong..!!', 'Close', {
              duration: 3000,
            });
            console.log(err);
          });
    }

}

