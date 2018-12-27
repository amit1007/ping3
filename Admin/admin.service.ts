import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';


//globle variable 
const PingUserRole = "/user";
const AddLocation = "/AddLocation";
const QlikUser = "/QlikUserSync";
const BulkUseradd = "/UploadBulkUser";
const channelType = "/ChannelType";
const channelName = "/ChannelName";
const deliveryChannel = "/DeliveryChannel";
const DataSourceEditUrl ="/DataSourceEdit"

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};


@Injectable({
  providedIn: 'root'
})
export class AdminService {
 
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

 
 //methods 
 

      getPingUsers(): Observable<any> {  
        
        return this.http.get(PingUserRole, httpOptions).pipe(
          map(this.extractData),
          catchError(this.handleError));
      }

      //Bulk User Add Api
      postFileUpload(data): Observable<any> {
        console.log("#####Post File upload",data)
        return this.http.post(BulkUseradd, data, httpOptions)
          .pipe(
            catchError(this.handleError)
          );
      }

     

    

          //***********************Delivery channel Type Start***** */

          getChannelTypes(): Observable<any> {    
            console.log("in channel TYpe Admin service")
            return this.http.get(channelType, httpOptions).pipe(
              map(this.extractData),             
              catchError(this.handleError));
          }
          
          getCahnnelType(id:string): Observable<any> {
          console.log('************ In Ping User  *******'+id)
            const url = `${channelType}/${id}`;
            console.log(url);
            return this.http.get(url,httpOptions).pipe(
              map(this.extractData),
              catchError(this.handleError));
          }
          
          
          
          UpdateChannelType(id,data): Observable<any> {  
              const url = `${channelType}/${id}`;
            return this.http.put(url, data, httpOptions)
            .pipe(
            catchError(this.handleError)
            );
          }
          
          deleteCahnnelType(id: string): Observable<{}> {
            const url = `${channelType}/${id}`;
            return this.http.delete(url, httpOptions)
              .pipe(
                catchError(this.handleError)
              );
          }
          postChannelType(data): Observable<any> {
            return this.http.post(channelType, data, httpOptions)
              .pipe(
                catchError(this.handleError)
              );
          }
          // Total Alert Count
          getChannelTypeCount(): Observable<any> {
            return this.http.get(channelType + '/count', httpOptions).pipe(
              map(this.extractData),
              catchError(this.handleError));
          }

          //******************************************************* */
          //***********************Delivery channel Type End****** */

           //region  Cahnnel creation Details

          getChannelNames(): Observable<any> {    
            return this.http.get(channelName, httpOptions).pipe(
              map(this.extractData),             
              catchError(this.handleError));
          }
          
          getCahnnelName(id:string): Observable<any> {
          console.log('************ In Ping User  *******'+id)
            const url = `${channelName}/${id}`;
            console.log(url);
            return this.http.get(url,httpOptions).pipe(
              map(this.extractData),
              catchError(this.handleError));
          }  
          
          UpdateChannelName(id,data): Observable<any> {  
              const url = `${channelName}/${id}`;
            return this.http.put(url, data, httpOptions)
            .pipe(
            catchError(this.handleError)
            );
          }
          
          deleteCahnnelName(id: string): Observable<{}> {
            const url = `${channelName}/${id}`;
            return this.http.delete(url, httpOptions)
              .pipe(
                catchError(this.handleError)
              );
          }
          postChannelName(data): Observable<any> {
            return this.http.post(channelName, data, httpOptions)
              .pipe(
                catchError(this.handleError)
              );
          }
          // Total Alert Count
          getChannelNameCount(): Observable<any> {
            return this.http.get(channelName + '/count', httpOptions).pipe(
              map(this.extractData),
              catchError(this.handleError));
          }
    //******************************************************* */
        //***********************Delivery channel Name End****** */


        //******************************************************* */
        //***********************Delivery channel Start****** */

