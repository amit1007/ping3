import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import {MatSnackBar} from '@angular/material/snack-bar';

import { FileUploader } from 'ng2-file-upload';
import { AppService } from 'src/app/app.service';
import { AdminService } from 'src/app/Admin/admin.service';
const URL = '../upload/';
export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-create-data-source',
  templateUrl: './create-data-source.component.html',
  styleUrls: ['./create-data-source.component.css']
})
export class CreateDataSourceComponent implements OnInit {
  public uploader:FileUploader = new FileUploader({url: URL});
  
  food: Food[] = [
    {value: 'None', viewValue: 'None'},
    {value: 'QlikSense Server', viewValue: 'Qlik-Sense Server'},
    {value: 'Power BI', viewValue: 'Power BI'},
    {value: 'Oracle DB', viewValue: 'Oracle DB'}
  ];
  showCertificate:boolean=false;
  UploadCertificateFlag:boolean=false;
  userForm: FormGroup;
  sourcename:string='';
  userdirectory:string='';
  hostname:string='';
  connect:string='';
  type:string='';
  origin:string;
  certPassword:string;
  mongoDbPort:string;
 
  //  Next Version 
  // color = 'accent';
  // checked = false;
  // disabled = false;

  // device = true;
  // devic = false;
  // stream = false;
  // Sales = false ;
  // Inventory = false;
  // Operations = false;
  // Finance = false;
  // Processing = false;
  // Archive = false;
  // Application = false;
  // Good = false;
  // Stock =false;
  // Human= false;
  // HR = false ;
  // Consumer = false;
  constructor(private router: Router, 
              private commanApi:AppService,
              private api: AdminService , 
              private formBuilder: FormBuilder,
              public snackbar: MatSnackBar,) { }  

              ngOnInit() {    
                // this.commanApi.getLoggeddUser().subscribe(res=>{
                // },err=>{
                //   console.log("session Expires in datasource details"+err)
                //   this.router.navigate(['/login']);
                // })
                // console.log(this.foods)
                this.userForm = this.formBuilder.group({
                  "dataSourceId" :"01",
                  'sourcename' :'',
                  'userdirectory':'qlik-sense',
                  'hostname' : '',
                  'connect' : '',
                  'InsertBy':'SuperAdmin',
                  'LoggedID':'User1',
                  'type':'qlik-sense',
                  'certPassword':'',
                  'mongoDbPort':''
                })
              }
              toggleCollapse(){
                
              }

              onFormSubmit(form:NgForm) {            
                console.log("Hi........")
                console.log("form:",form)
                // this.router.navigate(['/data-source']);
                // this.snackbar.open('wait connection in process Check DataBase', 'Close', {
                  // duration: 4000,});
            
                this.api.DataSourceEdit(form)
                 .subscribe(res => {
                           //  console.log(res);         
                      this.snackbar.open(res.request, 'Close', {
                        duration: 6000,
                      });

                      if(res.status === 200 ){
                        this.router.navigate(['/login']);
                      } 

                    }, (err) => {
                        this.snackbar.open('Something Went Wrong...', 'Close', {
                          duration: 3000,
                      });
                   
                  });
              }
            }
            
