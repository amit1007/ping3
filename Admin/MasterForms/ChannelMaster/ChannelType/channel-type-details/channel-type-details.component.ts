import { Component, OnInit , ViewChild, Injectable} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import {  FormGroup, FormControl, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../../../../admin.service';
@Component({
  selector: 'app-channel-type-details',
  templateUrl: './channel-type-details.component.html',
  styleUrls: ['./channel-type-details.component.css']
})
export class ChannelTypeDetailsComponent implements OnInit {
  frmChannelType: FormGroup;
  ChannelTypeID: string;
  ChannelTypeName: string; 
  //IsActive:string;  
    InsertBy : string;
    constructor(private api: AdminService, private router: Router, private location: Location, private route: ActivatedRoute,public snackbar: MatSnackBar) { }
    displayedColumns = ['ChannelTypeID','ChannelTypeName','InsertBy','edit'];
    dataSource = new MatTableDataSource();
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
  
    applyFilter(filterValue: string) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
      this.dataSource.filter = filterValue;
    }
    ngOnInit() {
      console.log("in channel Type Init");
     //this.onEdit(this.route.snapshot.params['id']);
      this.api.getChannelTypes()
      .subscribe(res => {
        // if(res.code == 200){
          // console.log("Got oit"+res);
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        // }   
      }, err => {
        console.log(err);
      });
      this.frmChannelType = new FormGroup ({
        ChannelID:new FormControl(),
    ChannelName:new FormControl(),
    //IsActive:new FormControl(),
      InsertBy :new FormControl(localStorage.getItem('User')),
       
      });
    }
                // Edit User
onEdit(id) {
  console.log('In Edit User');
  console.log(id);
  this.api.getCahnnelType(id)
  .subscribe( res => {
    console.log(res);
    this.ChannelTypeID = id;
  });
}
// delete User
deleteUser(id) {
  console.log('In Delete User');
  console.log(id);
  this.api.deleteCahnnelType(id)
  .subscribe(res => {
    console.log('ping user new Data');
    this.api.getChannelNames()
    .subscribe(res => {
      console.log(res);
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.snackbar.open('Succesfully deleted user', 'Close', {
        duration: 3000,
      });
      
    }, err => {
      console.log(err);
    });
           
  }, (err) => {
  console.log(err);
  }
  );
}

}
export class AlertDataSource extends DataSource<any> {
  constructor(private api: AdminService) {
    super();
  }

  connect() {
    return  this.api.getChannelTypes()
  }

  disconnect() {

  }
}