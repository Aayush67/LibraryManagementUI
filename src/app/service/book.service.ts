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

  getBookById(bookId): Observable<any> {
    return this.http.get(environment.SERVER_URL + '/book/getBookById?bookId=' + bookId);
  }

  borrowBook(bookUserId): Observable<any> {
    return this.http.post(environment.SERVER_URL + '/book/borrowBook' , bookUserId);
  }

  returnBook(bookUserId): Observable<any> {
    return this.http.post(environment.SERVER_URL + '/book/returnBook' , bookUserId);
  }

  getUserBook(userId): Observable<any> {
    return this.http.get(environment.SERVER_URL + '/book/getUserBook?id=' + userId);
  }

  addBook(bookDetail): Observable<any> {
    return this.http.post(environment.SERVER_URL + '/book/addBook', bookDetail);
  }

  deleteBook(bookId): Observable<any> {
    return this.http.delete(environment.SERVER_URL + '/book/deleteBook/' + bookId);
  }
}
