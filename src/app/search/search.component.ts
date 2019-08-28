import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {BookService} from '../service/book.service';

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

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.username = localStorage.getItem('username');
    this.dataSource = new MatTableDataSource<any>([]);
    this.bookService.getAllBooks().subscribe(response => {
      this.dataSource = new MatTableDataSource<any>(response.responseData);
      this.dataSource.paginator = this.paginator;
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
    this.bookService.borrowBook(data).subscribe( res =>{
      console.log('res',res);
    });
    console.log('book',data);
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


