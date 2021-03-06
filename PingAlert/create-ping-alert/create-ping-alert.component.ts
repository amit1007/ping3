import { Component, OnInit, ViewChild, OnDestroy, Input } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormArray, FormControlName } from '@angular/forms';
import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';
import { HttpClient } from 'selenium-webdriver/http';
import { Alert } from 'selenium-webdriver';
import { Router } from '@angular/router';
import { isNumber } from 'util';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { Observable, ReplaySubject } from 'rxjs';
import { MatTableDataSource, MatSelect } from '@angular/material';
import {map, startWith, takeUntil, take} from 'rxjs/operators';
import { Subject } from 'rxjs';
import { PingAlertService } from '../ping-alert.service';
import { AppService } from '../../app.service';
//Number Format Interface Class
export interface NumberFormat {
  value: string;
  viewValue: string;
}

export interface MM{
  // "Appid":  string ,
  // "pingMeasuresqLabel": string,
  // "pingMeasuresqDef":  string,
  
  "Appid": string,
  "AppName": string
}

@Component({
  selector: 'app-create-ping-alert',
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateY(-100%)', opacity: 0}),
          animate('500ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1}),
          animate('500ms', style({transform: 'translateX(100%)', opacity: 0}))
        ])
      ]
    )
  ],
  templateUrl: './create-ping-alert.component.html',
  styleUrls: ['./create-ping-alert.component.css']
})
export class CreatePingAlertComponent implements OnInit {
   //#region animation and progressbar
   showDiamentionValue;
   selected = 'QlikSenseApplication';
   show:boolean = false;
   showGraphCurrentValue :boolean = false;
   showFieldValue :boolean =false;
   showFilterValue :boolean =false;
   visibleProgressBar : boolean = true;
   // Diamention Value Table
   displayedColumns = ['Field', 'Value','Delete'];
   dataSource = new MatTableDataSource();
 //#endregion
 NumberToFormat:string='';
 HideField:boolean=false; 

 //#region From Group,Form Builder,Form Control
 frmAlert: FormGroup;
 //#region ==> Array Object's
     QlikSenseApps = [        
     ];
     MobUser = [        
     ];
     QlikSenseMeasures = [ ] ; 
     QlikSenseDiamentions = [        
     ];
     QlikSenseFields: Observable<string[]>;
     Fields : string[] = [];
     addRowsFilter =[];
     currentvalue = 'NaN';
     count :number=0;      
     month :string;
     year:string;
     AppName : string[] = this.QlikSenseApps[20];
     QlikSense: Observable<string[]>;
     UserEmailID:string;
 //#endregion
   //#region ==> var Object's
   alertID:string='';
   KEY = 'value';
   value: any = null;
    curDate:Date;
    searchDate:string
 //#endregion
 //Number format value
 numberformats: NumberFormat[] = [
   {value: '0.00a', viewValue: 'Auto'},  
   {value:'0,0', viewValue:'1,000'},
   {value: '0,0.0', viewValue: '1,000.0'},
   {value:'0,0.00',viewValue:'1,000.12'},
   {value: '0%', viewValue: '12%'},
   {value: '0.0%', viewValue: '12.3%'},
   {value: '0.00%', viewValue: '12.34%'}
 ];
   
 @Input() placeholderLabel = ' ';
 @ViewChild('singleSelect') singleSelect: MatSelect;
//#endregion
 constructor(private router: Router,private commanApi:AppService, private api: PingAlertService, private formBuilder: FormBuilder,public local: LocalStorageService, public session: SessionStorageService) { }
  
 
  frmCntApplication =  new FormControl();
 public formCtrl: FormControl = new FormControl();
 public applicationFormCtrl: FormControl = new FormControl();

 public filteredBanks: ReplaySubject<MM[]> = new ReplaySubject<MM[]>(1);

 private _onDestroy = new Subject<void>();
 
