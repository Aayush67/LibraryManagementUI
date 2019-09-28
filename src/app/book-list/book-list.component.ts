import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {AccountService} from '../service/AccountService';
import {ToastrService} from 'ngx-toastr';
import {BookService} from '../service/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  displayedColumns: string[] = ['sno', 'name', 'publication', 'author', 'status', 'yearOfPublication' , 'action' ];
  dataSource = new MatTableDataSource<any>();
  searchTerm = '';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private bookService: BookService, private toastr: ToastrService) { }
  ngOnInit() {
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

  deleteBook(bookId) {
    this.bookService.deleteBook(bookId).subscribe(res => {
      console.log('res', res);
      this.toastr.info('Deleted Successfully!', 'Deletion', {
        timeOut: 3000
      });
      this.ngOnInit();
    });
  }
}