        // For All Email Details
        getDeliveryCahnnels(): Observable<any> { 
             
          return this.http.get(deliveryChannel, httpOptions).pipe(
            map(this.extractData),             
            catchError(this.handleError));
        }
        //For Mobile App Details
        getMobileAppDeliveryCahnnels(): Observable<any> {    
          const URL1='/DeliveryChannel/GetMobileAppDetails' ; 
          return this.http.get(URL1, httpOptions).pipe(
            map(this.extractData),             
            catchError(this.handleError));
        }
        getAllDeliveryCahnnels(): Observable<any> {  
          const URL1='/DeliveryChannel/countChannel' ; 
          console.log("Got it***********"+URL1);
          return this.http.get(URL1, httpOptions).pipe(
            map(this.extractData),             
            catchError(this.handleError));
        }
        //Get Only Mobile App
        getAllDeliveryMobileChannel(): Observable<any> {  
          const URL1='/DeliveryChannel/MobileAppDetails' ; 
          console.log("Got it***********"+URL1);
          return this.http.get(URL1, httpOptions).pipe(
            map(this.extractData),             
            catchError(this.handleError));
        }
        //GEt Only Email App DEtails
        getAllDeliveryEmailChannel(): Observable<any> {  
          const URL1='/DeliveryChannel/EmailAppDetails' ; 
          console.log("Got it***********"+URL1);
          return this.http.get(URL1, httpOptions).pipe(
            map(this.extractData),             
            catchError(this.handleError));
        }        
        getDeliveryCahnnel(id:string): Observable<any> {
        console.log('************ In Channel Edit  *******'+id)
          const url = `${deliveryChannel}/${id}`;
          console.log(url);
          return this.http.get(url,httpOptions).pipe(
            map(this.extractData),
            catchError(this.handleError));
        }
        UpdateDeliveryChannel(id,data): Observable<any> {  
            const url = `${deliveryChannel}/${id}`;
          return this.http.put(url, data, httpOptions)
          .pipe(
          catchError(this.handleError)
          );
        }
        deleteDeliveryChannel(id: string): Observable<{}> {
          const url = `${deliveryChannel}/${id}`;
          return this.http.delete(url, httpOptions)
            .pipe(
              catchError(this.handleError)
            );
        }
        postDeliveryChannel(data): Observable<any> {
          return this.http.post(deliveryChannel, data, httpOptions)
            .pipe(
              catchError(this.handleError)
            );
        }
        // Total Alert Count
        getDeliveryChannelCount(): Observable<any> {
          return this.http.get(deliveryChannel + '/count', httpOptions).pipe(
            map(this.extractData),
            catchError(this.handleError));

        }
        ValidateEmailID(data) : Observable<any>{

          console.log("In Validate Email ID"+data);
          const sendMailURL = "/sendMail/ValidateID";
          return this.http.post(sendMailURL, data, httpOptions)
              .pipe(
                catchError(this.handleError)
              );
        }

        //********************End********************* */

        //****************************************** */
        //Datasourse Apis started
        DataSourceEdit(data): Observable<any> {
          return this.http.post(DataSourceEditUrl, data, httpOptions)
            .pipe(
              catchError(this.handleError)
            );
        }
        DataSourceDetails(): Observable<any> {
          return this.http.get(DataSourceEditUrl, httpOptions).pipe(
            map(this.extractData),
            catchError(this.handleError));
        }
        getDataSourceCahnnel(id:string): Observable<any> {
          console.log('************ In Data Source   *******'+id)
            const url = `${DataSourceEditUrl}/${id}`;
            console.log(url);
            return this.http.get(url,httpOptions).pipe(
              map(this.extractData),
              catchError(this.handleError));
          }         

        DataSourceEditDetails(id,data): Observable<any> { 
          console.log('in Update User ROle') 
          const url = `${DataSourceEditUrl}/${id}`;
        return this.http.put(url, data, httpOptions)
        .pipe(
        catchError(this.handleError)
        );
      }
      deleteDataSourceNew(id: string): Observable<{}> {
        const url = `${DataSourceEditUrl}/${id}`;
        return this.http.delete(url, httpOptions)
          .pipe(
            catchError(this.handleError)
          );
      }
      getDataSourceNew(): Observable<any> {  
        return this.http.get(DataSourceEditUrl, httpOptions).pipe(
          map(this.extractData),
          catchError(this.handleError));
      }
      //************************************************************************* */