 ngOnInit() {
    this.commanApi.getLoggeddUser().subscribe(res=>{
      let qlikUserDetail ={
        user_directory : res.PingUserDirectory,
        user_name : res.PingUserName,
        origin : res.PingUserDirectory,
      }
      this.frmAlert.get("InsertBy").setValue(res.PingUserName);
  
      this.frmAlert.get("UserID").setValue(res.PingUserID);
      this.frmAlert.get('frmCntRecipient').setValue(res.EmailID);
       // this.QlikSenseApps = this.frmCntApplication.valueChanges
          // .pipe(
          //   startWith(' '),
          //   map(value => this._filter(value))
          // );
          // this.frmCntApplication.setValue(this.QlikSenseApps[10]);

          // load the initial bank list
          //  this.filteredBanks.next(this.QlikSenseApps.slice());


          // listen for search field value changes
          // this.frmCntApplication.valueChanges
          // .pipe(takeUntil(this._onDestroy))
          // .subscribe(() => {
          //   this.filterBanks();
          // });

                  //#region Qlik sense Api Call        
                  this.api.getQlikSenseObject(qlikUserDetail)
                  .subscribe(res => {
                  console.log(res);
                    let count = res.length -1;
                    let qlik_cookies = res[count];
                    this.session.set("qlikcookies",qlik_cookies);
                    console.log(count);
                    console.log( qlik_cookies);
                  this.formCtrl.setValue(this.QlikSenseApps[10]);

                  this.filteredBanks.next(this.QlikSenseApps.slice());
          
                  // listen for search field value changes
                  // this.frmCntApplication.valueChanges
                  // .pipe(takeUntil(this._onDestroy))
                  // .subscribe(() => {
                  //   this.filteredBanks();
                  // });
                   
                  for (var i = 0; i < res.length - 1; i++) {
                              var Appid ;
                              var AppName;
                            
                              var measures =[] ;    
                              var diamention = [];  
                          
                              for(var j = 0; j < res[i].pingAppList.length; j++){
                            
                                Appid =  res[i].pingAppList[j].appid;
                                AppName =  res[i].pingAppList[j].appName;

                                console.log('-------', Appid,'-----', AppName);
                                console.log('Applist data -----',JSON.stringify(res[i].pingAppList,null,4));

                                this.QlikSenseApps.push(
                                  {
                                    "Appid": Appid,
                                    "AppName": AppName
                                  }
                                );
                                
                              this.session.set(Appid,res[i].pingAppObjects);
                              }
                      }
                 
                      console.log(this.QlikSenseApps) ;
                      console.log("----------------------------");
                      // console.log(this.QlikSenseMeasures);
                      // console.log("--------------------------------")
                      // console.log(this.QlikSenseDiamentions);

                  this.visibleProgressBar=false;    
                  }, err => {
                     console.log(err);
                     this.visibleProgressBar=false;
                  });

                  var date = new Date(),
                      locale = "en-us";
                      this.month = date.toLocaleString(locale, { month: "short" });
                      this.year = date.toLocaleString(locale, { year: "numeric"});
                      this.searchDate=this.month + this.year;
          //#endregion 
                 //#region  formGroup getAlertsMax this is used previously for Max alert ID
  
                 this.api.getAlertsMax()
                    .subscribe(res => {
                      console.log(res);
                      var totalAlerts = res;
                      console.log("your total alerts is:",totalAlerts);
                   
                      if(isNaN(totalAlerts))  {
                        this.count = 1;
                      }                     
                      else{
                        this.count = totalAlerts+1;
                      }
                        console.log(this.count);
                        this.alertID = 'ping' + this.count ;

                        console.log(this.count)
                                              
                        this.alertID = this.count.toString();//'P' + this.month + this.year + ('_') + this.count;
                        console.log(this.alertID); //imp step uncomment afterwards
                        this.frmAlert.get('frmCntAlertID').setValue(this.alertID)
                    })

                    this.api.getMobileNotify(res.EmailID).subscribe(res=>{
                      console.log("Email ID"+res.EmailID)
                      this.frmAlert.get('frmCntMobileUser').setValue(res.token);
                    })
                   
              //#endregion
              
    },err=>{
      console.log("session expires.In alert CReation")
      this.router.navigate(['/login'])
    })

    this.frmAlert = this.formBuilder.group({
      frmCntAlertID:this.alertID,
      frmCntAlertName: '',
      frmCntDelivertTo: '',
      frmCntRecipient: '',
      frmCntMobileUser: new FormControl(this.MobUser),
      frmCntDataSource: 'QlikSenseApplication',
      frmCntApplication: new FormControl(this.QlikSenseApps,Validators.required),
      frmCntMeasures: new FormControl(this.QlikSenseMeasures,Validators.required),
      frmCntCurrentValue: new FormControl(this.currentvalue),
      frmCntCondition: [ '', Validators.required],
      frmCntFunction: [ '', Validators.required],
      frmCntNumberformat: '',
      frmCntLoopDiamention: new FormControl(this.QlikSenseDiamentions),
      diamentionValue: new FormControl(''),
      filterValue: new FormControl(''),
      InsertBy : '', 
     
      UpdatedBy :'None',
      frmCntFieldValue: new FormGroup({
            Field : new FormControl(this.QlikSenseDiamentions),
            Value : new FormControl(''),
            selectedFieldValue: new FormControl([])
      }),
      frmCntTrigger:'onReload',
      UserID:'',
      frmGrpShedules: new FormGroup({
            SUN: new FormControl(''),
            MON: new FormControl(''),
            TUE: new FormControl(''),
            WED: new FormControl(''),
            THU: new FormControl(''),
            FRI: new FormControl(''),
            SAT: new FormControl(''),
            startTimeSchedule: new FormControl(''),
            endTimeSchedule: new FormControl(''),
            dateSchedule: new FormControl(''),
            repeatCounts: new FormControl(''),
            intervalTimeScheduleMins: new FormControl(''),
            intervalTimeScheduleHours: new FormControl('')
    }),
   })
         
}

OffAnimation(){
  this.show=false;
}
OnAnimation(){
  this.show=true;
}

private setInitialValue() {
  this.filteredBanks
    .pipe(take(1), takeUntil(this._onDestroy))
    .subscribe(() => {
      // setting the compareWith property to a comparison function
      // triggers initializing the selection according to the initial value of
      // the form control (i.e. _initializeSelection())
      // this needs to be done after the filteredBanks are loaded initially
      // and after the mat-option elements are available
      this.singleSelect.compareWith = (a: MM , b: MM) => a.AppName === b.AppName;
    });
}


