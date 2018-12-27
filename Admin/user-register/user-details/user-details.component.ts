import { Component, OnInit , ViewChild, Injectable} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { AdminService } from '../../admin.service';
import { Router, ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import {  FormGroup, FormControl, NgForm } from '@angular/forms';
// import { identifier } from '../../../../node_modules/@types/babel-types';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from '../../../app.service';
// import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  editPingUser: FormGroup;
  PingUserID: string;
    PingUserName: string;
    PingUserDirectory : string;
    PingUserAccess : string; 
    PingMemberID : string; 
    PingGroupID : string; 
    PingRole : string; 
    InsertBy : string; 
    EmailID:string;
    password:string;
    LoginUserID:string;
    constructor(private api: AdminService,private commanAPI:AppService, private router: Router, private location: Location, private route: ActivatedRoute,public snackbar: MatSnackBar) { }
    displayedColumns = ['PingUserID','PingUserName','PingUserDirectory','PingUserAccess','PingRole','EmailID','edit'];
    dataSource = new MatTableDataSource();
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
  
    applyFilter(filterValue: string) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
      this.dataSource.filter = filterValue;
    }
    ngOnInit() {
      this.commanAPI.getLoggeddUser().subscribe(res=>{
        this.api.getPingUsersLoginIDWise(res.PingUserID)
        .subscribe(res => {
         this.InsertBy= res.InsertBy;
          this.LoginUserID= res.PingUserID;
          // if(res.code == 200){
            console.log("User Details :",res.body);
            this.dataSource = new MatTableDataSource(res.body);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          // }
        
      
        }, err => {
          console.log(err);
        });
      },res=>{
        this.router.navigate(['/login'])
      })
      
      
      this.editPingUser = new FormGroup ({
        PingUserID:new FormControl(),
        PingUserName: new FormControl(),
        PingUserDirectory :new FormControl(),
        PingUserAccess : new FormControl(),
        PingMemberID :new FormControl(),
        PingGroupID : new FormControl(),
        PingRole : new FormControl(),
        InsertBy : new FormControl(''),
        EmailID: new FormControl(),
        LoginUserID:new FormControl(),
      password: new FormControl(),
      });
    }
  
  
    public changeListener(files: FileList){
      console.log("*****************"+files+"**************");
      this.commanAPI.getLoggeddUser().subscribe(res1=>{
          console.log("Res"+JSON.stringify(res1,null,4))
          if(files && files.length > 0) {
            let file : File = files.item(0); 
              console.log("***File***",file)
              console.log(file.name);
              console.log(file.size);
              console.log(file.type);  
              if (file.type == 'text/csv'||file.type == 'application/vnd.ms-excel'){
              let reader: FileReader = new FileReader();
              reader.readAsText(file);
              reader.onload = (e) => {
                 let csv: string = reader.result.toString();
                 console.log(csv);
                 let data = {data:csv,InsertBy:res1.PingUserName,LoginUserID:res1.PingUserID}
                 this.api.postFileUpload(data)
                 .subscribe(res => {
                   console.log("Bulk Upload STatus"+res);
                   this.snackbar.open('Succesfully submitted user details', 'Close', {
                     duration: 3000,
                   });          
                 }, err => {
                   console.log(err);
                   this.snackbar.open('Something went wrong..!!', 'Close', {
                     duration: 3000,
                   });
                 });
              }
             }
             else{
               console.log("File type is not appropriate format")
               this.snackbar.open('File type is not appropriate format please upload CSV format file', 'Close', {
                 duration: 3000,
               });
             }
           }
       
      })
         
      
    }
  
  
    // Edit User
  onEdit(id) {
    console.log('In Edit User');
    console.log(id);
    this.api.getPingUserIDDetails(id)
    .subscribe( res => {
      console.log(res);
      this.PingUserID = id;
    });
  }
  // delete User
  deleteUser(id) {
    console.log('In Delete User');
    console.log(id);
    this.ngOnInit();
    this.api.deletePingUserNew(id)
    .subscribe(res => {
      console.log('ping user new Data');
      this.ngOnInit();
      this.api.getPingUsersNew()
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
  //File Donwload Template
  downloadFile(){
    let link = document.createElement("a");
    link.download = "PingUserRole.csv";
    link.href = "assets/PingUserRole.csv";
    link.click();
  }
  AddQlikUser()
  {
    console.log("Label Qliked");
    this.api.fetchQlikUsers().subscribe(res=>{
      this.snackbar.open("Qlik Users Added Successfully", 'Close', {
        duration: 2000,
      });
    })
  }
  
  }
  
  