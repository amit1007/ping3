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
  selector: 'app-show-all-user-list',
  templateUrl: './show-all-user-list.component.html',
  styleUrls: ['./show-all-user-list.component.css']
})
export class ShowAllUserListComponent implements OnInit {

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
    constructor(private api: AdminService,private commanAPI:AppService, private router: Router, private location: Location, private route: ActivatedRoute,public snackbar: MatSnackBar) { }
    displayedColumns = ['PingUserID','PingUserName','PingUserAccess','PingRole','EmailID','InsertBy','edit'];
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
        this.api.getPingUserStatusWise(true)
        .subscribe(res => {
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
      password: new FormControl(),
      });
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

}
