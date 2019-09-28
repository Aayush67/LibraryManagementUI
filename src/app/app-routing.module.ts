import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomepageComponent} from './homepage/homepage.component';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './guards/AuthGuard';
import {SearchComponent} from './search/search.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {AccountComponent} from './account/account.component';
import {AddUserComponent} from './add-user/add-user.component';
import {AddBookComponent} from './add-book/add-book.component';
import {UserListComponent} from './user-list/user-list.component';
import {BookListComponent} from './book-list/book-list.component';

const routes: Routes = [
  {path: '', component: HomepageComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'homepage', component: HomepageComponent, canActivate: [AuthGuard]},
  {path: 'welcome', component: WelcomeComponent, canActivate: [AuthGuard]},
  {path: 'search', component: SearchComponent},
  {path: 'account', component: AccountComponent},
  {path: 'addUser', component: AddUserComponent},
  {path: 'addUser/:userId', component: AddUserComponent},
  {path: 'userList', component: UserListComponent},
  {path: 'addBook', component: AddBookComponent},
  {path: 'addBook/:bookId', component: AddBookComponent},
  {path: 'bookList', component: BookListComponent}



  // {path:"**", component: PageNotFound}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
