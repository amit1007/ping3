import { Component, OnInit,ViewChild} from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import {MatTableDataSource,MatPaginator,MatSort} from '@angular/material';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../../admin.service';
import { AppService } from '../../../app.service';

@Component({
  selector: 'app-datasource-details',
  templateUrl: './datasource-details.component.html',
  styleUrls: ['./datasource-details.component.css']
})
export class DatasourceDetailsComponent implements OnInit {

  constructor(private api: AdminService,private commonApi:AppService,private router: Router,public snackbar: MatSnackBar) { }


  displayedColumns: string[]= ['sourcename','type', 'hostname', 'edit']; 
  
  dataSource = new MatTableDataSource();
   
  applyFilter(filterValue: string) {
     this.dataSource.filter = filterValue.trim().toLowerCase();
   }
     
 
 

 
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
// applyFilter(filterValue: string) {
//     filterValue = filterValue.trim(); // Remove whitespace
//     filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
//     this.dataSource.filter = filterValue;
//   }
 
ngOnInit() {
  this.commonApi.getLoggeddUser().subscribe(res=>{
    this.api.DataSourceDetails()
    .subscribe(res => {
      console.log('DataSourceDetails:',res);
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort =this.sort;
    }, err => {
      console.log(err);
    });

      // this.api.DataSourceDetails()
      // .subscribe(res => {
      //   console.log('res:',res);
      //   this.Intents = res;
      //   console.log('this.Intents:',this.Intents)
      // }, err => {
      //   console.log(err);
      // });
  },err=>{
    console.log("Session expire in Create Delivery channel"+err);
    this.router.navigate(['/login'])
  })
 
}

// delete User
deleteAlert(id) {
console.log('In Delete User');
console.log(id);
this.api.deleteDataSourceNew(id)
.subscribe(res => {
  console.log('user new DataSource');
  this.api.getDataSourceNew()
  .subscribe(res => {
    // this.sankbar.open('Succesfully deleted user', 'Close', {
    //   duration: 3000,
    // });
    console.log(res);
    this.dataSource = new MatTableDataSource(res);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }, err => {
    console.log(err);
  });
        }, (err) => {
console.log(err);
}
);
}

}

// export class AlertDataSource extends DataSource<any> {
// constructor(private api: ApiService) {
//   super();
// }

// connect() {
//   return this.api.DataSourceDetails();
// }

// disconnect() {

// }



// }