   // lineChart
   public lineChartData:Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'}
  ];
  public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

    //#region  SESSION MANAGMENT     
    setSessionData(expired: number = 0) {
      this.session.set(this.KEY, { a: 1, now: +new Date }, expired, 's');
  }
  removeSessionData(){
      this.session.remove(this.KEY);
  }

  getSessionData(Appid){
      this.value = this.session.get(Appid);
      this.QlikSenseMeasures =[];
      this.QlikSenseDiamentions=[];
      // console.log(this.value)



      for(var i=0;i<this.value.length;i++){
          var measures1 = this.value[i].measures ;
          var dimension1 = this.value[i].dimensions;
          console.log("Mes")
          console.log(measures1)
          console.log("Dia")
          console.log(dimension1);
          for(var j=0 ; j < measures1.length;j++)
          {
            // var x = measures1[j].pingMeasuresqLabel ;
            var x = measures1[j].pingMeasuresqLabel;
           
            var xID =  measures1[j] + i;
           
                
                this.QlikSenseMeasures.push(
                  { 
                    "Appid":  Appid ,
                    "pingMeasuresqLabel": measures1[j].pingMeasuresqLabel,
                    "pingMeasuresqDef":  measures1[j].pingMeasuresqDef,                
                   
                  }
                );
               
          }
          console.log(this.QlikSenseMeasures);
          // Diamention
          for(var j=0 ; j < dimension1.length;j++)
          {
            var x = dimension1[j] ;
            var xID =  dimension1[j] + i;
                this.QlikSenseDiamentions.push(
                  {
                    "Appid":  Appid ,
                    "diamention": x
                  }
                );
          }

      }
      
      
      this.frmAlert.get('frmCntMeasures').valueChanges.subscribe(val => {
        this.QlikSenseMeasures
      });
      this.frmAlert.get('frmCntLoopDiamention').valueChanges.subscribe(val => {
        this.QlikSenseDiamentions
      });

      this.api.CreateSession()
      .subscribe(res => {
    
        this.currentvalue = res.measuresValue
      
          // set Measures Current Value..
          this.frmAlert.get('frmCntCurrentValue').setValue(this.currentvalue)
          console.log("getMeasuresValue"+this.currentvalue);
        
        }, (err) => {
          console.log("getMeasuresValue"+err);
        });
    
     

      //this.frmAlert.valueChanges
  
      // console.log(this.QlikSenseMeasures);
  }
  
  clearSessionData() {
      this.session.clear();
  }
