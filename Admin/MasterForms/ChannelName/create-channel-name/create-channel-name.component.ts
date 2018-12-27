import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../../../admin.service';
import { AppService } from '../../../../app.service';
@Component({
  selector: 'app-create-channel-name',
  templateUrl: './create-channel-name.component.html',
  styleUrls: ['./create-channel-name.component.css']
})
export class CreateChannelNameComponent implements OnInit {
  matcher;
  frmChannelName: FormGroup;
  PingUserID: string;
  ChannelID: String;
    ChannelName: String;   
    InsertBy : String;     
    UpdateBy : String; 
    IsActive:Boolean
    count: number=0;
    LoginUserID: string;
    userID: string = '';
    uID: any =  '';
    usercount:String='';
    constructor(private router: Router, private commanAPI:AppService, private api: AdminService, private formBuilder: FormBuilder,public snackbar: MatSnackBar,) { }
    ngOnInit() {
      this.commanAPI.getLoggeddUser()
      .subscribe(res=>{
        this.frmChannelName.get('InsertBy').setValue(res.PingUserName) 
        this.frmChannelName.get('LoginUserID').setValue(res.PingUserID)       
        this.api.getChannelNames()
        .subscribe(res => {
          console.log(res);
          this.count=res.length;
          this.count=this.count+1;
          this.userID = 'Channel-' + this.count ;
          this.uID = this.frmChannelName.get('ChannelID').setValue(this.userID);
    
        }, err => {
          console.log(err);
          this.usercount='0';
        });
      },err => {
        console.log("err");
        console.log(err);
        this.router.navigate(['/login']);
      }) 
      this.frmChannelName = this.formBuilder.group({
        // id: '',
        ChannelID:[this.uID,Validators.required],
        ChannelName: [null,Validators.required],
        InsertBy : [''],
        LoginUserID:[''],
      }) 
       
    }
  
    onFormSubmit(form:NgForm) {
      this.api.postChannelName(form)
        .subscribe(res => {
            this.snackbar.open('Succesfully submitted channel details', 'Close', {
              duration: 3000,
            });
            this.router.navigate(['/admin/channelNameDetails']);
            console.log("Successfully Record Saved....");
          }, (err) => {
            this.snackbar.open('Something went wrong..!!', 'Close', {
              duration: 3000,
            });
            console.log(err);
          });
    }

}
