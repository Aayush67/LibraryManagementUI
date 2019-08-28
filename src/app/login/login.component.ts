import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {RegisterModel} from '../model/register.model';
import {ForgotpasswordComponent} from '../forgotpassword/forgotpassword.component';
import {AccountService} from '../service/AccountService';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hide = true;

  constructor(private router: Router,  private loginService: AccountService, private formBuilder: FormBuilder, private dialog: MatDialog) {
    // router.events.subscribe((e) => { console.log('LOGINN')})
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  forgotPassword() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open(ForgotpasswordComponent, dialogConfig);
    this.dialog.afterAllClosed.subscribe(() => {
        this.loginForm.reset();
        // this.loginForm.controls.email.ma
        // console.log("closed");
        Object.keys(this.loginForm.controls).forEach(key => {
        this.loginForm.controls[key].setErrors(null);
      });
    });
  }

  onLogin() {
    console.log('aaa',this.loginForm)
    if(this.loginForm.valid) {
      const data = {
        email: this.loginForm.controls.email.value,
        password: this.loginForm.controls.password.value
      }
      this.loginService.login(data).subscribe(res => {
        if (res.responseCode === 1000) {
          localStorage.setItem('username', res.response.credentials.username);
          localStorage.setItem('email', res.response.credentials.email);
          localStorage.setItem('userId', res.response.credentials.userId);
          this.router.navigate(['/welcome']);
        } else {
          localStorage.clear();
        }
        console.log('Result', res);
      }, (error: HttpErrorResponse) => {
        console.log('Result', error);

      });
    }
    else
    {
      console.log("Invalid form");
    }
  }


  home()  {
    this.loginService.home().subscribe(res => {
      console.log('Result', res);
    }, error1 => {
      console.log('No Result',error1);
    });
  }
}