//#endregion
//NumberFormat
getNumFormat() {

var numFormat = '';
var currentvalue = '';
numFormat = this.frmAlert.get('frmCntNumberformat').value;
currentvalue = this.NumberToFormat;
console.log('current value', currentvalue);
var num = {
  'numFormate': numFormat,
  'CurrentValue': currentvalue
};
this.api.getNumFormat(num)
.subscribe(res => {
  console.log('Num Formate..');
  console.log(res);

  // this.currentvalue = res.measuresValue

  // set Measures Current Value..
    this.frmAlert.get('frmCntCurrentValue').setValue(res);
  //   console.log("getMeasuresValue"+this.currentvalue);
  }, (err) => {
    console.log('getMeasuresValue' + err);
  });

}

getNumFormatDefault() {

var numFormat = '';
var currentvalue = '';
numFormat = this.frmAlert.get('frmCntNumberformat').value;
currentvalue = this.NumberToFormat;
console.log('current value', currentvalue);
this.frmAlert.get('frmCntCurrentValue').setValue(currentvalue);


}
// NumberFormat End

getMeasuresValue(qdef, appid) {
this.visibleProgressBar=true;
let cookies = this.session.get("qlikcookies");
  var getMesValue = {
     'qdef': qdef,
     'appid': appid,
      "qlik_cookies":cookies
  };
  console.log(getMesValue);
 this.api.getMeasures(getMesValue)
 .subscribe(res => {

   this.currentvalue = res.measuresValue;
   this.NumberToFormat = res.measuresValue;
     // set Measures Current Value..
     this.frmAlert.get('frmCntCurrentValue').setValue(this.currentvalue);
     console.log('getMeasuresValue' + this.currentvalue);
     this.visibleProgressBar=false;
   }, (err) => {
    this.visibleProgressBar=false;
     console.log('getMeasuresValue' + err);
   });

}

getDiamention(qDia) {
  this.visibleProgressBar=true;
 console.log(qDia);  
var mea = this.frmAlert.get('frmCntMeasures').value;
let cookies = this.session.get("qlikcookies");
var putValue = {
       appid: qDia.Appid,
       qdefM: mea.pingMeasuresqDef,
       qdefD: qDia.diamention.pingDiamentionData,
       qlik_cookies:cookies
   };
   console.log(putValue);
this.api.getDiamention(putValue)
.subscribe(res => {
      console.log(res);
       this.frmAlert.get('diamentionValue').setValue(res);
       this.visibleProgressBar=false;
  });

}
getRemoveDiamention(){
  this.frmAlert.get('diamentionValue').setValue([]);

 }
// Field Value
getFieldValue(qDia){
this.visibleProgressBar=true;
 this.Fields=[];
 
 console.log(qDia);  
 var mea = this.frmAlert.get('frmCntMeasures').value; 
 let cookies = this.session.get("qlikcookies");
 var putValue={
         appid:qDia.Appid,       
         qdefD:qDia.diamention.pingDiamentionData,
         qlik_cookies :cookies
     }
 console.log(putValue);
 this.api.getFielddValue(putValue)
 .subscribe( res => {            
         console.log("Fields........");
         for(let f = 0 ;f<res.length;f++){
            const sorting = this.Fields.sort();
            sorting.push(res[f].qText);
         }
         console.log(this.Fields);  
         this.visibleProgressBar=false;
   });
}
getRemoveFieldValue(){
  this.frmAlert.get('frmCntFieldValue').get('Field').setValue([]);
  this.frmAlert.get('frmCntFieldValue').get('Value').setValue([]);
  this.frmAlert.get("filterValue").setValue('');
 }
