import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  getAllBooks(): Observable<any> {
    return this.http.get(environment.SERVER_URL + '/book/getAllBooks');
  }

  borrowBook(bookUserId): Observable<any> {
    return this.http.post(environment.SERVER_URL + '/book/borrowBook' , bookUserId);
  }

  getUserBook(userId): Observable<any> {
    return this.http.get(environment.SERVER_URL + '/book/getUserBook?id=' + userId);
  }
}