        //region New  ping User creationb Details

  getPingUsersNew(): Observable<any> {  
    return this.http.get(PingUserRole, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  //region New  ping User Details Login ID Wise
  getPingUserStatusWise(id:boolean): Observable<any> { 
    console.log('in service APi',id); 
    const loginURL="/user/UserListStatusWise"
    const url = `${loginURL}/${id}`;
    console.log("New URL"+url)
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
  

  //region New  ping User Details Login ID Wise
  getPingUsersLoginIDWise(id:string): Observable<any> { 
    console.log('in service APi',id); 
    const loginURL="/user/LoginIdWise"
    const url = `${loginURL}/${id}`;
    console.log("New URL"+url)
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
  
  getPingUserNew(id:string): Observable<any> {
    console.log('+++++',id);
    const url = `${PingUserRole}/${id}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
  

  getPingUserIDDetails(id: string): Observable<any> {
    console.log('in user Role Id Details'+id)
    const url = `${PingUserRole}/${id}`;
    // console.log(url);
    return this.http.get(url, httpOptions)
    .pipe(
      map(this.extractData, () => {
        console.log(this.extractData);
      }),
      catchError(this.handleError)
    );
  }
  // UpdatePingUserNew(id,data): Observable<any> {  
  //     // const url = `${PingUserRole}/${id}`;
  //     const url ='/pingUser/register';
  //   return this.http.put(url, data, httpOptions)
  //   .pipe(
  //   catchError(this.handleError)
  //   );
  // }

  postPingUserDetails(data): Observable<any> {
    console.log('i m in',data);
    const url ='/user/register';
    return this.http.post(url, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  UpdatePingUserRole(id,data): Observable<any> { 
    console.log('in Update User ROle') 
    const url = `${PingUserRole}/${id}`;
  return this.http.put(url, data, httpOptions)
  .pipe(
  catchError(this.handleError)
  );
}

  postPingUserLogin(data): Observable<any> {    
    console.log('In login fuction');
    const url ='/user/login';
    return this.http.post(url, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  pinUserLogout(): Observable<any> {
    console.log('In Logout function');
    const url ='/user/logout';
   
    return this.http.get(url,httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  pingLoginDetails(data): Observable<any> {
    console.log('In pingLoginDetails function');
    const url ='/user/FetchUser';   
    return this.http.get(url,httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  pingVerifyUser(data): Observable<any> {
    console.log('In ping Verify User function');
    console.log(data);
    const httpOptions1 = {
      headers: new HttpHeaders({'x-access-token':data
    })
    };
    const url ='/user/UserVerification';   
    return this.http.get(url,httpOptions1)
      .pipe(
        catchError(this.handleError)
      );
  }


  fetchPingUserDetails(data): Observable<any> {
    console.log('In fetchPingUserDetails function');
    console.log(data);
    const httpOptions1 = {
      headers: new HttpHeaders({'x-access-token':data
    })
    };
    const url ='/UserRole/GetUser';   
    return this.http.get(url,httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  
  deletePingUserNew(id: string): Observable<{}> {
    const url = `${PingUserRole}/${id}`;
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  // deletePingUserNew(id: string): Observable<{}> {
  //   const PingUserRole = "/UserRoleDelete/:id";
  //   const url = `${PingUserRole}/${id}`;
  //   return this.http.delete(url, httpOptions)
  //     .pipe(
  //       catchError(this.handleError)
  //     );
  // }
  
  postPingUserNew(data): Observable<any> {
    return this.http.post(PingUserRole, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  // Total Alert Count
  getUserMaxNew(): Observable<any> {
    return this.http.get(PingUserRole + '/count', httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

 
  //endregion

  //User Preference Screen APis
   // TimeZone Location
   getLocations(): Observable<any> {
    return this.http.get(AddLocation, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  postLocation(data): Observable<any> {
    console.log(data)
    return this.http.post(AddLocation, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  //Add Dynamic Qlik Users 
  fetchQlikUsers():Observable<any>{
  return this.http.get(QlikUser+'/UserSync',httpOptions).pipe(
    catchError(this.handleError)
  );
  }

}