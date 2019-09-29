import {Component, Inject, OnInit} from '@angular/core';
import {BookService} from '../service/book.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-book-table-dialog',
  templateUrl: './book-table-dialog.component.html',
  styleUrls: ['./book-table-dialog.component.scss']
})
export class BookTableDialogComponent implements OnInit {

  books;
  constructor(private bookService: BookService,  @Inject(MAT_DIALOG_DATA) public data,
              public dialogRef: MatDialogRef<BookTableDialogComponent>) { }

  ngOnInit() {
    // console.log(this.data);
    this.books = [];
    this.bookService.getUserBook(this.data.userId).subscribe( res => {
      this.books = res.responseData;
      console.log('aa', this.books);
    });
  }

}
