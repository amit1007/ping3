import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../../admin.service';
import { AppService } from '../../../app.service';

@Component({
  selector: 'app-create-delivery-channel',
  templateUrl: './create-delivery-channel.component.html',
  styleUrls: ['./create-delivery-channel.component.css']
})
export class CreateDeliveryChannelComponent implements OnInit {
  matcher;
  ChannelNameArr = [
  ];
  ChannelType = [
  ];
  public ShowMobileApp:boolean = false;
  public ShowEmail:boolean = false;
  public ShowEmailDetails:boolean = true;
  frmCreateDeliveryChannel: FormGroup;
  DeliveryChannelID: String='';
  DeliveryChannelName: String='';
  DeliveryChannelType : String='';
  Address : String='';
  PortNo : String='';
  SecurityLayerID : String='';
  EmailUserName : String='';
  Password:String='';
  DefaultSenderEmail:String='';
  InsertBy : String= '';
  usercount:String='';
  count: number=0;
  LoginUserID: string = '';
  APIKey:String='';
  SenderKey:String='';
  Server:String=''
  userID: string = '';
  uID: any =  '';
  selectedChannelValue:any='';
  MobileChannels = [
    { id: 1, name: 'IOS' },
    { id: 2, name: 'Android' }
  ];

  RRole = [
    { id: 2, name: 'Administrator' },
    { id: 3, name: 'Connnection Manager' },
    { id: 4, name: 'User' }
  ];
  constructor(private router: Router,private CommApi:AppService, private api: AdminService, private formBuilder: FormBuilder,public snackbar: MatSnackBar,) { }

  ngOnInit() {
    this.CommApi.getLoggeddUser().subscribe(res=>{
      this.frmCreateDeliveryChannel.get('InsertBy').setValue(res.PingUserName) 
      this.frmCreateDeliveryChannel.get('LoginUserID').setValue(res.PingUserID)
      this.api.getDeliveryCahnnels()
      .subscribe(res => {
       console.log(" count Channel res");console.log(res);
        this.count=res.length;
        this.count=this.count+1;
        this.userID = 'DC-' + this.count ;
        this.uID = this.frmCreateDeliveryChannel.get('DeliveryChannelID').setValue(this.userID);
  
      }, err => {
        console.log(err);
        this.usercount='0';
      });
  
     //  this.api.getAllDeliveryCahnnels()
     //  .subscribe(res => {
     //    console.log("********* New Method"+res);
     //    this.count=res.length;
     //    this.count=this.count+1;
     //    this.userID = 'DC-' + this.count ;
     //    this.uID = this.frmCreateDeliveryChannel.get('DeliveryChannelID').setValue(this.userID);
     //   console.log("******????"+this.userID)
     //  }, err => {
     //    console.log(err);
     //    this.usercount='0';
     //  });
  
      this.api.getChannelNames()
      .subscribe(res => {
      console.log(res);
      for (var i = 0; i < res.length; i++) {
                  var ChannelID ;
                  var ChannelName;
                  ChannelID =  res[i].ChannelID;
                  ChannelName =  res[i].ChannelName;
  
                  console.log('-------',ChannelID,'-----',ChannelName);
                 // console.log('Applist data -----',JSON.stringify(res[i],null,4));
  
                  this.ChannelNameArr.push(
                    {
                      "ChannelID": ChannelID,
                      "CahnnelName": ChannelName
                    }
                  );
          }
          var chnName=JSON.stringify(this.ChannelNameArr,null,4);
          console.log("New Channel Name"+chnName) ;
          console.log("----------------------------");
          // console.log(this.QlikSenseMeasures);
          // console.log("--------------------------------")
          // console.log(this.QlikSenseDiamentions);
  
      // this.visibleProgressBar=false;
      }, err => {
         console.log(err);
        //  this.visibleProgressBar=false;
      });
      // this.usercount=usersCnt
   //Get Channel Type
   this.api.getChannelTypes()
   .subscribe(res => {
  console.log('Cahnnel Types*****'+res);
  
   for (var i = 0; i < res.length; i++) {
               var ChannelTypeID ;
               var ChannelTypeName;                
               ChannelTypeID =  res[i].ChannelTypeID;
               ChannelTypeName =  res[i].ChannelTypeName;
  
               console.log('-------',ChannelTypeID,'-----',ChannelTypeName);
              // console.log('Applist data -----',JSON.stringify(res[i],null,4));
  
               this.ChannelType.push(
                 {
                   "ChannelTypeID": ChannelTypeID,
                   "CahnnelTypeName": ChannelTypeName
                 }
               );
       }
       var chnName1=JSON.stringify(this.ChannelType,null,4);
      console.log("New Channel Type  Name"+chnName1) ;
       console.log("----------------------------");
       // console.log(this.QlikSenseMeasures);
       // console.log("--------------------------------")
       // console.log(this.QlikSenseDiamentions);
  
   // this.visibleProgressBar=false;    
   }, err => {
      console.log(err);
     //  this.visibleProgressBar=false;
   });
    },err => {
      console.log("err");
      console.log(err);
      this.router.navigate(['/login']);
    })
 

    this.frmCreateDeliveryChannel = this.formBuilder.group({
      // id: '',
      DeliveryChannelID:[this.uID,Validators.required],
      DeliveryChannelName: new FormControl(this.ChannelNameArr, Validators.required),
      DeliveryChannelType : new FormControl(this.ChannelType,Validators.required),
      Address :[null,Validators.required],
      PortNo :[null,Validators.required],
      SecurityLayerID :[null,Validators.required],
      EmailUserName :[null,Validators.required],
      Password:[null,Validators.required],
      DefaultSenderEmail:[null,Validators.required],
      InsertBy : '',
      LoginUserID:'',
      APIKey:[null,Validators.required],
      SenderKey:[null,Validators.required], 
      Server:[null,Validators.required],
      DeviceName: new FormControl(this.MobileChannels, Validators.required),
    })

  }
  onAddValues(email,app){}
  email;
  app;

