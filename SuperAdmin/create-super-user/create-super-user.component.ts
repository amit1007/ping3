import { Component, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SuperAdminService } from '../super-admin.service';
import { AppService } from '../../app.service';
@Component({
  selector: 'app-create-super-user',
  templateUrl: './create-super-user.component.html',
  styleUrls: ['./create-super-user.component.css']
})
export class CreateSuperUserComponent implements OnInit {
  matcher;
  @ViewChild('form') form;
  QlikServer: FormGroup;
  PingUserID: String='';
  PingUserName: String='';
  PingUserDirectory : String='';
  PingUserAccess : String=''; 
  PingMemberID : String='';
  PingGroupID : String='';
  PingRole : String='';
  EmailID:String='';
  password:String='';  
  InsertBy : String= 'Qlik Admin'; 
  usercount:String='';
  count: number=0;
  LoginUserID: string = 'User8';
  userID: string = '';
  uID: any =  '';
  ShowFields:boolean=false;
  AAccess = [
    { id: 1, name: 'Use Qlik Security' },
    { id: 2, name: 'Manage in Ping' }
  ];
  HideField:boolean=false; 

  RRole = [
    { id: 2, name: 'Administrator' },
    { id: 3, name: 'Connnection Manager' },
    { id: 4, name: 'User' }
  ];
  constructor(private router: Router,private commanApi : AppService, private api: SuperAdminService, private formBuilder: FormBuilder,public snackbar: MatSnackBar,) { }

  ngOnInit() {
    // this.myForm = new FormGroup ({
    //   Access: new FormControl()
    // });
    // this.api.getPingUsers()
    // .subscribe(res => {
    //   console.log(res);
    //   this.count=res.length;
    //   this.count=this.count+1;
    //   this.userID = 'User' + this.count ;
    //   this.uID = this.QlikServer.get('PingUserID').setValue(this.userID);

    // }, err => {
    //   console.log(err);
    //   this.usercount='0';
    // });
    // this.usercount=usersCnt
    // this.commanApi.getLoggeddUser().subscribe( res => {                         
    // this.QlikServer.get('InsertBy').setValue(res.InsertBy);
    // this.QlikServer.get('LoginUserID').setValue(res.PingUserID);
    // },err => {
    //   console.log("err");
    //   console.log(err);
    //   this.router.navigate(['/login']);
    // })
    

    this.QlikServer = this.formBuilder.group({
      // id: '',
      PingUserID:['1',Validators.required],
      PingUserName: [null,Validators.required],
      PingUserDirectory : [null,Validators.required],
      PingUserAccess : 'Manage in Ping',
      EmailID:[null,Validators.required],
      password:[null,Validators.required], 
      PingMemberID : '1', 
      PingGroupID : '1', 
      PingRole : 'SuperAdmin', 
      InsertBy : 'SuperAdmin', 
      LoginUserID:'User1', 
  
    })

  
    
     
  }

  hasError(e){

  }
  getNumber(e){}
  onCountryChange(e){}
  toggleCollapse(){
    
  }
  public changeListener(files: FileList){
    console.log("*****************"+files+"**************");
    if(files && files.length > 0) {
       let file : File = files.item(0); 
         console.log("***File***",file)
         console.log(file.name);
         console.log(file.size);
         console.log(file.type);

        if (file.type == 'text/csv'){
         let reader: FileReader = new FileReader();
         reader.readAsText(file);
         reader.onload = (e) => {
            let csv: string = reader.result.toString();
            console.log(csv);
            let data = {data:csv}
            this.api.postFileUpload(data)
            .subscribe(res => {
              console.log(res);
              this.snackbar.open('Succesfully submitted user details', 'Close', {
                duration: 3000,
              });
        
            }, err => {
              console.log(err);
              this.snackbar.open('Something went wrong..!!', 'Close', {
                duration: 3000,
              });
            });
         }
        }
        else{
          console.log("File type is not appropriate format")
          this.snackbar.open('File type is not appropriate format please upload CSV format file', 'Close', {
            duration: 3000,
          });
        }
      }
  }

  onFormSubmit(form:NgForm) {
    console.log('Form Submited ',form);
    this.api.postPingUserDetails(form)
      .subscribe(res => {
          //let id = res['_id'];
          console.log(res);
          this.snackbar.open(res.msg, 'Close', {
            duration: 6000,
          });
          this.router.navigate(['/SuperAdmin/DatasourceMaster']);
          console.log("Successfully Record Saved....");
        }, (err) => {

          if(err.error.length > 1){
              this.snackbar.open('Something went wrong..!!', 'Close', {
                  duration: 3000,
                });
          }
          else{
                this.snackbar.open(err.error[0].msg, 'Close', {
                  duration: 5000,
                });
          }
                  
        });
  }

  public reset() {
    this.form.nativeElement.reset()
  }

}
