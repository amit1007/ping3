import { Component, OnInit , ViewChild, Injectable} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import {  FormGroup,FormBuilder, FormControl, NgForm ,Validators} from '@angular/forms';
import { identifier } from '../../../../../node_modules/@types/babel-types';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-delivery-channel-details',
  templateUrl: './delivery-channel-details.component.html',
  styleUrls: ['./delivery-channel-details.component.css']
})
export class DeliveryChannelDetailsComponent implements OnInit {
  QlikServer;
  editPingUser: FormGroup;
  DeliveryChannelID: string;
    DeliveryChannelName: string;
    DeliveryChannelType : string;
    Address : string;
    PortNo : string;
    SecurityLayerID : string;
    EmailUserName : string;
    Password:string;
    DefaultSenderEmail:string;
    InsertBy : string;
    APIKey:String='';
    SenderKey:String='';
    Server:String=''
    MobileChannels = [
      { id: 1, name: 'IOS' },
      { id: 2, name: 'Android' }
    ];
    ChannelType = [
    ];

    public ShowMobileApp:boolean = false;
    public ShowEmailDetails:boolean = true;
    selectedChannelValue:any='';
    constructor(private api: AdminService, private router: Router, private location: Location, private route: ActivatedRoute,public snackbar: MatSnackBar,private formBuilder: FormBuilder) { }
    displayedColumns = ['DeliveryChannelID','DeliveryChannelName','DeliveryChannelType','Address','PortNo','SecurityLayerID','EmailUserName','DefaultSenderEmail','edit'];
    displayedColumns2 =['DeliveryChannelID','DeliveryChannelName','DeliveryChannelType','APIKey','SenderKey','Server','DeviceName','edit'];
    dataSource = new MatTableDataSource();
    dataSource2 = new MatTableDataSource();
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    @ViewChild(MatPaginator) paginator1: MatPaginator;
    @ViewChild(MatSort) sort1: MatSort;

