import { Component, OnInit , ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import { NotificationsService } from 'angular2-notifications';
import { AlertsService } from 'angular-alert-module';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AppService } from 'src/app/app.service';
import { PingAlertService } from 'src/app/PingAlert/ping-alert.service';
@Component({
  selector: 'app-alert-list',
  templateUrl: './alert-list.component.html',
  styleUrls: ['./alert-list.component.css']
})
export class AlertListComponent implements OnInit {
  color = 'primary';
  checked = false;
  disabled = false;
  device = false;

constructor(private api: PingAlertService,private commanApi:AppService,private router: Router,private location:Location,private _service: NotificationsService,private _flashMessagesService:FlashMessagesService) { }

displayedColumns = ['AlertID', 'AlertName','ApplicationName', 'Measures', 'Setdate', 'SetTime', 'trigger', 'edit'];
dataSource = new MatTableDataSource();
@ViewChild(MatPaginator) paginator: MatPaginator;
// @ViewChild(MatSort) sort: MatSort;

applyFilter(filterValue: string) {
filterValue = filterValue.trim(); // Remove whitespace
filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
this.dataSource.filter = filterValue;
}

ngOnInit() {
  console.log("In Alert Inbox Init")
  // AuthService.loggedUserTableID =localStorage.getItem('loggedUserTableID');
  // console.log("AuthService.loggedUserTableID>>>>", AuthService.loggedUserTableID);
      this.commanApi.getLoggeddUser().subscribe(res=>{
        console.log(res.PingUserID);
        this.api.getAlerts()
        .subscribe(res => {
          console.log(res);
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          // this.dataSource.sort =this.sort;
        }, err => {
          console.log(err);
        });
      },err => {
        console.log("err");
        console.log(err);
        this.router.navigate(['/login']);
      })
      
  }
  // delete Alert's
  deleteAlert(id) {
  console.log("In Delete Alert");
  console.log(id);
  this.api.deleteAlert(id)
  .subscribe(res => {
  this.ngOnInit();
      this.api.getAlerts()
      .subscribe(res => {
        this.ngOnInit();
        this.dataSource = new MatTableDataSource(res);
        // this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }, err => {
        console.log(err);
      });
  // this.router.navigateByUrl("/alert_Inbox");
  // this.router.navigate(['/alert_examples']);
  }, (err) => {
  console.log(err);
  }
  );
  }
  onTriggerChange(event,id){
      var triggerStatus={
      trigger : event.checked,
      id : id
    }

    this.api.updatetriggerAlert(triggerStatus).subscribe(res=>{
        console.log(res.ok);
        if(res.ok == 1){
        if(triggerStatus.trigger === true){
        this._flashMessagesService.show(' successfully! Trigger ON',{cssClass:'alert-success',timeout:500});
        }else{
        this._flashMessagesService.show('successfully! Trigger OFF',{cssClass:'alert-danger',timeout:500});
        }
      }
    })
  }

  StatusAlert(id) {
  console.log("In Delete Alert");
  console.log(id);
  this.api.deleteAlert(id)
  .subscribe(res => {

      this.api.getAlerts()
      .subscribe(res => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        // this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }, err => {
        console.log(err);
      });

  // this.router.navigateByUrl("/alert_Inbox");
  // this.router.navigate(['/alert_examples']);
  }, (err) => {
  console.log(err);
  }
  );
  }


}
