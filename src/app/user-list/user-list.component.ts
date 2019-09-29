import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatTableDataSource} from '@angular/material';
import {AccountService} from '../service/AccountService';
import {ToastrService} from 'ngx-toastr';
import {BookTableDialogComponent} from '../book-table-dialog/book-table-dialog.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  displayedColumns: string[] = ['sno', 'name', 'email' , 'address', 'phone', 'age' , 'action' ];
  dataSource = new MatTableDataSource<any>();
  searchTerm = '';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private accountService: AccountService, private toastr: ToastrService, private dialog: MatDialog) { }

  ngOnInit() {
/*    this.username = localStorage.getItem('username');*/
    this.dataSource = new MatTableDataSource<any>([]);
    this.accountService.getAllUsers().subscribe(response => {
      this.dataSource = new MatTableDataSource<any>(response.responseData);
      this.dataSource.paginator = this.paginator;
      console.log('users', response);
    });
  }

  filterData(searchTerm: string) {
    this.dataSource.filter = searchTerm.trim();
  }

  deleteUser(userId){
      this.accountService.deleteUser(userId).subscribe( res => {
          console.log('res',res);
          this.toastr.info('Deleted Successfully!', 'Deletion', {
          timeOut: 3000
        });
          this.ngOnInit();
      });
  }
  openUserBookDialog(userId){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      'userId': userId
    };
    dialogConfig.panelClass= 'book-dialog-container';
    this.dialog.open(BookTableDialogComponent, dialogConfig);
  }
}
