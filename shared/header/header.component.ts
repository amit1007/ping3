import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AppService } from '../../app.service';
import { LoginService } from '../../LoginModule/login.service';
import { AdminService } from '../../Admin/admin.service';
import {AppComponent} from '../../app.component'
export interface DialogData {
  animal: string;
  name: string;
}


export interface TimeZone {
  id: string;
  name: string;
}

export interface Places {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  animal: string;
  AdminFlag:boolean;
  name: string;
  show =  false;
  showAdmin =  false;
  static data:number=0;
  puserRole:string='';
  userRole:boolean=false;
  roleStr:string='Administrat';
  pingUserID:string;
  loggedUser:boolean=true;
  newRole:string;
  toggleCollapse() {
    if (this.show === true) {
      this.show = false;
    } else {
      this.show = true;
    }
  }
  
 
constructor(
  private fb: FormBuilder,
  private commonAPI:AppService,
  private loginAPI:LoginService,
  private router: Router,
  private formBuilder: FormBuilder,
  public snackbar: MatSnackBar,
  public dialog: MatDialog,
  public _app:AppComponent
) { }

  ngOnInit() {

    console.log("Admin flag");
    console.log(this._app.pingAdminFlag);
    // console.log("HEader File",this._app.pingAdminFlag)
    // this.AdminFlag =this._app.pingAdminFlag;
    
    console.log("In Header After Login ");
    this.commonAPI.getLoggeddUser().subscribe(res=>{
      console.log("Header File",this._app.pingAdminFlag)
      this.AdminFlag =this._app.pingAdminFlag;
    console.log(res);
      this.newRole=res.PingRole;
        this.loggedUser=true;
     
        console.log("this.AdminFlag");   console.log(this.AdminFlag);
        console.log("UserROle"+res.PingRole)
        if(res.PingRole=='User'){      
          this._app.pingAdminFlag=false;   
          this.userRole=this._app.pingAdminFlag;
        } else if(res.PingRole=='Connnection Manager'){
          this._app.pingAdminFlag=false; 
          this.userRole=this._app.pingAdminFlag;
          console.log("Connection Manager FLag"+this.userRole);
        }  else if(res.PingRole=='Administrator'){
          this._app.pingAdminFlag=true; 
          this.userRole=this._app.pingAdminFlag;
          console.log("Administrator FLag"+this.userRole);
        }
        else if(res.PingRole=='SuperAdmin'){
          this._app.pingAdminFlag=true; 
          this.userRole=this._app.pingAdminFlag;
          console.log("Uper aDmin FLag"+this.userRole);
        }
        else{
          console.log("Connection Manager FLag"+this.userRole);
          this._app.pingAdminFlag=false; 
          this.userRole=this._app.pingAdminFlag;
        }
    },(err)=>{
      console.log(err);
    })

  }

  logoutUser(){
    try {
      this.loginAPI.logoutPingUser().subscribe(res=>{
        console.log("Successfully Logged Out");
      })
    } catch (error) { 
      console.log(error)
    }
  }


  //Click Event
  // logoutUser()
  // {
  //   this.loginAPI.pinUserLogout()
  //   .subscribe(res => {
  //       //let id = res['_id'];
  //       this.snackbar.open('Succesfully Logout', 'Close', {
  //         duration: 3000,
  //       });

        
  //       this.router.navigate(['/PingLogin']);
        

       

  //     }, (err) => {
  //       this.snackbar.open('User name or password is wrong..!!', 'Close', {
  //         duration: 3000,
  //       });
  //       console.log(err);
  //     });

  // }

  openDialog(): void {   
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      width: '30%',
      height: '55%',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

}

@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialogComponent {
  TimezoneServer: FormGroup;  
  selectedValue: string;
  selectValue: string;

  timezones: TimeZone[] = [];
  id : ''
  timezonename = ''
  prefferdChanel = ''
  places: Places[] = [
    {value: 'Email', viewValue: 'Email'},
    {value: 'Mobile App', viewValue: 'Mobile App'}
  ];

  

  constructor( public dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,public api:AdminService,private formBuilder: FormBuilder,public snackbar: MatSnackBar) {
      this.api.getLocations()
      .subscribe(res => {
        //console.log("Num Formate..")
        console.log(res);
        this.timezones = res
        }, (err) => {
          console.log("getlocation"+err);
        });

        this.TimezoneServer = this.formBuilder.group({
          // id: '',
         
          // timeZoneLocation : new FormControl(this.foods, Validators.required),
         
          // prefferdChanel: new FormControl(this.places,Validators.required), 
          
        }) 
    }
  
    getTimezoneId(id, name){
      this.id =id 
      this.timezonename = name
      }

      getPlace(placeName){
        this.prefferdChanel = placeName
      }
    
      onFormSubmit(form:NgForm) {
        // this.http.get('http://api.timezonedb.com/v2/list-time-zone?key=R1QCTP0EHTUU&format=json&fields=zoneName,gmtOffset').subscribe((res:Response) => this.countryData = res.json());
        
        // console.log(this.countryData)
        console.log('User Preference Form Submited ',form);   
        form["timeZoneId"] = this.id
        form['timeZoneLocation'] = this.timezonename
        form['prefferdChanel'] = this.prefferdChanel
        form["InsertBy"] = localStorage.getItem('User')
        form["LoggedUerID"] = localStorage.getItem('User')
        form["IsActive"] = true
        console.log('form after',form)
        console.log('Form Submited ',form);
        this.api.postLocation(form)
          .subscribe(res => {
              //let id = res['_idUser'];
              console.log("In  Preference")
              this.snackbar.open('Succesfully submitted user details', 'Close', {
                duration: 3000,
              });
             
              console.log("Successfully Record Saved....");
            }, (err) => {
              this.snackbar.open('Something went wrong..!!', 'Close', {
                duration: 3000,
              });
              console.log(err);
            });
        //this.api.getLocations()
     
       }
      

  onNoClick(): void {
    console.log("on Popup close")
    this.dialogRef.close();
  }

 }
