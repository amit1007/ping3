import { Component, OnInit , ViewChild, Injectable} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import {  FormGroup, FormControl, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../../../admin.service';
import { AppService } from '../../../../app.service';
@Component({
  selector: 'app-channel-name-details',
  templateUrl: './channel-name-details.component.html',
  styleUrls: ['./channel-name-details.component.css']
})
export class ChannelNameDetailsComponent implements OnInit {
  frmChannelName: FormGroup;
  ChannelID: string;
  ChannelName: string; 
  //IsActive:string;  
    InsertBy : string;
    constructor(private api: AdminService,private commanApi:AppService, private router: Router, private location: Location, private route: ActivatedRoute,public snackbar: MatSnackBar) { }
    displayedColumns = ['ChannelID','ChannelName','InsertBy','edit'];
    dataSource = new MatTableDataSource();
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
  
    applyFilter(filterValue: string) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
      this.dataSource.filter = filterValue;
    }

    ngOnInit() {
      this.commanApi.getLoggeddUser()
      .subscribe(res=>{
        this.api.getChannelNames()
        .subscribe(res => {
        // if(res.code == 200){
          //console.log("Got oit"+res);
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
      }, err => {
        console.log(err);
        this.router.navigate(['/login']);
      });
      },err => {
        console.log("err");
        console.log(err);
        this.router.navigate(['/login']);
      }) 
      
      this.frmChannelName = new FormGroup ({
        ChannelID:new FormControl(),
        ChannelName:new FormControl(),
        //IsActive:new FormControl(),
        InsertBy :new FormControl(localStorage.getItem('User'))
       
      });
    }
      // Edit User
    onEdit(id) {
      //console.log('In Edit Channel Name');
      //console.log(id);
      this.api.getCahnnelName(id)
      .subscribe( res => {
        //console.log(res);
        this.ChannelID = id;
      });
    }
    // delete User
    deleteUser(id) {
     // console.log('In Delete Channel Name ');
      //console.log(id);
      this.api.deleteCahnnelName(id)
      .subscribe(res => {
        //console.log('ping user new Data');
        this.api.getChannelNames()
        .subscribe(res => {
          this.snackbar.open('Succesfully deleted Channel Name', 'Close', {
            duration: 3000,
          });
          //console.log(res);
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
    export class AlertDataSource extends DataSource<any> {
      constructor(private api: AdminService,private commanApi:AppService) {
        super();
      }

      connect() {
        return  this.api.getChannelNames()
      }

      disconnect() {

      }
    }
