import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { trigger, style, animate, transition } from '@angular/animations';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormArray } from '@angular/forms';
import { ParamMap } from '@angular/router';
import { LocalStorageService, SessionStorageService } from '../../../../../node_modules/angular-web-storage';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../../admin.service';
import { AppService } from '../../../app.service';

@Component({
  selector: 'app-edit-delivery-channel',
  templateUrl: './edit-delivery-channel.component.html',
  styleUrls: ['./edit-delivery-channel.component.css']
})
export class EditDeliveryChannelComponent implements OnInit {
  matcher;
  ChannelNameArr = [        
  ];
  ChannelType = [        
  ];
  public ShowMobileApp:boolean = true;
  public ShowEmail:boolean = true;
  selectedChannelValue:any='';

  frmEditDeliveryChannel: FormGroup;
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
  userID: string = '';
  uID: any =  '';
  DeviceName:string='';
  APIKey:string='';
  SenderKey:string='';
  Server:string='';
 // DeviceName: new FormControl(this.MobileChannels, Validators.required),
  AAccess = [
    { id: 1, name: 'Use Qlik Security' },
    { id: 2, name: 'Manage in Ping' }
  ];


  RRole = [
    { id: 2, name: 'Administrator' },
    { id: 3, name: 'Connnection Manager' },
    { id: 4, name: 'User' }
  ];
  MobileChannels = [
    { id: 1, name: 'IOS' },
    { id: 2, name: 'Android' }
  ];
  constructor(private route: ActivatedRoute,private commanApi:AppService, private api: AdminService, private router: Router,
    private formBuilder: FormBuilder,public snackbar: MatSnackBar,
    public local: LocalStorageService, public session: SessionStorageService) { }

    ngOnInit() {
      console.log('route succesfully');
      console.log(this.route.snapshot.params['id']);
      this.onEdit(this.route.snapshot.params['id']);
  
      console.log('test route succesfully');
      console.log(this.route.snapshot.params['id']);
      this.onEdit(this.route.snapshot.params['id']);
     
      this.commanApi.getLoggeddUser().subscribe(res=>{
        console.log("Pinguser details Id check ",res);
        this.frmEditDeliveryChannel.get('InsertBy').setValue(res.PingUserName) 
        this.frmEditDeliveryChannel.get('LoginUserID').setValue(res.PingUserID)
        this.api.getDeliveryCahnnels()
        .subscribe(res => {
         // console.log(res);
          this.count=res.length;
          this.count=this.count+1;
          this.userID = 'DC-' + this.count ;
          this.uID = this.frmEditDeliveryChannel.get('DeliveryChannelID').setValue(this.userID);
    
        }, err => {
          console.log(err);
          this.usercount='0';
        });
    
        //Get channel Name
        this.api.getChannelNames()
        .subscribe(res => {
        console.log(res);
    
        for (var i = 0; i < res.length; i++) {
                    var ChannelID ;
                    var ChannelName;                
                    ChannelID =  res[i].ChannelID;
                    ChannelName =  res[i].ChannelName;
    
                    //console.log('-------',ChannelID,'-----',ChannelName);
                   // console.log('Applist data -----',JSON.stringify(res[i],null,4));
    
                    this.ChannelNameArr.push(
                      {
                        "ChannelID": ChannelID,
                        "ChannelName": ChannelName
                      }
                    );
            }
            var chnName=JSON.stringify(this.ChannelNameArr,null,4);
           // console.log("New Channel Name"+chnName) ;
            console.log("----------------------------");
            // console.log(this.QlikSenseMeasures);
            // console.log("--------------------------------")
            // console.log(this.QlikSenseDiamentions);
    
        // this.visibleProgressBar=false;    
        }, err => {
           console.log(err);
          //  this.visibleProgressBar=false;
        });
  
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

      

      this.frmEditDeliveryChannel=this.formBuilder.group({
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

        DeliveryChannelID: '',
        DeliveryChannelName: new FormControl(this.ChannelNameArr, Validators.required),
        DeliveryChannelType : new FormControl(this.ChannelType,Validators.required),
        Address : '', 
        PortNo : '',
        SecurityLayerID : '',
        EmailUserName : '',
        Password:'',
        DefaultSenderEmail:'',
        
        APIKey:'',
        SenderKey:'',
        Server:'',
        InsertBy : '',
        usercount:'',
        count: '',
        DeviceName:'',
        LoginUserID:'',

      })
     
    }

    onEdit(id) {
      console.log('In Edit alert');
      console.log(id);
      this.api.getDeliveryCahnnel(id).subscribe( res => {
        console.log('Get Edit Data');
        console.log(res);
  
        const id8 = res._id;
        console.log(id8);
        console.log(res.DeliveryChannelID);
        console.log("Cahnnel Name "+res);
        
        // console.log(res.PingUserDirectory);
        // console.log("Deliverto"+res.PingUserID);
        // console.log("Data Sourse"+res.PingUserName);
         this.frmEditDeliveryChannel.get('DeliveryChannelID').setValue(res.DeliveryChannelID);
         this.frmEditDeliveryChannel.get('DeliveryChannelName').setValue(res.DeliveryChannelName);
         this.frmEditDeliveryChannel.get('DeliveryChannelType').setValue(res.DeliveryChannelType);
         this.frmEditDeliveryChannel.get('Address').setValue(res.Address);
         this.frmEditDeliveryChannel.get('EmailUserName').setValue(res.EmailUserName);
         this.frmEditDeliveryChannel.get('Password').setValue(res.Password);
  
         this.frmEditDeliveryChannel.get('PortNo').setValue(res.PortNo);
         this.frmEditDeliveryChannel.get('SecurityLayerID').setValue(res.SecurityLayerID);
         this.frmEditDeliveryChannel.get('DefaultSenderEmail').setValue(res.DefaultSenderEmail);
      
         this.frmEditDeliveryChannel.get('DeviceName').setValue(res.DeviceName);
  
         this.frmEditDeliveryChannel.get('APIKey').setValue(res.APIKey);
         this.frmEditDeliveryChannel.get('SenderKey').setValue(res.SenderKey);
         this.frmEditDeliveryChannel.get('Server').setValue(res.Server);
      
      
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
  
    ChannelTypeChanged(event) {
      //update the ui
      this.selectedChannelValue =event;
      console.log("Selected Value is"+this.selectedChannelValue)  
      if(event=="Email"){
        console.log("In email select value"+this.selectedChannelValue);
          this.ShowEmail=true;
          this.ShowMobileApp=false;
          // this.QlikServer = this.formBuilder.group({
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
        // this.frmEditDeliveryChannel = this.formBuilder.group({
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
      console.log(this.route.snapshot.params['id'])
      this.api.UpdateDeliveryChannel(this.route.snapshot.params['id'], form)
        .subscribe(res => {
            res['_id']=this.route.snapshot.params['id']
            let id = res['_id'];
            this.snackbar.open('Succesfully updated Delivery Channel Details', 'Close', {
              duration: 3000,
            });
            this.router.navigate(['/admin/deliveryChannelDetails']);
          }, (err) => {
            this.snackbar.open('Something went wrong...!!', 'Close', {
              duration: 3000,
            });
            console.log(err);
          }
        );
    }
  
  }