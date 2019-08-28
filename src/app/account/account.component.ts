import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef, MatPaginator, MatTableDataSource} from '@angular/material';
import {MessageBoxComponent} from '../common/message-box/message-box.component';
import {BookService} from '../service/book.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  username;
  displayedColumns: string[] = ['position', 'name', 'publication', 'author', 'book_available', 'yop' , 'borrow' ];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private dialog: MatDialog, private bookService: BookService) { }

  ngOnInit() {
    this.username = localStorage.getItem('username');
    this.dataSource.paginator = this.paginator;
    this.bookService.getUserBook(localStorage.getItem('userId')).subscribe( res =>{
        console.log('res',res);
    });

  }

  returnBook(){

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;

    dialogConfig.data = {
      message: 'Book Returned Successfully'
    };

    this.dialog.open(MessageBoxComponent, dialogConfig);
  }

}
export interface PeriodicElement {
  name: string;
  position: number;
  book_available: number;
  publication: string;
  author: string;
  yop: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Book1' , publication: 'pub1' , author: 'auth1', book_available : 10 , yop: 2013},
  {position: 2, name: 'Book2', publication: 'pub2' , author: 'auth2' , book_available : 10 , yop: 2014},
  {position: 3, name: 'Book3', publication: 'pub3' , author: 'auth3', book_available : 10 , yop: 2015 },

];
