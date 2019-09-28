import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'LibraryManagementUI';
  showLogoutButtons = false;
  userType: string;
  constructor(private dialog: MatDialog, private router: Router) {
    router.events.subscribe((e) => {
      // console.log('App Component', e);
      if ( e instanceof NavigationEnd) {
      if (localStorage.getItem('email')) {
        this.userType = localStorage.getItem('userType').toString();
        this.showLogoutButtons = true;
      } else {
        this.showLogoutButtons = false;
      }
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
