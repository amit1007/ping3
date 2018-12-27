import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

const pingAlertApi = "/pingAlert";
const QlikSenseMeasuresUrl = "/QlikSenseMeasures";
const QlikSenseUrl = "/QlikSense";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class PingAlertService {
  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(error);
  };

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }  

  //#region All CRUD Operation's
  
  getAlerts(): Observable<any> {
    
    return this.http.get(pingAlertApi, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
  getLoginIDWiseAlerts(id:string): Observable<any> {
    console.log('in service APi',id); 
    const loginURL="/pingAlert/LoggedUserWiseAlertData"
    const url = `${loginURL}/${id}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
  getLoginIDWiseAlertsHistory(id:string): Observable<any> {
    console.log('in service APi',id); 
    const AlertHistory="/history/LoggedUserWiseAlertHistoryData"
    const url = `${AlertHistory}/${id}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
  getHistory(userId:string): Observable<any> {
    // const httpOptions1 = {
    //   headers: new HttpHeaders({'Token': localStorage.getItem('jwtToken')})
    // };
    const URL = "/history/userId";
    return this.http.get(URL, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
  getAlertHistroy(id: string): Observable<any> {
    const URL = "/history";
    const url = `${URL}/${id}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
  // Total Alert Count
  getAlertsMax(): Observable<any> {
    return this.http.get(pingAlertApi+'/count', httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
  //Get Alert max count 
  getAlertsMaxCount(searchDate:string): Observable<any> {
    const URL = pingAlertApi+"/maxCountMonth";
    const url = `${URL}/${searchDate}`
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
  getAlert(id: string): Observable<any> {
    const url = `${pingAlertApi}/${id}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
  postAlert(data): Observable<any> {
    console.log('-------------',data)
    var caty=this.http.post(pingAlertApi, data, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
    console.log('Caty.....',caty);
    return caty;
    // return this.http.post(pingAlertApi, data, httpOptions)
    //   .pipe(
    //     catchError(this.handleError)
    //   );
  }  
  //Edit Alert 
  updateAlert(id,data): Observable<any> {
    const url = `${pingAlertApi}/${id}`;
    return this.http.put(url, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  // tigger true or false
  updatetriggerAlert(data): Observable<any> {
    const url = `${pingAlertApi}/trigger/${data.id}`;
    console.log(data);
    return this.http.put(url, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }  
  deleteAlert(id: string): Observable<{}> {
    const url = `${pingAlertApi}/${id}`;
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }  
  deleteAlertIsActive(id: string): Observable<{}> {
    const isActive = 'IsActive'
    console.log('deleteAlertIsActive TS FIle....')
    const url = `${pingAlertApi}/${isActive}/${id}`;
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  //#region QlikSense Object's
  getQlikSenseObject(qlikUserDetail): Observable<any> {  
    // const httpOptions1 = {
    //   headers: new HttpHeaders({user_directory :qlikUserDetail.user_directory,
    //     user_name :qlikUserDetail.user_name ,
    //     origin : qlikUserDetail.origin})
    // };
    return this.http.get(QlikSenseUrl+'/', httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
  CreateSession():Observable<any>{

    return this.http.get(QlikSenseMeasuresUrl+'/', httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));

  }

  getNumFormat(data): Observable<any> {

    const NumFormateURl ="NumFormate";
      return this.http.post(NumFormateURl, data,httpOptions).pipe(  
      catchError(this.handleError));
    
  }

  getMeasures(getMesValue) : Observable<any>{

    return this.http.post(QlikSenseMeasuresUrl+'/getMeasureValue', getMesValue,httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  
  }

  getDiamention(getMesValue) : Observable<any>{

    return this.http.post(QlikSenseMeasuresUrl+'/getDiamentionValue', getMesValue,httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  
  }
  getFielddValue(getMesValue) : Observable<any>{

    return this.http.post(QlikSenseMeasuresUrl+'/getFielddValue', getMesValue,httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  
  }

  getFilter(putValue) : Observable<any>{

    return this.http.post(QlikSenseMeasuresUrl+'/getFilterValue', putValue,httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  
  }
  

  sendMail(data,mailby) : Observable<any>{

    const httpOptionsMail = {
      headers: new HttpHeaders({'Content-Type': 'application/json',
              'ping-mail-by': mailby              
         })
    };

    // console.log("###***********"+data);
    const sendMailURL = "/sendMail";
    return this.http.post(sendMailURL,data,httpOptionsMail)
        .pipe(
          catchError(this.handleError)
        );
  }

  //edited Mail Send...
  sendMailEdited(data,mailby) : Observable<any>{

    const httpOptionsMail = {
      headers: new HttpHeaders({'Content-Type': 'application/json',
              'ping-mail-by': mailby              
         })
    };

    // console.log("###***********"+data);
    const sendMailURL = "/sendMail/editAlertMail";
    return this.http.post(sendMailURL,data,httpOptionsMail)
        .pipe(
          catchError(this.handleError)
        );
  }

  ValidateEmailID(data) : Observable<any>{

    console.log("In Validate Email ID"+data);
    const sendMailURL = "/sendMail/ValidateID";
    return this.http.post(sendMailURL, data, httpOptions)
        .pipe(
          catchError(this.handleError)
        );
  }


  ValidateEmailServer(data) : Observable<any>{

    console.log("In Validate Email ID"+data);
    const sendMailURL = "/TestMailServer";
    return this.http.post(sendMailURL, data, httpOptions)
        .pipe(
          catchError(this.handleError)
        );
  }

  setSheduled(data) : Observable<any>{

    console.log(data);
    const SetSheduledURL = "/SetSheduled";
    return this.http.post(SetSheduledURL, data, httpOptions)
        .pipe(
          catchError(this.handleError)
        );
  }
  setSheduledDia(data) : Observable<any>{

    console.log(data);
    const SetSheduledURL = "/SetSheduled/Diamention";
    return this.http.post(SetSheduledURL, data, httpOptions)
        .pipe(
          catchError(this.handleError)
        );
  }

  setSheduledFilter(data) : Observable<any>{
    console.log(data);
    const SetSheduledURL = "/SetSheduled/Filter";
    return this.http.post(SetSheduledURL, data, httpOptions)
        .pipe(
          catchError(this.handleError)
        );
  }

 
  //#endregion
    //region  ping User creationb Details

 //MobileNotify
 getMobileNotify(EmailID:string): Observable<any> {
  const httpOptions1 = {
    headers: new HttpHeaders({'Token': EmailID})
  };
  return this.http.get(pingAlertApi+'/MobileNotify', httpOptions1).pipe(
    map(this.extractData),
    catchError(this.handleError));
}
//#endregion

DecodeUserToken():Observable<any>{
  // console.log('In ping Decode User verify function',localStorage.getItem('jwtToken'));
   //console.log(data);
   var ValidToken1=localStorage.getItem('jwtToken')
   console.log("Validated Token is If Condition"+ValidToken1)
  
   if(ValidToken1!=null)
     {
      console.log("Validated Token is If Condition"+ValidToken1)
       const httpOptions1 = {
         headers: new HttpHeaders({'x-access-token':ValidToken1
       })
       };
       const url ='/PingComman/decodeUserToken';   
       return this.http.get(url,httpOptions1)
         .pipe(
           catchError(this.handleError)
         );
     }
     else
     {
      console.log("Validated Token is else Condition"+ValidToken1)
      //  return null;
     }  
 }

 onEdit(id: string): Observable<any> {
  const url = `${pingAlertApi}/${id}`;
  // console.log(url);
  return this.http.get(url, httpOptions)
  .pipe(
    map(this.extractData, () => {
      console.log(this.extractData);
    }),
    catchError(this.handleError)
  );
}
 
}