import { Component, OnInit ,ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { PingAlertService } from '../ping-alert.service';
import { AppService } from '../../app.service';
@Component({
  selector: 'app-alert-history',
  templateUrl: './alert-history.component.html',
  styleUrls: ['./alert-history.component.css']
})
export class AlertHistoryComponent implements OnInit {

  displayedColumns = ['AlertName', 'ApplicationName','Measures','PreviousValue','CurrentValue','triggereddate','triggeredTime','View'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  constructor(private api: PingAlertService,private commanApi:AppService) { }

  ngOnInit() {
    this.commanApi.getLoggeddUser().subscribe(res=>{
      var loggedUserID=res.PingUserID;
      this.api.getLoginIDWiseAlertsHistory(loggedUserID)
      .subscribe(res => {
        console.log(res);
  
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      }, err => {
        console.log(err);
      });
    })
    

}
checkDimensionDetails(DimStatus): boolean {
  console.log("In Dim status Checker "+DimStatus)
  if(DimStatus=="1")
  {
    return true;
  }
  else
  {
    return false;
  }
}

}


export class AlertDataSource extends DataSource<any> {
constructor(private api: PingAlertService) {
  super()
}

connect() {
  return this.api.getAlerts();
}

disconnect() {

}
}