getremoveFilter(indexNo : number){
 console.log(indexNo);
 this.frmAlert.get("filterValue").setValue('');
 this.addRowsFilter.splice(indexNo, 1);
 this.dataSource = new MatTableDataSource(this.addRowsFilter);
 // splice the array at given index & remove one row from data table

 var f1=[];
   var v1=[];
     for(let a=0;a<this.addRowsFilter.length;a++){
        f1.push(this.addRowsFilter[a].Field);
        v1.push(this.addRowsFilter[a].Value);
     }
      this.frmAlert.get('frmCntFieldValue').get('Field').setValue(f1);
      this.frmAlert.get('frmCntFieldValue').get('Value').setValue(v1);
   
}
getAddFilter(){
 // Add Element into Table
 var d = this.frmAlert.get("frmCntFieldValue").value ;
 var dia =d.Field.diamention.pingDiamentionData;
 var value =d.Value;
 let cookies = this.session.get("qlikcookies");

 this.addRowsFilter.push({     
         Field:dia,
         Value:value
       })
    console.log(this.addRowsFilter);
   this.dataSource = new MatTableDataSource(this.addRowsFilter); 

}

fetchFilterValue(){
  this.visibleProgressBar=true;
     var d = this.frmAlert.get("frmCntFieldValue").value ;
     var appid =d.Field.Appid;
    //  var dia =d.Field.diamention.pingDiamentionData;
    //  var value =d.Value;
     var mea = this.frmAlert.get('frmCntMeasures').value ;
     let cookies = this.session.get("qlikcookies");
     var putValue={
           appid:appid,
           qdefM:mea.pingMeasuresqDef,
           filter:this.addRowsFilter,
           qlik_cookies :cookies
       }
       console.log(putValue);
       this.api.getFilter(putValue)
       .subscribe(res => {
        this.frmAlert.get('frmCntFieldValue').get('selectedFieldValue').setValue(this.addRowsFilter);
             let filterValue = res.measuresValue
             this.frmAlert.get("filterValue").setValue(filterValue);
             var num = {
              'numFormate': this.frmAlert.get("frmCntNumberformat").value,
              'CurrentValue': filterValue
            };
            console.log(num);
            this.api.getNumFormat(num)
            .subscribe(res => {
              console.log('Num Formate..');
              console.log(res);
          
              // this.currentvalue = res.measuresValue
          
              // set Measures Current Value..
              this.frmAlert.get("filterValue").setValue(res);

              //   console.log("getMeasuresValue"+this.currentvalue);
              }, (err) => {
                console.log('getMeasuresValue' + err);
              });           
    
             console.log(this.addRowsFilter);
             this.visibleProgressBar=false;
         });
}


