import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';


const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  //globle variable 
const PingUserRole = "/user";
const BulkUseradd = "/AddLocation";

  
@Injectable({
    providedIn: 'root'
  })
  export class SuperAdminService {
   
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
   
        
        postPingUserDetails(data): Observable<any> {
          console.log('i m in',data);
          const url ='/user/register';
          return this.http.post(url, data, httpOptions)
            .pipe(
              catchError(this.handleError)
            );
        }
  
        getPingUsers(): Observable<any> {  
          
          return this.http.get(PingUserRole, httpOptions).pipe(
            map(this.extractData),
            catchError(this.handleError));
        }

        getPingUsersCount(): Observable<any> {  
          console.log("in Login ts USers Count")
          const loginURL="/user/pingCount"
            return this.http.get(loginURL, httpOptions).pipe(
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
  
       
  
      
  
            
  
  }