  ChannelTypeChanged(event) {
   //update the ui
   this.selectedChannelValue =event;
   console.log("Selected Value is"+this.selectedChannelValue)  
   if(event=="Email"){
     console.log("In email select value"+this.selectedChannelValue);
       this.ShowEmail=true;
       this.ShowMobileApp=false;
       // this.frmCreateDeliveryChannel = this.formBuilder.group({
       //    id: '',
       //   // DeliveryChannelID:[this.uID,Validators.required],
       //   // DeliveryChannelName: new FormControl(this.ChannelNameArr, Validators.required),
       //   // DeliveryChannelType : new FormControl(this.ChannelType,Validators.required),
       //   Address :[null,Validators.required],
       //   PortNo :[null,Validators.required],
       //   SecurityLayerID :[null,Validators.required],
       //   EmailUserName :[null,Validators.required],
       //   Password:[null,Validators.required],
       //   DefaultSenderEmail:[null,Validators.required],
       //   InsertBy : AuthService.loggedUserName,
       //   LoginUserID:AuthService.loggedUserTableID,
       //   APIKey:[null],
       //   SenderKey:[null],
       //   Server:[null],
       //   DeviceName: new FormControl(this.MobileChannels),
       // })
   }
   else if(event=="Mobile App"){
     console.log("In Mobile App select value"+this.selectedChannelValue);
     this.ShowMobileApp=true;
     this.ShowEmail=false;
     // this.frmCreateDeliveryChannel = this.formBuilder.group({
     //    id: '',
     //   // DeliveryChannelID:[this.uID,Validators.required],
     //   // DeliveryChannelName: new FormControl(this.ChannelNameArr, Validators.required),
     //   // DeliveryChannelType : new FormControl(this.ChannelType,Validators.required),
     //   Address :[null],
     //   PortNo :[null],
     //   SecurityLayerID :[null],
     //   EmailUserName :[null],
     //   Password:[null],
     //   DefaultSenderEmail:[null],
     //   InsertBy : AuthService.loggedUserName,
     //   LoginUserID:AuthService.loggedUserTableID,
     //   APIKey:[null,Validators.required],
     //   SenderKey:[null,Validators.required],
     //   Server:[null,Validators.required],
     //   DeviceName: new FormControl(this.MobileChannels, Validators.required),
     // })
   }
   else if(event=="Email,Mobile App"){
     console.log("In Email,Mobile App select value"+this.selectedChannelValue);
     this.ShowMobileApp=true;
     this.ShowEmail=true;
     // this.frmCreateDeliveryChannel = this.formBuilder.group({
     //    id: '',
     //   // DeliveryChannelID:[this.uID,Validators.required],
     //   // DeliveryChannelName: new FormControl(this.ChannelNameArr, Validators.required),
     //   // DeliveryChannelType : new FormControl(this.ChannelType,Validators.required),
     //   Address :[null],
     //   PortNo :[null],
     //   SecurityLayerID :[null],
     //   EmailUserName :[null],
     //   Password:[null],
     //   DefaultSenderEmail:[null],
     //   InsertBy : AuthService.loggedUserName,
     //   LoginUserID:AuthService.loggedUserTableID,
     //   APIKey:[null,Validators.required],
     //   SenderKey:[null,Validators.required],
     //   Server:[null,Validators.required],
     //   DeviceName: new FormControl(this.MobileChannels, Validators.required),
     // })
   }
   else{
     this.ShowMobileApp=false;
     this.ShowEmail=false;
   }
 }

  onFormSubmit(form:NgForm) {
    this.api.postDeliveryChannel(form)
      .subscribe(res => {
          this.snackbar.open('Succesfully submitted Delivery Channel details', 'Close', {
            duration: 3000,
          });
          this.router.navigate(['/admin/deliveryChannelDetails']);
          console.log("Successfully Record Saved....");
        }, (err) => {
          this.snackbar.open('Something went wrong..!!', 'Close', {
            duration: 3000,
          });
          console.log(err);
        });
  }

  MailConfirmation(form:NgForm)
  {
     // Send Create Alert Mail....
     this.api.ValidateEmailID(form).subscribe(res => {
      console.log('Mail Sent');      
     console.log('*****'+JSON.stringify(res,null,4));
 })
 }

}