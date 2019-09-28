import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatTableDataSource} from '@angular/material';
import {BookService} from '../service/book.service';
import {MessageBoxComponent} from '../common/message-box/message-box.component';
import {consoleTestResultHandler} from 'tslint/lib/test';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  username;
  displayedColumns: string[] = ['sno', 'name', 'publication', 'author', 'status', 'yearOfPublication' , 'action' ];
  dataSource = new MatTableDataSource<any>();
  searchTerm = '';
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private bookService: BookService, private dialog: MatDialog) { }

  ngOnInit() {
    this.username = localStorage.getItem('username');
    this.dataSource = new MatTableDataSource<any>([]);
    this.bookService.getAllBooks().subscribe(response => {
      this.dataSource = new MatTableDataSource<any>(response.responseData);
      this.dataSource.paginator = this.paginator;
      console.log('books', response.responseData);
    });
  }

  filterData(searchTerm: string) {
    this.dataSource.filter = searchTerm.trim();
  }

  borrowBook(bookId) {
    const data = {
      userId: localStorage.getItem('userId'),
      bookId: bookId
    };
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.data = {
      message: 'Book Borrowed Successfully'
    };

    console.log('daa',data);
    this.bookService.borrowBook(data).subscribe( res =>{
      const dialogRef = this.dialog.open(MessageBoxComponent, dialogConfig);
      dialogRef.afterClosed().subscribe( response => {
        this.ngOnInit();
      });
    });
  }
}


