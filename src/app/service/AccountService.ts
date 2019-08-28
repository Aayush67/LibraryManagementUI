import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../environments/environment';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private http: HttpClient) {}

  registration(data): Observable<any> {
    console.log('In service');
    // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('user:secret123') });
    // headers.append('Content-Type', 'application/json');
    return this.http.post(environment.SERVER_URL + '/account/register', data);
  }

  login(credentials): Observable<any> {
    console.log('In service');

    // let headers = new Headers();
    // headers.append('Accept', 'application/json')
    // // creating base64 encoded String from user name and password
    // var base64Credential: string = btoa( user.username+ ':' + user.password);
    // headers.append("Authorization", "Basic " + base64Credential);
    //
    // let options = new RequestOptions();
    // options.headers=headers;
    //
    // return this.http.get(AppComponent.API_URL+"/account/login" ,   options)
    //   .map((response: Response) => {
    //     // login successful if there's a jwt token in the response
    //     let user = response.json().principal;// the returned user object is a principal object
    //     if (user) {
    //       // store user details  in local storage to keep user logged in between page refreshes
    //       localStorage.setItem('currentUser', JSON.stringify(user));
    //     }
    //   });


/*    const basicHeaderString = 'Basic ' + window.btoa(credentials.email + ':' + credentials.password );
    const header = new HttpHeaders({
      Authorization: basicHeaderString
    });
    // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('user:secret123') });
    // headers.append('Content-Type', 'application/json');
    return this.http.get<any>(environment.SERVER_URL + '/account/login', {headers : header})
      .pipe(tap(() => {
      }), catchError((error: HttpErrorResponse) => {
        return throwError(error);
      }));*/


    return this.http.post<any>(environment.SERVER_URL + '/account/login', credentials)
      .pipe(tap(() => {
      }), catchError((error: HttpErrorResponse) => {
        return throwError(error);
      }));

    // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('user:secret123') });

    console.log('Data', credentials);

    // return this.http.post(environment.SERVER_URL + '/account/login', credentials);
  }

  home(): Observable<any> {
  // console.log("Service")
    return this.http.get(environment.SERVER_URL + '/home');
  }

}
