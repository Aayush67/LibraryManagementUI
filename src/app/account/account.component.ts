import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef, MatPaginator, MatTableDataSource} from '@angular/material';
import {BookService} from '../service/book.service';
import {DatePipe} from '@angular/common';
import {FineDialogComponent} from '../common/fine-dialog/fine-dialog.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  username;
  displayedColumns: string[] = ['sno', 'name', 'publication', 'author', 'yearOfPublication' , 'issue_date', 'return_date', 'action'];
  dataSource = new MatTableDataSource<any>();
  datePipe = new DatePipe('en-US');
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private dialog: MatDialog, private bookService: BookService) { }

  ngOnInit() {
    this.username = localStorage.getItem('username');
    this.dataSource.paginator = this.paginator;
    const todayDate = new Date();
    this.bookService.getUserBook(localStorage.getItem('userId')).subscribe( response => {
        response.responseData.map( book => {
          let fine = 0;
          const dateReturn = new Date(book.returnDate);
          if (todayDate.getTime() > dateReturn.getTime()) {
            const timeDifferenceMs = Math.abs(dateReturn.getTime() - todayDate.getTime());
            const differenceDays = Math.ceil(timeDifferenceMs / (1000 * 3600 * 24)) - 1;
            fine = differenceDays * 10;
          }
          book.fine = fine;
        });
        this.dataSource = new MatTableDataSource<any>(response.responseData);
        this.dataSource.paginator = this.paginator;
    });

  }

  returnBook(book) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.data = {
      fine: book.fine
    };
    dialogConfig.height = '210px';
    const data = {
      userId: localStorage.getItem('userId'),
      bookId: book.id,
      fine: book.fine,
      issuedDate: book.issueDate,
      returnedDate: this.datePipe.transform(new Date(), 'yyyy-MM-dd')
    };

    const dialogRef = this.dialog.open(FineDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe( res => {
      if ( res === 'settleFine') {
        this.bookService.returnBook(data).subscribe( returnedBook => {
         // const bookReturnDialogRef = this.dialog.open(MessageBoxComponent, dialogConfig);
         // bookReturnDialogRef.afterClosed().subscribe( response => {
            this.ngOnInit();
          // });
        });
      }
    });
  }
}