    applyFilter(filterValue: string) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
      this.dataSource.filter = filterValue;
    }
    ngOnInit() {
      //this.onEdit(this.route.snapshot.params['id']);
      this.api.getChannelTypes()
      .subscribe(res => {
           //console.log('Cahnnel Types*****'+res);

       for (var i = 0; i < res.length; i++) {
              var ChannelTypeID ;
              var ChannelTypeName;                
              ChannelTypeID =  res[i].ChannelTypeID;
              ChannelTypeName =  res[i].ChannelTypeName;

              //console.log('-------',ChannelTypeID,'-----',ChannelTypeName);
             // console.log('Applist data -----',JSON.stringify(res[i],null,4));

              this.ChannelType.push(
                {
                  "ChannelTypeID": ChannelTypeID,
                  "CahnnelTypeName": ChannelTypeName
                }
              );
          }
      var chnName1=JSON.stringify(this.ChannelType,null,4);
          //console.log("New Channel Type  Name"+chnName1) ;
         // console.log("----------------------------");
            // console.log(this.QlikSenseMeasures);
            // console.log("--------------------------------")
            // console.log(this.QlikSenseDiamentions);

        // this.visibleProgressBar=false;    
        }, err => {
          console.log(err);
          //  this.visibleProgressBar=false;
        });
      this.api.getDeliveryCahnnels()
      .subscribe(res => {
        // if(res.code == 200){
          console.log("Delivery channel : ",JSON.stringify(res,null,4));
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

          this.dataSource2 = new MatTableDataSource(res);
          this.dataSource2.paginator = this.paginator;
          this.dataSource2.sort = this.sort;
        // }


      }, err => {
        console.log(err);
      });
      this.editPingUser = new FormGroup ({

        DeliveryChannelID:new FormControl(),
          DeliveryChannelName:new FormControl(),
          DeliveryChannelType:new FormControl(),
          Address :new FormControl(),
          PortNo :new FormControl(),
          SecurityLayerID :new FormControl(),
          EmailUserName :new FormControl(),
          Password:new FormControl(),
          DefaultSenderEmail:new FormControl(),
         
          DeviceName: new FormControl(this.MobileChannels),
          InsertBy :new FormControl(localStorage.getItem('User')),
      });

      this.editPingUser = this.formBuilder.group({
        // id: '',
        // DeliveryChannelID:[this.uID,Validators.required],
        // DeliveryChannelName: new FormControl(this.ChannelNameArr, Validators.required),
        // DeliveryChannelType : new FormControl(this.ChannelType,Validators.required),
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
       
        DeviceName: new FormControl(this.ChannelType, Validators.required),
      })
    }

    onFormSubmit(form){}


    ChannelTypeChanged(event) {
      //update the ui
      this.selectedChannelValue =event;
      //console.log("Selected Value is"+this.selectedChannelValue)  
      if(event=="Email"){
       // console.log("In email select value"+this.selectedChannelValue);
          this.ShowEmailDetails=true;
          this.ShowMobileApp=false;
          this.api.getAllDeliveryEmailChannel()
          .subscribe(res => {
            // if(res.code == 200){
             // console.log(res);
              this.dataSource = new MatTableDataSource(res);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            // }
    
    
          }, err => {
            console.log(err);
          });
      }
      else if(event=="Mobile App"){
        //console.log("In Mobile App select value"+this.selectedChannelValue);
        this.ShowMobileApp=true;
        this.ShowEmailDetails=false;
        this.api.getMobileAppDeliveryCahnnels()
        .subscribe(res => {
          // if(res.code == 200){
            //console.log(res);
            this.dataSource2 = new MatTableDataSource(res);
            this.dataSource2.paginator = this.paginator;
            this.dataSource2.sort = this.sort;
          // }
  
  
        }, err => {
          console.log(err);
        });
      }
      else{
        this.ShowMobileApp=false;
        this.ShowEmailDetails=false;
      }
    }


    // Edit User
  onEdit(id) {
    console.log('In Edit User');
    console.log(id);
    this.api.getDeliveryCahnnel(id)
    .subscribe( res => {
      console.log(res);
      this.DeliveryChannelID = id;
    });
  }
  // delete User
  deleteUser(id) {
    console.log('In Delete User');
    console.log(id);
    this.api.deleteDeliveryChannel(id)
    .subscribe(res => {
      console.log('ping user new Data');
      this.api.getDeliveryCahnnels()
      .subscribe(res => {
        this.snackbar.open('Succesfully deleted user', 'Close', {
          duration: 3000,
        });
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, err => {
        console.log(err);
      });
              // this.api.getPingUsersNew()
              // .subscribe( res => {
              //   console.log('ping user new Data');
              //   console.log(res);
              //   this.snackbar.open('Succesfully deleted user', 'Close', {
              //     duration: 3000,
              //   });
              //   this.dataSource = new MatTableDataSource(res);
              //   this.dataSource.sort = this.sort;
              //   this.dataSource.paginator = this.paginator;
              // }, err => {
              //   console.log(err);
              // });

      // this.router.navigateByUrl("/alert_Inbox");
      // this.router.navigate(['/alert_examples']);
    }, (err) => {
    console.log(err);
    }
    );
  }

}

export interface Element {
  DeliveryChannelID: string;
  DeliveryChannelName: string;
  DeliveryChannelType: string;
  Address: string;
  PortNo: string;
  SecurityLayerID: string;
  EmailUserName : string;
  Password : string;
  InsertBy : string;
  DefaultSenderEmail: string;
  APIKey: string;
  SenderKey : string;
  Server : string;
  DeviceName:string;

}

export interface Element1 {
  DeliveryChannelID: string;
  DeliveryChannelName: string;
  DeliveryChannelType: string;
  // Address: string;
  // PortNo: string;
  // SecurityLayerID: string;
  // EmailUserName : string;
  // Password : string;
  // InsertBy : string;
  // DefaultSenderEmail: string;
  APIKey: string;
  SenderKey : string;
  Server : string;
  DeviceName:string;
}
// export class DeliveryDataSource extends DataSource<any> {
//   constructor(private api: ApiService) {
//     super();
//   }

//   connect() {
//     return  this.api.getDeliveryCahnnels()
//   }

//   disconnect() {

//   }
// }

// export class DeliveryDataSourceMobileApp extends DataSource<any> {
//   constructor(private api: ApiService) {
//     super();
//   }

//   connect() {
//     return  this.api.getDeliveryCahnnels()
//   }

//   disconnect() {

//   }
// }