onFormSubmit(form: NgForm) {

// console.log("Submit form",form.value);
//.......DB Save.........
this.api.postAlert(form)
  .subscribe(res => {
    //   let id = res['_id'];
      // console.log("Post Alert Method**************************************");
     // console.log(res);
      this.router.navigate(['/pingAlert/alertInbox']);
      // console.log("Successfully Record Saved....");
                // Send Create Alert Mail....
                // this.api.sendMail(form).subscribe(res=>{
                //     //  console.log("Send Mails");
                //     //  console.log(res);
                //  })
                  //Sheduled Trigger  -----------------  First check On Shedule  then send Create Alert Mail then set Shedule
                  if(this.frmAlert.get("frmCntTrigger").value == "Scheduled")  
                  {
                      if(this.frmAlert.get("frmCntLoopDiamention").value.length != 0 && (this.frmAlert.get("frmCntFieldValue").get("Field").value.length == 0 && this.frmAlert.get("frmCntFieldValue").get("Value").value.length == 0)){
                              console.log("Diamention Selected....")
                              this.api.sendMail(form,"forDimension").subscribe(res=>{
                                console.log(res);
                             })   
                              //  console.log("Send Mails");
                                //  console.log(res);
                                this.api.setSheduledDia(form).subscribe(res=>{
                                  // console.log("res");
                                    // console.log(res);
                                })                               
                        }
                        else if(this.frmAlert.get("frmCntLoopDiamention").value.length != 0 && (this.frmAlert.get("frmCntFieldValue").get("Field").value.length != 0 && this.frmAlert.get("frmCntFieldValue").get("Value").value.length != 0)){
                          console.log("with filter Diamention Selected....")
                          this.api.sendMail(form,"forDimension").subscribe(res=>{
                            console.log(res);
                         })   
                          //  console.log("Send Mails");
                            //  console.log(res);
                            this.api.setSheduledDia(form).subscribe(res=>{
                              // console.log("res");
                                // console.log(res);
                            })                               
                        }
                        else if(this.frmAlert.get("frmCntLoopDiamention").value.length == 0 && (this.frmAlert.get("frmCntFieldValue").get("Field").value.length != 0 && this.frmAlert.get("frmCntFieldValue").get("Value").value.length != 0)){
                          console.log("Field Selected....");
                          this.api.sendMail(form,"forFilter").subscribe(res=>{
                            console.log(res);
                          })
                          this.api.setSheduledFilter(form).subscribe(res=>{
                            // console.log("res");
                              // console.log(res);
                          })
                          
                        }
                        else{
                          console.log("in Measures Condition...");  
                          this.api.sendMail(form,"forMeasures").subscribe(res=>{
                            console.log(res);
                          })
                          this.api.setSheduled(form).subscribe(res=>{
                            // console.log("res");
                              // console.log(res);
                          })    
                        }
                  }
                  else{
                    // console.log("Please Fill");
                    if(this.frmAlert.get("frmCntLoopDiamention").value.length != 0 && (this.frmAlert.get("frmCntFieldValue").get("Field").value.length == 0 && this.frmAlert.get("frmCntFieldValue").get("Value").value.length == 0)){
                      console.log("Diamention Selected....")
                      this.api.sendMail(form,"forDimension").subscribe(res=>{
                        console.log(res);
                     })                                  
                }
                else if(this.frmAlert.get("frmCntLoopDiamention").value.length != 0 && (this.frmAlert.get("frmCntFieldValue").get("Field").value.length != 0 && this.frmAlert.get("frmCntFieldValue").get("Value").value.length != 0)){
                  console.log("with filter Diamention Selected....")
                  this.api.sendMail(form,"forDimension").subscribe(res=>{
                    console.log(res);
                 })   
                                             
                }
                
                else if(this.frmAlert.get("frmCntLoopDiamention").value.length == 0 && (this.frmAlert.get("frmCntFieldValue").get("Field").value.length != 0 && this.frmAlert.get("frmCntFieldValue").get("Value").value.length != 0)){
                  console.log("Field Selected....");
                  this.api.sendMail(form,"forFilter").subscribe(res=>{
                    console.log(res);
                  })
                  
                }
                else{
                  console.log("in Measures Condition...")
                  
                  this.api.sendMail(form,"forMeasures").subscribe(res=>{
                       console.log(res);
                  })
                    
                }
                  }
    }, (err) => {
      console.log(err);
    });

//.......Clear Local Storage......
this.clearSessionData(); 

}

myFunction() {
  var input, filter, ul, li, a, i;
  input = document.getElementById('myInput');
  filter = input.value.toUpperCase();
  ul = document.getElementById('myUL');
  li = ul.getElementByTagName('mat-option');
  for ( i=0; i<li.length; i++ ) {
    a = li[i].getElementsByTagName('mat-option')[0];
    if(a.innerHTML.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = '';
    } else {
      li[i].style.display = 'none'
    }
  }
}
}
