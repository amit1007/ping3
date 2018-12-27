import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import {MatSnackBar} from '@angular/material/snack-bar';
import { AdminService } from '../../admin.service';
export interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-edit-datasource',
  templateUrl: './edit-datasource.component.html',
  styleUrls: ['./edit-datasource.component.css']
})
export class EditDatasourceComponent implements OnInit {

    
  foods: Food[] = [
    {value: 'None', viewValue: 'None'},
    {value: 'Server', viewValue: 'Server'},
    {value: 'qsadmin', viewValue: 'qsadmin'},
    {value: 'administrator', viewValue: 'administrator'}
  ];

  userForm: FormGroup;
  sourcename:string='';
  userdirectory:string='';
  hostname:string='';
  connect:string='';
  type:string='';
  mongoDbPort:string='';  
  certPassword:string;

 
  // constructor(private router: Router, 
  //             private api: ApiService, 
  //             private formBuilder: FormBuilder,
  //             public snackbar: MatSnackBar,) { }

constructor(private route: ActivatedRoute,
             private api: AdminService, 
             private router: Router,
                private formBuilder: FormBuilder,
                public snackbar: MatSnackBar,
               ) { }


               ngOnInit() {
                console.log('route succesfully');
                console.log(this.route.snapshot.params['id']);
                this.onEdit(this.route.snapshot.params['id']);
            
                console.log('test route succesfully');
                console.log(this.route.snapshot.params['id']);
                this.onEdit(this.route.snapshot.params['id']);
          
             
                 
              
              this.userForm = this.formBuilder.group({
                'sourcename' :'' ,
                'userdirectory':'',
                'hostname' : '',
                'connect' : '',
                'type':'',
                'mongoDbPort':'',  
                'certPassword':'',
                
              })
            }
            onEdit(id) {
              console.log('In Edit  datasourse');
              console.log(id);
              this.api.getDataSourceCahnnel(id).subscribe( res => {
                console.log('Get Edit Data');
                console.log(res);
          
                const id8 = res._id;
                console.log(id8);
                 this.userForm.get('sourcename').setValue(res.sourcename);
                 this.userForm.get('userdirectory').setValue(res.userdirectory);
                 this.userForm.get('hostname').setValue(res.hostname);
                 this.userForm.get('connect').setValue(res.connect);
                 this.userForm.get('type').setValue(res.type);
                 this.userForm.get('mongoDbPort').setValue(res.mongoDbPort);
                 this.userForm.get('certPassword').setValue(res.certPassword);
              });
              
            }
          
          
          
            // onFormSubmit(form:NgForm) {
            //   console.log("Hi..")
            //   console.log("form:",form)
           
            //   this.api.DataSourceEdit(form)
            //    .subscribe(res => {
            //      console.log('res',res)
            //       }, (err) => {
            //         this.snackbar.open('Enter Valid Field', 'Close', {
            //           duration: 3000,
            //       });
            //     });
            // }}
          onFormSubmit(form:NgForm) {
                console.log(this.route.snapshot.params['id'])
                this.api.DataSourceEditDetails(this.route.snapshot.params['id'], form)
                  .subscribe(res => {
                      res['_id']=this.route.snapshot.params['id']
                      let id = res['_id'];
                      this.snackbar.open('Added DataSource Details.. ', 'Close', {
                        duration: 3000,
                      });
                      this.router.navigate(['admin/dataSourceDetails']);
                    }, (err) => {
                      this.snackbar.open('Something went wrong...!!', 'Close', {
                        duration: 3000,
                      });
                      console.log(err);
                    }
                  );
              }
          
          
          
          
            }
          