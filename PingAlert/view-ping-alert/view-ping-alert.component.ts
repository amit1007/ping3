import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { PingAlertService } from '../ping-alert.service';

@Component({
  selector: 'app-view-ping-alert',
  templateUrl: './view-ping-alert.component.html',
  styleUrls: ['./view-ping-alert.component.css']
})
export class ViewPingAlertComponent implements OnInit {
  color = 'primary';
  checked = false;
  disabled = false;

  device = false;
  devic = false;
  formView: FormGroup;
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
  constructor(private router: Router, private route: ActivatedRoute, private api: PingAlertService, private formBuilder: FormBuilder) { }


  ngOnInit() {
    console.log(this.route.snapshot.params['id']);

    this.formView = this.formBuilder.group({
      alertname: new FormControl(''),
      AppicationName: new FormControl(''),
      CurrentValue: new FormControl(''),
      Measures: new FormControl(''),
      PreviousValue: new FormControl(''),
      triggeredTime: new FormControl(''),
      triggeredDate: new FormControl('')
});


    this.getAlertDetails(this.route.snapshot.params['id']);

  }
  getAlertDetails(id) {
    this.api.getAlertHistroy(id)
      .subscribe(data => {

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
      });
  }
}