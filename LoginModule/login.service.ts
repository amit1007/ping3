import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.log(error);
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  };

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }


    //login user
    postPingUserLogin(data): Observable<any> {
      console.log('i m in',data);
      const url ='/user/login';
      return this.http.post(url, data, httpOptions)
        .pipe(
          catchError(this.handleError)
        );
   }

    //login user
    PingUserCount(): Observable<any> {
      console.log('i m in pinguser count');
      const url ='/user/loginCount';
      return this.http.get(url,httpOptions)
        .pipe(
          catchError(this.handleError)
        );
   }

   getPingUsersCount(): Observable<any> {  
    console.log("in Login ts USers Count")
    const loginURL="/user/pingCount"
      return this.http.get(loginURL, httpOptions).pipe(
        map(this.extractData),
        catchError(this.handleError));
    }

    getDactivePingUsersCount(): Observable<any> {  
      console.log("in Login ts USers Count")
      const loginURL="/user/dactiveUserCount"
        return this.http.get(loginURL, httpOptions).pipe(
          map(this.extractData),
          catchError(this.handleError));
      }

    logoutPingUser():Observable<any>{
      console.log('i m in logout Ping user');
      const url ='/user/logout';
      return this.http.get(url,httpOptions)
        .pipe(
          catchError(this.handleError)
        );
    }

    CheckDateLocker():Observable<any>{
      console.log("In Datechecker Function")
      return this.http.get("/DateLocker",httpOptions)
        .pipe(
          catchError(this.handleError)
        );
      
    }

    AddRegKey():Observable<any>{
      console.log("In Add Registery Function")
      return this.http.get("/DateLocker/AddRegKey",httpOptions)
        .pipe(
          catchError(this.handleError)
        );
      
    }
    RenewLicense():Observable<any>{
      console.log("In REnew License Function")
      return this.http.get("/RenewLicense/RenewLicense",httpOptions)
        .pipe(
          catchError(this.handleError)
        );
      
    }
}
