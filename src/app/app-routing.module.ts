import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomepageComponent} from './homepage/homepage.component';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './guards/AuthGuard';
import {SearchComponent} from './search/search.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {AccountComponent} from './account/account.component';

const routes: Routes = [
  {path: '', component: HomepageComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'homepage', component: HomepageComponent},
  {path: 'welcome', component: WelcomeComponent},
  {path: 'search', component: SearchComponent},
  {path: 'account', component: AccountComponent}
  // {path:"**", component: PageNotFound}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
