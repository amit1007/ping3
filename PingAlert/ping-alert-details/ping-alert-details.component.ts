import { Component, OnInit , ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataSource } from '@angular/cdk/collections';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { PingAlertService } from '../ping-alert.service';
import { AppService } from '../../app.service';
@Component({
  selector: 'app-ping-alert-details',
  templateUrl: './ping-alert-details.component.html',
  styleUrls: ['./ping-alert-details.component.css']
})
export class PingAlertDetailsComponent implements OnInit {

  color = 'primary';
  checked = false;
  disabled = false;

  alertname1: String;
  AppicationName:String;
  CurrentValue: String;
  Measures: String;
  PreviousValue: String;
  triggeredTime:String;
  triggeredDate: String;

  device = false;
  devic = false;
  formView: FormGroup;
  DimentionformView:FormGroup;
   ShowNormalAlerts:boolean=false;
   ShowDimenstion:boolean=false;
   QlikSenseCurrentValue = [        
  ];
  QlikSensePreviousValue = [        
  ];
  // var ShowDimenstion=false;
  // id:string = '';
  // QlikServer: FormGroup;
  // AlertName: string='';
  // ActualValue: string='';
  // ConditionValue : string='';
  // ConnectionType : string='';
  // SourceApplication : string='';
  // Measure : string='';
  // Filter : string='';

  QlikServer = {};
  DimentionValue={};
  constructor(private router: Router,private commanApi:AppService, private route: ActivatedRoute, private api: PingAlertService, private formBuilder: FormBuilder) { }
  displayedColumns = ['QText', 'QNum'];
    dataSource = new MatTableDataSource();
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
  
    applyFilter(filterValue: string) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
      this.dataSource.filter = filterValue;
    }
    PreviousValueDataSource = new MatTableDataSource();
  
    applyFilterPreviousValue(PrevfilterValue: string) {
      PrevfilterValue = PrevfilterValue.trim(); // Remove whitespace
      PrevfilterValue = PrevfilterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
      this.PreviousValueDataSource.filter = PrevfilterValue;
    }



  ngOnInit() {
   
      this.commanApi.getLoggeddUser().subscribe(res=>{
        console.log(this.route.snapshot.params['id']);
        console.log("In ALert View Details Form",this.route.snapshot.params['id'])
        this.getAlertDetails(this.route.snapshot.params['id']);
      },err=>{
        this.router.navigate(['/login']);
      })
     
      this.formView = this.formBuilder.group({
        alertname: new FormControl(''),
        AppicationName: new FormControl(''),
        CurrentValue: new FormControl(''),
        Measures: new FormControl(''),
        PreviousValue: new FormControl(''),
        triggeredTime: new FormControl(''),
        triggeredDate: new FormControl('')
       });


      //  this.DimentionformView = this.formBuilder.group({
      //   alertname: new FormControl(''),
      //   AppicationName: new FormControl(''),
      //   CurrentValue: new FormControl(''),
      //   Measures: new FormControl(''),
      //   PreviousValue: new FormControl(''),
      //   triggeredTime: new FormControl(''),
      //   triggeredDate: new FormControl('')
      //  });


  
    
   
  }
  getAlertDetails(id) {
  
    this.api.getAlertHistroy(id)
      .subscribe(data => {
       console.log("Dimenstion value check"+ JSON.stringify(data.PreviousValue,null,4));
      

        var AlertID=data._id;
        if(data.CurrentValue!=null && data.CurrentValue!=undefined && data.CurrentValue.length>=0)
        {
    //   
          // console.log("Current VAlue",data.CurrentValue)
         var CurrentValueArray=data.CurrentValue
         var DimPreviousValue=data.PreviousValue
          for (var i = 0; i < CurrentValueArray.length; i++) {

            var qText ;
            var qNum;              
  
            qText = CurrentValueArray[i].qText;
            qNum = CurrentValueArray[i].qNum;
            this.QlikSenseCurrentValue.push(
              {
                "QText": qText,
                "QNum": qNum
              }
            );  
            this.dataSource = new MatTableDataSource(this.QlikSenseCurrentValue);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort =this.sort;    
            
          }
          for (var i = 0; i < DimPreviousValue.length; i++) {

            var qText ;
            var qNum;              
  
            qText = DimPreviousValue[i].qText;
            qNum = DimPreviousValue[i].qNum;
            this.QlikSensePreviousValue.push(
              {
                "QText": qText,
                "QNum": qNum
              }
            );  
            this.PreviousValueDataSource = new MatTableDataSource(this.QlikSensePreviousValue);
            this.PreviousValueDataSource.paginator = this.paginator;
            this.PreviousValueDataSource.sort =this.sort;    
            
          }
    console.log('Applist data -----',JSON.stringify(this.QlikSenseCurrentValue,null,4));
           this.ShowNormalAlerts=false;
           this.ShowDimenstion=true;
           this.alertname1= data.alertname,
           this.AppicationName= data.AppicationName,
           this.CurrentValue= data.CurrentValue.measuresValue,
           this.Measures= data.Measures,
           this.PreviousValue= data.PreviousValue,
           this.triggeredTime= data.triggeredTime,
           this.triggeredDate= data.triggeredTime
           this.DimentionformView.setValue({
            alertname: data.alertname,
            AppicationName: data.AppicationName,
            CurrentValue: new FormControl(this.QlikSenseCurrentValue),
            Measures:  data.Measures,
            PreviousValue:new FormControl(this.QlikSensePreviousValue),
            triggeredTime: data.triggeredTime,
            triggeredDate: data.triggeredTime
          });
          this.DimentionValue = data;
        
          // console.log("Alert has dimension Values");

          // this.router.navigate(['/alert_Details/'+AlertID]);         
        }
        else{
          this.ShowNormalAlerts=true;
          this.ShowDimenstion=false;
          this.alertname1= data.alertname,
          this.AppicationName= data.AppicationName,
          this.CurrentValue= data.CurrentValue.measuresValue,
          this.Measures=  data.Measures,
          this.PreviousValue= data.PreviousValue,
          this.triggeredTime= data.triggeredTime,
          this.triggeredDate= data.triggeredTime
          this.formView.setValue({
            alertname: data.alertname,
            AppicationName: data.AppicationName,
            CurrentValue: data.CurrentValue.measuresValue,
            Measures:  data.Measures,
            PreviousValue: data.PreviousValue,
            triggeredTime: data.triggeredTime,
            triggeredDate: data.triggeredTime
          });
          this.QlikServer = data;
        }

       
      });
  }
}