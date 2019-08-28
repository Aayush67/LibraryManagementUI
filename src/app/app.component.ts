import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'LibraryManagementUI';
  showLogoutButtons = false;
  constructor(private dialog: MatDialog, private router: Router) {
    router.events.subscribe((e) => {
      console.log('App Component', e);
      if(localStorage.getItem('email')) {
        this.showLogoutButtons = true;
      } else {
        this.showLogoutButtons = false;
      }
    });
  }
  ngOnInit(): void {

  }

  logout() {
    this.router.navigate(['/login']);
    localStorage.clear();
  }
}
